import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CASE_STUDIES } from './data/caseStudies';

function TagGroup({ label, items }: { label: string; items: string[] }) {
  if (!items.length) return null;
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.25em] opacity-40 mb-3">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map(item => (
          <span
            key={item}
            className="text-[11px] leading-none px-2.5 py-1.5 rounded border border-[#2563EB]/30 text-white/75 bg-[#2563EB]/[0.07]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-[0.25em] opacity-40 mb-1.5">{label}</p>
      <p className="text-[12px] leading-snug opacity-80">{value}</p>
    </div>
  );
}

export function CaseStudySection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const sectionRef = useRef<HTMLElement>(null);

  const go = useCallback((next: number, dir: 1 | -1) => {
    setDirection(dir);
    setIndex((next + CASE_STUDIES.length) % CASE_STUDIES.length);
  }, []);

  const prev = useCallback(() => go(index - 1, -1), [index, go]);
  const next = useCallback(() => go(index + 1, 1), [index, go]);

  // Scoped to the section so arrow keys don't hijack page scrolling elsewhere.
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

  const study = CASE_STUDIES[index];

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
      id="case-studies"
      className="relative z-10 scroll-mt-28 py-32 px-6 md:px-12 border-t border-white/5"
      aria-roledescription="carousel"
      aria-label="Client case studies"
    >
      <div className="mb-16 border-l-2 border-[#2563EB] pl-6">
        <h2 className="text-[10px] uppercase tracking-widest accent-text mb-4">Case Studies</h2>
        <h3 className="text-4xl md:text-6xl font-black font-display tracking-tighter uppercase leading-none">
          The Full<br />Engagement.
        </h3>
        <p className="text-sm opacity-50 leading-relaxed mt-6 max-w-md">
          {CASE_STUDIES.length} engagements — the brief, the stack, the number it moved.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="rounded-2xl brutal-border bg-white/[0.03] p-6 md:p-12 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={study.slug}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-16"
              aria-live="polite"
            >
              {/* Narrative */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-4 flex-wrap mb-1">
                  <h4 className="text-3xl md:text-5xl font-black font-display uppercase tracking-tighter leading-none">
                    {study.client}
                  </h4>
                  <span className="font-mono text-[11px] opacity-30">
                    {String(index + 1).padStart(2, '0')} / {String(CASE_STUDIES.length).padStart(2, '0')}
                  </span>
                </div>
                <p className="text-sm accent-text font-bold mb-5">{study.role}</p>

                {/* The number it moved — the reason this card exists */}
                <div className="border-l-2 border-[#2563EB] pl-5 py-1 mb-7">
                  <p className="text-base md:text-lg leading-relaxed">{study.highlight}</p>
                </div>

                <p className="text-sm opacity-60 leading-relaxed mb-8">{study.narrative}</p>

                <div className="mt-auto grid grid-cols-2 sm:grid-cols-3 gap-5 pt-6 border-t border-white/5">
                  <Fact label="Engagement" value={study.engagement} />
                  <Fact label="Period" value={study.period} />
                  <Fact label="Location" value={study.location} />
                </div>
              </div>

              {/* Tag groups */}
              <div className="flex flex-col gap-7">
                <TagGroup label="Skills" items={study.skills} />
                <TagGroup label="Tools" items={study.tools} />
                <div className="grid grid-cols-2 gap-6 pt-1">
                  <Fact label="Industry" value={study.industries.join(', ')} />
                  <Fact label="Audience" value={study.audiences.join(', ')} />
                  <Fact label="Company Stage" value={study.companyStage.join(', ')} />
                  <Fact label="Product Price Point" value={study.pricePoint.join(', ')} />
                </div>
                <TagGroup label="Sub-Industries or Products" items={study.subIndustries} />
                <TagGroup label="Target Buyer Demographic" items={study.targetBuyer} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          onClick={prev}
          aria-label="Previous case study"
          className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 rounded-full items-center justify-center brutal-border bg-[#080808] opacity-50 hover:opacity-100 hover:text-[#2563EB] transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          aria-label="Next case study"
          className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 rounded-full items-center justify-center brutal-border bg-[#080808] opacity-50 hover:opacity-100 hover:text-[#2563EB] transition-all duration-200 cursor-pointer"
        >
          <ChevronRight size={18} />
        </button>

        {/* Mobile/tablet controls, since the side arrows are hidden there */}
        <div className="flex lg:hidden items-center justify-center gap-4 mt-8">
          <button
            onClick={prev}
            aria-label="Previous case study"
            className="w-10 h-10 rounded-full flex items-center justify-center brutal-border bg-[#080808] opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            aria-label="Next case study"
            className="w-10 h-10 rounded-full flex items-center justify-center brutal-border bg-[#080808] opacity-70 hover:opacity-100 transition-opacity duration-200 cursor-pointer"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mt-8" role="tablist" aria-label="Select case study">
          {CASE_STUDIES.map((item, i) => (
            <button
              key={item.slug}
              role="tab"
              aria-selected={i === index}
              aria-label={item.client}
              onClick={() => go(i, i > index ? 1 : -1)}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                i === index ? 'bg-[#2563EB]' : 'bg-white/15 hover:bg-white/35'
              }`}
              style={{ width: i === index ? 40 : 12 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
