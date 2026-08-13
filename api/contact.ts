// Contact form handler. Runs on Vercel's edge runtime.
//
// The Resend key lives here and only here — this file runs on the server, so
// the key never reaches the browser. It must NOT be exposed as a VITE_* var:
// Vite inlines those into the client bundle, where anyone could read it and
// send mail as this domain.
//
// Required env vars (set in the Vercel dashboard, not in the repo):
//   RESEND_API_KEY     — from resend.com/api-keys
//   CONTACT_TO_EMAIL   — where enquiries land
//   CONTACT_FROM_EMAIL — optional; must be on a domain verified in Resend

export const config = { runtime: 'edge' };

const FIELD_LIMITS = { name: 120, email: 200, company: 160, message: 5000 };

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  /** Honeypot. Real people never see this field, so anything in it is a bot. */
  website?: string;
};

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export default async function handler(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, 405);
  }

  let payload: Payload;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Invalid request body' }, 400);
  }

  // Bots fill every field they find. Accept the submission so they don't retry,
  // but send nothing.
  if (payload.website) return json({ ok: true }, 200);

  const name = (payload.name ?? '').trim();
  const email = (payload.email ?? '').trim();
  const company = (payload.company ?? '').trim();
  const message = (payload.message ?? '').trim();

  if (!name || !email || !message) {
    return json({ error: 'Name, email and message are required.' }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'That email address looks wrong.' }, 400);
  }
  for (const [field, limit] of Object.entries(FIELD_LIMITS)) {
    if (((payload[field as keyof Payload] ?? '') as string).length > limit) {
      return json({ error: `${field} is too long.` }, 400);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? 'Brian Cliette Site <onboarding@resend.dev>';

  if (!apiKey || !to) {
    // Never silently swallow the message — the visitor is told it failed.
    console.error('contact: RESEND_API_KEY or CONTACT_TO_EMAIL is not configured');
    return json({ error: 'The contact form is not configured yet.' }, 500);
  }

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Company', company || '—'],
  ];

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${apiKey}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `New enquiry from ${name}${company ? ` (${company})` : ''}`,
      text: `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.6">
          ${rows.map(([k, v]) => `<p style="margin:0 0 4px"><strong>${k}:</strong> ${escapeHtml(v)}</p>`).join('')}
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0" />
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
        </div>
      `,
    }),
  });

  if (!response.ok) {
    console.error('contact: resend rejected the send', response.status, await response.text());
    return json({ error: 'Could not send your message. Please try again.' }, 502);
  }

  return json({ ok: true }, 200);
}
