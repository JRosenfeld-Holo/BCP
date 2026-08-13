import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaXTwitter, FaInstagram } from 'react-icons/fa6';
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
          item.ratio === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'
        }`}
      >
        <img
          src={item.image}
          alt={item.alt}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-80" />
        <span className={`absolute top-4 left-4 ${TAG} bg-[#080808]/70 backdrop-blur-sm px-2 py-1 rounded`}>
          {item.tag}
        </span>
      </div>
      <div className="p-5">
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

function PostCard({ item }: { item: Extract<BragItem, { kind: 'post' }> }) {
  const Icon = item.platform === 'x' ? FaXTwitter : FaInstagram;
  const initials = item.author.split(' ').map(w => w[0]).join('').slice(0, 2);

  return (
    <div className={`${CARD} p-5`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center shrink-0">
            <span className="text-[11px] font-black font-display tracking-tighter accent-text">{initials}</span>
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold leading-tight truncate">{item.author}</div>
            <div className="text-[11px] opacity-40 leading-tight truncate">{item.handle}</div>
          </div>
        </div>
        <Icon size={15} className="opacity-30 shrink-0 mt-1" />
      </div>

      <p className="text-sm opacity-80 leading-relaxed mb-4">{item.text}</p>

      <div className="flex flex-wrap gap-x-5 gap-y-2 pt-4 border-t border-white/5">
        {item.stats.map(stat => (
          <div key={stat.label}>
            <div className="text-base font-black font-display tracking-tighter accent-text leading-none">
              {stat.value}
            </div>
            <div className="text-[9px] uppercase tracking-[0.2em] opacity-35 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      <p className="font-mono text-[10px] opacity-35 mt-4 leading-relaxed">{item.note}</p>
      <div className="flex items-center justify-between mt-3">
        <span className="font-mono text-[10px] opacity-30">{item.date}</span>
        <SourceLink href={item.href} label="View post" />
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

function CourseCard({ item }: { item: Extract<BragItem, { kind: 'course' }> }) {
  return (
    <div className={`${CARD} p-5`}>
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm font-black font-display tracking-tighter uppercase">{item.platform}</span>
        <span className={TAG}>{item.tag}</span>
      </div>

      <p className="text-[10px] uppercase tracking-[0.2em] opacity-40 mb-3">{item.kicker}</p>
      <h4 className={`${TITLE} text-2xl mb-5`}>{item.title}</h4>

      <div className="space-y-3 pt-4 border-t border-white/5">
        <div className="flex items-baseline gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0 translate-y-[-2px]" />
          <div>
            <div className="text-sm font-bold leading-tight">Brian Cliette</div>
            <div className="text-[11px] opacity-40 leading-tight">{item.role}</div>
          </div>
        </div>
        {item.cohosts.map(host => (
          <div key={host.name} className="flex items-baseline gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0 translate-y-[-2px]" />
            <div>
              <div className="text-sm opacity-60 leading-tight">{host.name}</div>
              <div className="text-[11px] opacity-30 leading-tight">{host.role}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <SourceLink href={item.href} label="View course" />
      </div>
    </div>
  );
}

function BragCard({ item }: { item: BragItem }) {
  switch (item.kind) {
    case 'photo': return <PhotoCard item={item} />;
    case 'post': return <PostCard item={item} />;
    case 'video': return <VideoCard item={item} />;
    case 'course': return <CourseCard item={item} />;
  }
}

export function BragWall() {
  return (
    // relative z-10 keeps this above the pinned Featured Work section's
    // decorative layer, which overhangs the sections that follow it.
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

const INTERVAL_MS = 7000;

export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const go = useCallback((next: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex((next + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => go(index - 1, -1), [index, go]);
  const next = useCallback(() => go(index + 1, 1), [index, go]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => go(index + 1, 1), INTERVAL_MS);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [index, paused, go]);

  // Arrow keys steer the carousel only while it's the thing being looked at —
  // a page-wide listener would hijack arrow scrolling everywhere else.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const onKey = (e: KeyboardEvent) => {
      if (!section.contains(document.activeElement)) return;
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next]);

  const testimonial = TESTIMONIALS[index];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: (d: number) => ({ opacity: 0, x: d * -40, transition: { duration: 0.3 } }),
  };

  return (
    <section
      ref={sectionRef}
      className="pb-32 px-6 md:px-12"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Speaking feedback"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className={`${TAG} mb-4`}>{TESTIMONIAL_CONTEXT.eyebrow}</p>
          <h3 className="text-3xl md:text-5xl font-black font-display tracking-tighter uppercase leading-none">
            {TESTIMONIAL_CONTEXT.headline}
          </h3>
        </div>

        <div className="relative">
          <div
            className="relative rounded-2xl brutal-border bg-white/[0.03] px-7 md:px-14 py-12 min-h-[300px] flex items-center overflow-hidden"
            aria-live="polite"
            aria-atomic="true"
          >
            <span
              className="absolute top-4 left-6 md:left-10 text-8xl leading-none select-none pointer-events-none accent-text opacity-15 font-display"
              aria-hidden="true"
            >
              &ldquo;
            </span>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-col gap-8 w-full relative"
              >
                <blockquote>
                  <p className="text-lg md:text-xl leading-relaxed opacity-90">{testimonial.quote}</p>
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-white/10" />
                  <div className="text-right">
                    <p className="text-sm font-bold leading-tight">{testimonial.name}</p>
                    <p className="text-[11px] opacity-40 leading-tight mt-0.5">
                      {testimonial.role} — {TESTIMONIAL_CONTEXT.source}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full items-center justify-center brutal-border bg-[#080808] opacity-50 hover:opacity-100 hover:text-[#2563EB] transition-all duration-200 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full items-center justify-center brutal-border bg-[#080808] opacity-50 hover:opacity-100 hover:text-[#2563EB] transition-all duration-200 cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex items-center justify-center gap-2 mt-8" role="tablist" aria-label="Select testimonial">
          {TESTIMONIALS.map((item, i) => (
            <button
              key={item.name}
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial from ${item.name}`}
              onClick={() => go(i, i > index ? 1 : -1)}
              className="relative h-1 rounded-full overflow-hidden bg-white/15 transition-all duration-300 cursor-pointer"
              style={{ width: i === index ? 48 : 12 }}
            >
              {i === index && (
                <div
                  key={`progress-${index}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-[#2563EB]"
                  style={{
                    animation: `brag-progress ${INTERVAL_MS}ms linear forwards`,
                    animationPlayState: paused ? 'paused' : 'running',
                  }}
                />
              )}
            </button>
          ))}
        </div>

        <p className="text-center font-mono text-[10px] opacity-30 mt-8 leading-relaxed">
          From a training delivered to a {TESTIMONIAL_CONTEXT.audience}.
        </p>
      </div>
    </section>
  );
}
