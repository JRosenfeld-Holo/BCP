import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { BRAG_ITEMS, TESTIMONIALS, TESTIMONIAL_CONTEXT, type BragItem } from './data/brag';

const CARD = 'brutal-border rounded-xl bg-white/[0.03] overflow-hidden';
const TAG = 'text-[9px] uppercase tracking-[0.25em] accent-text';
const TITLE = 'font-black font-display uppercase tracking-tighter leading-none';

/** Renders a source link only when a real URL exists — never a dead affordance. */
function SourceLink({ href, label }: { href?: string; label: string }) {
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-widest opacity-40 hover:opacity-100 hover:text-[#2563EB] transition-all duration-200"
    >
      {label} <ArrowUpRight size={11} />
    </a>
  );
}

function PhotoCard({ item }: { item: Extract<BragItem, { kind: 'photo' }> }) {
  return (
    <div className={`${CARD} group`}>
      <div
        className={`relative overflow-hidden ${
          {
            portrait: 'aspect-[3/4]',
            tall: 'aspect-[4/5]',
            wide: 'aspect-[16/9]',
            landscape: 'aspect-[4/3]',
          }[item.ratio]
        }`}
      >
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          className={`w-full h-full transition-transform duration-700 group-hover:scale-[1.03] ${
            item.fit === 'contain' ? 'object-contain' : 'object-cover'
          }`}
        />
        {/* The bottom scrim would dim a screenshot's own content, so it only
            applies to photographs. */}
        {item.fit !== 'contain' && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
        )}
        {/* Overlaid on photographs; on screenshots it would land on their own
            content, so those carry the tag in the body instead. */}
        {item.fit !== 'contain' && (
          <span className={`absolute top-4 left-4 ${TAG} bg-[#080808]/70 backdrop-blur-sm px-2 py-1 rounded`}>
            {item.tag}
          </span>
        )}
      </div>
      <div className="p-5">
        {item.fit === 'contain' && <p className={`${TAG} mb-2`}>{item.tag}</p>}
        <h4 className={`${TITLE} text-2xl mb-2`}>{item.title}</h4>
        <p className="text-sm opacity-70 leading-relaxed">{item.caption}</p>
        {item.meta && (
          <p className="font-mono text-[10px] opacity-35 mt-3 leading-relaxed">{item.meta}</p>
        )}
        <div className="mt-3">
          <SourceLink href={item.href} label="Source" />
        </div>
      </div>
    </div>
  );
}

