import { ArrowUpRight } from 'lucide-react';
import { useMeta } from './seo';

/**
 * Shown for unknown paths and unknown service slugs. The host rewrites every
 * unmatched URL to index.html so deep links work, which means the app itself
 * has to answer for a bad URL — otherwise it renders a blank page.
 */
export function NotFound() {
  useMeta({
    title: 'Page not found — Brian Cliette',
    description: 'That page doesn’t exist. Head back to briancliette.com.',
    path: '/404',
  });

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col items-center justify-center gap-8 px-6 text-center">
      <p className="text-[11px] uppercase tracking-[0.3em] accent-text">Error 404</p>
      <h1 className="text-5xl md:text-7xl font-black font-display uppercase tracking-tighter leading-none">
        Nothing<br />Here.
      </h1>
      <p className="text-sm opacity-50 max-w-sm leading-relaxed">
        That page doesn’t exist — it may have moved, or the link may be wrong.
      </p>
      <a
        href="/"
        className="flex items-center gap-3 bg-[#2563EB] text-white font-black uppercase tracking-tighter text-sm px-8 py-4 rounded-full hover:bg-white hover:text-[#080808] transition-colors duration-200"
      >
        Back to the site <ArrowUpRight size={16} />
      </a>
    </div>
  );
}
