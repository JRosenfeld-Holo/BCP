# Client Feedback Implementation Plan

Source: Brian Cliette Loom walkthrough (7:13). Site under review: `briancliette.com` (this repo).

---

## Current section order

`src/App.tsx` → `HomePage()` (line 155):

| # | Component | Line | Notes |
|---|---|---|---|
| 1 | `HeroSection` | 247 | MinimalistHero |
| 2 | `LogoMarquee` | 528 | 17 client logos, `brightness(0) invert(1)`, opacity 30 |
| 3 | `AboutSection` | 366 | `01 // Origin Story` + stats + "As Featured In" press (bottom, opacity 25, `h-4`) |
| 4 | `ServicesSection` | 467 | `02 // Core Services` — The AI Playbook |
| 5 | `FeaturedWorkSection` | 569 | `03 // Featured Work` — GSAP pinned card deck (AG1, Twilio, Evidation) |
| 6 | `FunnelSection` | (lazy) | "Start the Conversation." — 3D funnel |
| 7 | `ContactSection` | 817 | Form only |
| 8 | `Footer` | 940 | |

## Proposed section order

```
Hero
  → LogoMarquee       ← white heading + full-opacity logos; a16z added, weco removed
  → About (01)        ← stats + "As Featured In" as a 50/50 row
  → Services (02)
  → FeaturedWork (03) ← GSAP deck stays
  → CaseStudies       ← pending content; slots in below Featured Work
  → BragWall (04)     ← "Receipts" — native cards, not screenshots
  → Testimonials
  → Funnel
  → Contact           ← Calendly + form, dual CTA
  → Footer
```

Client logos live only in the marquee — an About-section repeat was built and then removed as duplicative.

---

## Workstream 1 — Make "As Featured In" prominent ✅ IMPLEMENTED

**Feedback:** *"I think we can make these a little more prominent... it's almost hidden, especially with the grayscale."*