function VideoCard({ item }: { item: Extract<BragItem, { kind: 'video' }> }) {
  return (
    <div className={`${CARD} group`}>
      <div className="relative overflow-hidden aspect-[16/9]">
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-[#080808]/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#080808]/70 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Play size={16} className="text-white ml-0.5" fill="currentColor" />
          </div>
        </div>
        <span className={`absolute top-4 left-4 ${TAG} bg-[#080808]/70 backdrop-blur-sm px-2 py-1 rounded`}>
          {item.tag}
        </span>
        <span className="absolute bottom-4 right-4 font-mono text-[10px] bg-[#080808]/80 px-2 py-1 rounded">
          {item.duration}
        </span>
      </div>
      <div className="p-5">
        <h4 className="text-base font-bold leading-snug mb-2">{item.title}</h4>
        <p className="text-[11px] uppercase tracking-widest opacity-40">{item.channel}</p>
        <div className="mt-3">
          <SourceLink href={item.href} label="Watch" />
        </div>
      </div>
    </div>
  );
}

function BragCard({ item }: { item: BragItem }) {
  switch (item.kind) {
    case 'photo': return <PhotoCard item={item} />;
    case 'video': return <VideoCard item={item} />;
  }
}

export function BragWall() {
  return (
    <section id="proof" className="relative z-10 scroll-mt-28 py-32 px-6 md:px-12 border-t border-white/5">
      <div className="mb-16 border-l-2 border-[#2563EB] pl-6">
        <h2 className="text-[10px] uppercase tracking-widest accent-text mb-4">Receipts</h2>
        <h3 className="text-4xl md:text-6xl font-black font-display tracking-tighter uppercase leading-none">
          Proof of<br />Work.
        </h3>
        <p className="text-sm opacity-50 leading-relaxed mt-6 max-w-md">
          Not a deck about AI. Hackathons won, stages taken, rooms taught.
        </p>
      </div>

      {/* Masonry via CSS columns — variable card heights with no span arithmetic. */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-5">
        {BRAG_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="break-inside-avoid mb-5"
          >
            <BragCard item={item} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function TestimonialCarousel() {
  const railRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const rail = railRef.current;
    if (!rail) return;
    setAtStart(rail.scrollLeft <= 2);
    setAtEnd(rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2);
  }, []);

  useEffect(() => {
    syncEdges();
    window.addEventListener('resize', syncEdges);
    return () => window.removeEventListener('resize', syncEdges);
  }, [syncEdges]);

  // Step by one card so the rail always lands on a card edge rather than
  // stopping halfway through a quote.
  const scrollByCard = (dir: 1 | -1) => {
    const rail = railRef.current;
    if (!rail) return;
    const card = rail.querySelector('article');
    const gap = 24;
    const step = card ? card.getBoundingClientRect().width + gap : rail.clientWidth * 0.8;
    rail.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  // Alternating tilt, cycled so neighbouring cards never share an angle.
  const tilts = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'];

  return (
    <section className="px-6 md:px-12 pb-32" aria-label="Testimonials">
      <div className="relative w-full max-w-7xl mx-auto rounded-3xl brutal-border bg-white/[0.03] p-6 sm:p-8 shadow-2xl">
        {/* Stacks below sm — side by side, the copy overflows the panel on phones */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 items-start sm:items-center px-1 sm:px-0">
          <h3 className="text-[40px] sm:text-6xl lg:text-7xl leading-[0.9] font-black font-display uppercase tracking-tighter">
            Testimonials.
          </h3>
          <span aria-hidden="true" role="separator" aria-orientation="vertical" className="hidden sm:block w-px bg-[#2563EB]/30 h-10 shrink-0" />
          <p className="text-sm sm:text-base opacity-50 leading-snug sm:mt-1 max-w-xs">
            {TESTIMONIAL_CONTEXT.blurb}
          </p>
        </div>

        <div className="h-px bg-[#2563EB]/25 mt-4" />

        <div className="relative overflow-hidden rounded-3xl mt-6 min-h-[360px]">
          {/* Edge fades — tinted to the panel, not the page, so they blend */}
          <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-24 z-10 bg-gradient-to-r from-[#0c0c0c] to-transparent transition-opacity duration-300 ${atStart ? 'opacity-0' : 'opacity-100'}`} />
          <div aria-hidden="true" className={`pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-24 z-10 bg-gradient-to-l from-[#0c0c0c] to-transparent transition-opacity duration-300 ${atEnd ? 'opacity-0' : 'opacity-100'}`} />

          <div
            ref={railRef}
            onScroll={syncEdges}
            tabIndex={0}
            className="hide-scrollbar flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory items-stretch px-2 sm:px-6 py-6 focus:outline-none"
          >
            {TESTIMONIALS.map((item, i) => (
              <article
                key={item.name}
                // max-w capped to the viewport below sm so a whole quote is
                // readable without the card running off screen
                className={`snap-center shrink-0 min-w-[260px] sm:min-w-[480px] max-w-[82vw] sm:max-w-[620px] rounded-[24px] border border-[#2563EB]/30 bg-[#080808] p-6 sm:p-8 shadow-2xl transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 ${tilts[i % tilts.length]}`}
              >
                <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-90">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center shrink-0">
                    <span className="text-[11px] font-black font-display tracking-tighter accent-text">
                      {item.name.split(/[\s-]/).map(w => w[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold leading-tight">{item.name}</div>
                    <div className="text-xs opacity-40 leading-tight">
                      {item.role}
                    </div>
                    <div className="text-xs opacity-60 leading-tight mt-0.5">{item.company}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 z-20 flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => scrollByCard(-1)}
              disabled={atStart}
              className="w-10 h-10 rounded-full inline-flex items-center justify-center border border-[#2563EB]/40 bg-[#080808]/80 backdrop-blur-sm hover:bg-[#2563EB]/25 transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => scrollByCard(1)}
              disabled={atEnd}
              className="w-10 h-10 rounded-full inline-flex items-center justify-center bg-[#2563EB] text-white hover:bg-white hover:text-[#080808] transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:pointer-events-none"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