**Root cause.** [App.tsx:429-442](../src/App.tsx#L429-L442) renders press logos at `h-4`, `opacity-25`, with
`filter: brightness(0) invert(1)` — that filter crushes every logo to a flat white silhouette. That's the
"grayscale" Brian is reacting to. The section label is `text-[8px]` at `opacity-40`.

**Changes**
1. Extract a new `PressBar` component and mount it directly under `HeroSection` in `HomePage` — the
   highest-attention slot on the page.
2. Drop the `brightness(0) invert(1)` filter. Render press marks in their real colors.
3. Size up: `h-4` → `h-8 md:h-10`; opacity `25` → `70` idle / `100` on hover.
4. Label: `text-[8px]/opacity-40` → `text-[10px] tracking-[0.3em] opacity-60`, and reword to
   "As Featured In" as a real section header rather than a footnote.

**Transparency risk.** Forbes/Inc./Entrepreneur/HuffPost/Penn State currently exist as both `.svg` and `.webp`
in [public/press/](../public/press/). The SVGs are safe to recolor; the WebPs may carry baked backgrounds
(the same defect that killed the Snipfeed logo in commit `0ef18eb`). Use SVG sources only for this bar.

**Placement — resolved.** Press stays inside About, promoted to a **50/50 row sharing the line with the four
stat boxes** (stats left, press right). That gives the features equal billing with the numbers instead of
trailing them as a footnote, without needing a separate band.

**Built:** `h-4 → h-6/h-7`, `opacity-25 → full white`, label `text-[8px]/opacity-40 → text-[11px]` solid
white. Stat boxes tightened (`p-5 → p-4`, value `text-2xl/3xl → text-xl/2xl`) to sit comfortably in half
the column. Stacks cleanly at every breakpoint; no horizontal overflow at 1440 / 820 / 480.

---

## Workstream 2 — Brand logos: quality + prominence ✅ IMPLEMENTED

**Feedback:** *"some of these logos were not showing up, or they were very low quality... maybe even put in
those logos here — Twilio, AG1, Pixlee, a16z."*

**Current state.** [App.tsx:529-548](../src/App.tsx#L529-L548) lists 17 logos.
[public/logos/](../public/logos/) holds 26. The gap is deliberate — commits `2026094`, `e160b05`, and `0ef18eb`
removed Pixlee, Penn State, Dr. Knot, and Snipfeed for quality. Notably, **Pixlee is one of the four logos
Brian explicitly wants featured**, and it's one of the ones we pulled.

| Logo | Status | Action |
|---|---|---|
| Twilio | in marquee | promote to About feature row |
| AG1 | in marquee | promote to About feature row |
| Pixlee | **removed for quality** | re-source clean asset, then feature |
| a16z | **not in repo at all** | source from a16z brand assets |
| Penn State, Dr. Knot, Snipfeed | removed | re-source or leave out |

**Changes**
1. Source clean transparent-background assets for **Pixlee** and **a16z** (prefer SVG). This is asset work,
   not code — flagged as a blocker below.
2. Add a `FeaturedBrands` row inside `AboutSection` where the press logos currently sit: 4-5 marks at
   `h-10`, larger and lighter-touch than the marquee.
3. Keep `LogoMarquee` as the wide "everyone else" strip, but reduce its visual weight so it doesn't compete
   with the new featured row.

**Note on the white-chip option.** Wrapping each logo in a white rounded chip makes any source asset work
regardless of its background. Commits `ebd1297` → `2026094` show a white-background marquee was already tried
and reverted, so I'd only apply chips to the press bar if a clean asset can't be sourced — not to the marquee.

### Built

**a16z now rides in the marquee** alongside Twilio, AG1 and Pixlee. A separate "Clients I've Worked With"
row was built in About and then removed — it duplicated the marquee.

**`weco logo.webp` removed from the marquee.** At full white it renders as an unreadable rectangle; the
source has no usable silhouette. Re-source it if Weco needs to stay listed.

**Marquee legibility.** Heading went `text-[8px]/opacity-30 → text-xs/sm` solid white; logos went
`opacity-30 → opacity-100`.

*One artifact this exposed:* at full white, the Evidation logo's yellow brand dot — a soft radial glow —
rendered as a grey smudge, since `brightness(0) invert(1)` flattens the gradient. Fixed by thresholding its
alpha at 55%, which turns the glow into the crisp dot the brand actually uses. Audited the other 16 marquee
logos the same way; the rest are clean at full opacity.

---

## Workstream 3 — Case studies replace Featured Work

**Feedback:** *"I have these case studies... skills, tools, background of what I did for that client, the
highlights, the platforms used, the targeted demographics, the price point... replacing this kind of section
with the case studies."*

This is the largest piece of work and the one most dependent on content.

**Changes**
1. `src/data/caseStudies.ts` — typed data module. Field list taken from the actual MarketerHire board
   (18 cards, each two columns — narrative left, tag groups right):
   ```ts
   interface CaseStudy {
     slug: string;
     client: string;
     discipline: string;            // e.g. "Growth Marketing", "Demand Generation"
     narrative: string;             // the engagement write-up
     responsibilities: string[];    // the bulleted list
     highlights: string;            // the Highlights block
     skills: string[];
     tools: string[];
     platforms: string[];
     audience: string[];
     companyStage: string[];
     industries: string[];
     productPricePoint: string[];
     salesIndustriesOrProducts: string[];
     targetBuyerDemographic: string[];
   }
   ```
   Note `audience` and `targetBuyerDemographic` are distinct groups on the board, as are `industries` and
   `salesIndustriesOrProducts` — worth keeping separate rather than collapsing.

   **18 cards is a lot for one page.** Recommend leading with 4-6 of the strongest and putting the rest
   behind a filter (by industry or discipline, both of which the tag groups give us for free) or on the
   `/work/:slug` detail pages.
2. `CaseStudiesSection` replacing `FeaturedWorkSection` at position 5. Grid or horizontal-scroll card layout
   rather than the current GSAP pinned deck — the pinned deck shows one card at a time over ~4.5 screens of
   scroll, which doesn't scale past 3 entries.
3. `/work/:slug` detail route for the full case study, following the existing
   [ServicePage.tsx](../src/pages/ServicePage.tsx) pattern and its lazy-loading setup.
4. Update the navbar `#work` anchor at [App.tsx:238](../src/App.tsx#L238) to match the new section id.

**Decision — resolved: case studies sit BELOW Featured Work.** The GSAP pinned deck stays as-is and the
case-study section is added underneath it. Brian liked that the deck *"gives hero to some of the big brand
names"*, so the deck keeps doing the brand-recognition job and the case studies carry the depth. Nothing
gets retired, and the ~55 lines of ScrollTrigger pin logic
([App.tsx:593-645](../src/App.tsx#L593-L645)) stay untouched.

Section numbering will land as `04 // Featured Work` → `05 // Case Studies`.

---

## Workstream 4 — Brag wall (social proof gallery) ✅ IMPLEMENTED

**Feedback:** *"a flash of cards or something where we can highlight some of these... maybe around the origin
story or the About section."*

**Assets received** — [Brag Folder/](../Brag%20Folder/). 20 files, but 10 are `.docx` duplicates of the
screenshots (same junk pattern as the logos folder) — ignore those. Ten real images, reviewed below.

### Inventory

| Asset | What it actually is | Verdict |
|---|---|---|
| `IMG_8402.JPG` (4032×3024) | Brian holding the **$10,000** Build Day X Miami Hackathon check, Dec 3 2023, against a Tech Equity Collective (a Google initiative) + ACT House step-and-repeat | **Hero card** — strongest asset in the folder |
| `IMG_8399.JPG` (4032×3024) | Same moment, 90° EXIF rotation, weaker framing | Skip (backup only) |
| `ACT-House-…03_47_PM.png` | ACT House blog: *"1st Place Winner of $10,000: Caviar"* + team photo naming Brian | **Use** — third-party written confirmation of the win |
| `ACT-House-…Instagram-03_51_PM.png` | @theacthouse IG post — Brian presenting on stage, 76 likes, Nov 6 2023 | **Use** — the "pitching" action shot |
| `ACT-House-…Instagram-03_52_PM.png` | Near-duplicate frame of the above | Dedupe — pick one |
| `-18-Alex-Reibman…agihouse_org.png` | X post, Dreamscape Creativity Hackathon at AGI House SF w/ @mantisVC + Coatue — **211.4K views, 526 likes, 68 reposts** | **Use** — highest-reach proof in the set |
| `-19-Alex-Reibman…Gluegen.png` | Follow-up post in the same thread re: AI music videos | Optional second SF card |
| `Screenshot 2024-12-08 at 4.13.14 PM.png` | YouTube — Penn State Startup Week panel, *"Strengthening Society: How Entrepreneurship Benefits Our World"* (1:00:50) | **Use** — the Penn State speaking credit |
| `layoffs to 7 fig al service business.jpg` (1200×628) | Maven course card — *"Layoffs to 7 Fig AI Service Business"*, billing Brian as **Founder, GTM Engineer** alongside two other founders | **Use** — already dark-themed, matches the site palette exactly |
| `Speaking Training Reviews/…Kindle-Cash-Flow-Mastermind….png` | Facebook post in a **17.8K-member** private group + ~54 comments of testimonials. **3024 × 15,830 px** | **Do not use as an image** — see below |

### The key strategic call: split it into two components

Brian described this as one "brag folder," but the content is really two different kinds of proof and they
should not share a treatment.

**1. `BragWall` — images (proof he's *living* it).** Six cards after `AboutSection`, each an image +
one-line caption + category tag (`Hackathon` / `Speaking` / `Community`):

| Card | Source | Caption angle |
|---|---|---|
| $10K check | `IMG_8402.JPG` | 1st place, Build Day X Miami Hackathon |
| ACT House writeup | `ACT-House-…03_47_PM.png` | Winning team: Caviar |
| On stage | `ACT-House-…03_51_PM.png` | Presenting at ACT House |
| AGI House SF | `-18-Alex-Reibman…png` | Dreamscape Hackathon — 211.4K views |
| Penn State | `Screenshot 2024-12-08…png` | Startup Week panelist |
| Maven | `layoffs to 7 fig…jpg` | Course instructor, AI Build Lab |

**2. `TestimonialStrip` — extracted quotes (proof his teaching *lands*).** The Kindle reviews screenshot is
15,830px tall; shrunk to card size it's an illegible gray smear, and it's the single most valuable thing in
the folder. Pull the comments out as real text instead. Verbatim from the screenshot:

> "Your insights were spot-on, and your speaking style kept me totally engaged. You're a fantastic speaker."
> — **George-Adrian Mortu**, Moderator

> "Brian is an excellent speaker; it is obvious he knows his stuff. He provides clear and concise information
> along with very valuable resources." — **Craig Francis**

> "This training was amazing! I am thinking about whole new avenues!" — **Sheryl Laxson**

> "Your presentation was very eye opening and helped me to see beyond the small business that I thought I was
> building." — **Evelyn Earl**

Rendered as text these are skimmable, searchable, responsive, and weigh nothing. Frame the strip with the
context line: *"From a training delivered to a 17,800-member publishing community."*

### Constraints worth knowing before this gets built

1. **Crop out the third-party chrome.** Five of these are full-window screenshots carrying X sidebars,
   Facebook nav, and Instagram rails. Left uncropped they look like clutter, not credentials. Crop tight to
   the post content.
2. **Permission check on the testimonials.** The Kindle quotes come from a *private* Facebook group and name
   real people. Confirm with Brian before publishing names — first name + last initial is the safer default.
3. **Two of these are other people's posts** (Alex Reibman's X thread, ACT House's Instagram). Fine to show
   as social proof, but they should read as citations — keep the poster's handle visible in the crop.
4. **`IMG_8399` needs EXIF rotation** if it's used at all.
5. **Processing:** crop → 1200px wide → WebP, target under 150KB each. The two 4032×3024 JPEGs are ~4MB
   as-is and must not ship raw.

### What was built

Rebuilt as **native components driven by data**, not screenshots — [src/data/brag.ts](../src/data/brag.ts)
and [src/BragSection.tsx](../src/BragSection.tsx), mounted after `AboutSection` as `02 // Receipts —
Proof of Work.` (Services renumbered to 03, Featured Work to 04.)

Four card types render off a discriminated union, so each piece of proof gets the treatment it deserves:

| Card | Renders |
|---|---|
| `photo` | Real photograph, fixed aspect box, tag chip, title, caption |
| `post` | Native X card — avatar initials, handle, post text, engagement stats, date |
| `video` | Panel still, play affordance, duration badge, channel |
| `course` | Maven card — title, Brian's role, co-host billing |

Only three assets remain images, because they're actual photographs that can't be "rebuilt": the $10K cheque
shot, the on-stage shot, and the winning-team shot — plus the Penn State panel still. Everything else that
*was* a screenshot (the X post, the Maven card, the ACT House writeup, the Facebook thread) is now live DOM:
real text, real links when URLs arrive, selectable, responsive, and searchable.

The four photos were cropped out of their surrounding browser chrome and converted to WebP —
**352KB total, down from ~10MB of raw captures.**

`TestimonialCarousel` follows the pattern from the reference `Testimonials.tsx`: auto-advance, pause on
hover/focus, prev/next arrows, and progress-bar dot navigation. Two deliberate departures from that
reference:
- **Keyboard arrows are scoped to the carousel** (`section.contains(document.activeElement)`) instead of
  bound page-wide, which would otherwise hijack arrow-key scrolling across the whole site.
- **The progress fill is a CSS animation with `animation-play-state`**, not a JS tween. The reference's
  `animate={{ width: paused ? undefined : '100%' }}` doesn't actually freeze — verified: the fill snaps back
  to 0 on hover. The CSS version genuinely holds mid-run (measured frozen at 29px, resuming to 39px).

Verified in Chromium: all four images decode, masonry resolves 3/2/1 columns at 1440/900/500 with no
horizontal overflow, arrows and dots both drive the carousel, and auto-advance fires when unhovered.

**Still open:** no source URLs were supplied, so cards render without "View post" links by design rather
than pointing anywhere invented — `href` on any item lights the link up. Testimonials now carry full names
at Brian's direction; delete an entry from `TESTIMONIALS` if anyone asks to be removed.

---

## Workstream 5 — Calendly + dual CTA ✅ IMPLEMENTED

**Feedback:** *"the Calendly integration... so people can easily schedule a call. Also, we're not getting
spammed to death. The two forms may actually be better — book a call, multiple calls to action."*

He asked for a go-to-market read here. **Recommendation: both, with booking primary.** A form is the right
catch-all for people not ready to commit to a slot, but a calendar link converts a warm visitor in one step.
Making booking the default tab and the form the secondary tab captures both without doubling the page height.

**Changes**
1. Restructure `ContactSection` ([App.tsx:817](../src/App.tsx#L817)) into two tabs:
   **Book a Call** (default) | **Send a Message**.
2. Embed Calendly with the plain inline widget — a `div` plus their script, loaded lazily via
   `IntersectionObserver` when the section scrolls into view. No new npm dependency; keeps the widget's
   ~90KB off the critical path.
3. Add a "Book a Call" CTA to the navbar alongside the existing "Let's Talk" button
   ([App.tsx:239](../src/App.tsx#L239)) and to the footer.
4. Spam control on the retained form: honeypot field + simple client-side rate limit. Lightweight; skip
   CAPTCHA unless spam actually materializes.

**Built** against `https://calendly.com/brian-cliette/30min?hide_gdpr_banner=1`. Verified in Chromium: zero
Calendly requests on page load, 10 requests once the section nears the viewport, live "30 Minute Meeting"
calendar renders, tabs switch, and the form retains focus through typing.

The widget renders on a white card. Calendly's dark-theme params (`background_color` etc.) are a paid-plan
feature, so the URL was left exactly as supplied and the widget wrapped in a deliberate white rounded panel.
If Brian's plan supports custom colors, we can switch it to the site's palette in one line.

**No inner scrollbar.** The embed originally sat in a fixed 700px box, so the booking flow scrolled inside
its own iframe. Calendly broadcasts a `calendly.page_height` postMessage on every content resize (measured:
1013px → 1059px on load); the host now listens and grows to match, falling back to 1050px until the first
message lands. Verified in both states — calendar view and after picking a date, with time slots open —
that the iframe's `scrollHeight` equals its `clientHeight`.

**Not done — the form still doesn't send.** See pre-existing issue 1. Spam controls (honeypot, rate limit)
were deliberately deferred to land with that wiring; adding them now would guard an endpoint that
doesn't exist.

---

## Workstream 6 — briancliette.me one-pager

**Feedback:** *"briancliette.me is my main email, so I do want a one-page site that's a summation of what
we've been working on here."*

Separate deliverable, out of scope for this pass unless directed otherwise. When it's picked up, the cheapest
path is a second route in this repo (`/one` or a `?compact` build) that reuses Hero + PressBar + a condensed
stats block + Calendly, deployed to the `.me` domain from the same build. Confirm with Brian whether he wants
it now or after the main site lands.

---

## Pre-existing issues found (not in the transcript)

These aren't client feedback, but they affect whether the feedback can be implemented as intended.

1. **The contact form doesn't send anything.** Both `ContactModal`
   ([App.tsx:24-28](../src/App.tsx#L24-L28), comment: *"Resend wiring goes here"*) and `ContactSection`
   ([App.tsx:822-825](../src/App.tsx#L822-L825)) just call `setSubmitted(true)`. Any message submitted today
   is silently discarded. This must be wired to Resend (or similar) before the dual-CTA work means anything.

2. **Typing in the contact form loses focus after every keystroke.** `Field` is declared *inside*
   `ContactSection`'s render body ([App.tsx:827](../src/App.tsx#L827)), so React sees a new component type on
   every state change and remounts the input. Fix by hoisting `Field` out of the component. Worth doing as
   part of Workstream 5.

3. **Repo hygiene.** Source assets (`.docx`, 6.8MB `.mp4`, `.webm`, root-level `.tsx` scratch files, a
   committed `.DS_Store`) are tracked at repo root and inflate every clone. Mentioning only — no action taken.

---

## Blockers — client-supplied assets

| Need | For | Status |
|---|---|---|
| MarketerHire case study content | Workstream 3 | **still outstanding — the last real blocker** |
| Brag folder images | Workstream 4 | ✅ received and catalogued |
| Calendly public event URL | Workstream 5 | ✅ received and live |
| Clean Pixlee + a16z logos | Workstream 2 | ✅ sourced and processed |
| OK to publish testimonial names | Workstream 4 | ✅ approved — full names live |

---

## Already done in this pass

**Workstream 5 — Calendly + dual CTA.** Booking/message tabs in `ContactSection`, booking default. Widget
script lazy-loads on scroll via `IntersectionObserver`, with a direct-link fallback if it fails. "Book a Call"
added to the navbar and footer; "Message" added to the navbar.

**Workstream 4 — brag wall + testimonial carousel.** Rebuilt as data-driven native components rather than
screenshots; see that section for detail.

**Workstream 2 (partial) — logo assets.** Both logos processed to trimmed, transparent WebP and installed in
[public/logos/](../public/logos/):
- `pixlee logo.webp` — white background removed, added back to the marquee (it had been pulled in `e160b05`
  for exactly this quality problem).
- `a16z logo.webp` — held out of the marquee deliberately. a16z is an *investor* in Pixlee, not a client;
  listing it under "Brands & Teams I've Worked With" would misrepresent the relationship. It belongs in the
  featured/credibility row instead, which is gated on decision 1.

*Asset note:* the a16z source already had an alpha channel; a first pass flattened it and produced a green
matte — the identical failure mode that killed the Snipfeed logo in `0ef18eb`. Both files were verified by
compositing over `#080808` with and without the marquee's `brightness(0) invert(1)` filter. **Pixlee's
wordmark is near-black**, so it only works in the white-silhouette treatment, never in original color on
a dark background.

### Bugs fixed along the way

1. **Contact form lost focus on every keystroke** (pre-existing issue 2) — `Field` hoisted to module scope.
   Verified by typing a full name and confirming focus is retained.
2. **The pinned Featured Work backdrop covered the top of the contact section.** Its full-screen decorative
   layer overhangs ~135px into the following section after the GSAP pin releases. Because it paints an
   opaque `#080808`, it rendered *over* the new tabs and swallowed clicks on them. Fixed with
   `pointer-events-none` on the decorative layer plus `relative z-10` on the contact section. This was
   latent before — nothing interactive had been sitting in that band.
3. **Anchor jumps landed under the fixed navbar** — the new "Book a Call" links target `#contact-form`,
   which put the tabs at `top: 45px`, directly beneath the navbar. Added `scroll-mt-28`. The pre-existing
   `#about` / `#services` / `#work` anchors have the same flaw and were left alone; worth a follow-up.

---

## Remaining sequence

1. **Pre-existing issue 1** (form delivery) → verify: a test submission lands in the destination inbox. Do
   this next — the message tab currently discards everything typed into it.
2. **Workstream 3** (case studies, below Featured Work) → verify: renders from `caseStudies.ts`,
   `/work/:slug` resolves, `#work` anchor still scrolls correctly. Blocked on the MarketerHire content.
3. **Workstream 6** (.me one-pager) → separate scope, pending confirmation.

### Small follow-ups worth batching

- Source URLs for the six brag cards (X post, Maven course, ACT House writeup, Penn State video).
- `Testimonials.tsx` at the repo root is a Next.js reference file — its `next/image` and `@/lib/i18n`
  imports fail `npm run lint`. Either exclude it in `tsconfig.json` or move it out of the project root.
- The pre-existing `#about` / `#services` / `#work` anchors need the same `scroll-mt` treatment
  `#contact-form` got.

## Decisions

| Question | Status |
|---|---|
| Press bar placement | ✅ Resolved — 50/50 with the stat boxes inside About |
| Case studies vs. the GSAP deck | ✅ Resolved — deck stays, case studies sit below it |
| Testimonial surnames — full or initials? | ✅ Resolved — full names, at Brian's direction |
| `.me` one-pager — now or later? | ⏳ Open |

**Outstanding caveat:** the About logo row is labelled "Clients I've Worked With", which presents a16z as a
client. They backed Pixlee rather than engaging Brian directly. Kept as directed — worth Brian confirming
he's comfortable stating it that way, since an investor logo is the kind a prospect may check.
