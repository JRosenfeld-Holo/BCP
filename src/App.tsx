import React, { useRef, useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
const FunnelSection = lazy(() => import('./FunnelSection').then(m => ({ default: m.FunnelSection })));
const ServicePage = lazy(() => import('./pages/ServicePage').then(m => ({ default: m.ServicePage })));
import { motion, useScroll, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Bot, Zap, Network, LineChart, X } from 'lucide-react';
import { FaLinkedinIn, FaXTwitter, FaInstagram } from 'react-icons/fa6';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import brianHeroMinimalist from '../brian_hero_final.webp';
import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { BentoGrid, type BentoItem } from '@/components/ui/bento-grid';
import athleticGreensImg from '../athletic greens .webp';
import twilioImg from '../twilio_fin.webp';
import evidationImg from '../evidation_health.webp';

gsap.registerPlugin(ScrollTrigger);

function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Resend wiring goes here
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => { setForm({ name: '', email: '', company: '', message: '' }); setSubmitted(false); }, 400);
  };

  const inputClass = "w-full bg-white/5 border border-white/10 rounded-sm px-4 py-3 text-sm placeholder:text-white/25 placeholder:uppercase placeholder:tracking-widest focus:outline-none focus:border-[#2563EB]/60 transition-colors duration-200";
  const labelClass = "block text-[10px] uppercase tracking-widest opacity-50 mb-2";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[900] flex items-center justify-center p-4 md:p-8"
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[#080808] brutal-border rounded-sm overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/5">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[#2563EB] mb-1">Get in touch</div>
                <h2 className="text-2xl font-black font-display uppercase tracking-tighter leading-none">
                  Start Here.
                </h2>
              </div>
              <button
                onClick={handleClose}
                className="opacity-40 hover:opacity-100 transition-opacity duration-200 p-1"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="px-8 py-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-8"
                >
                  <div className="text-4xl font-black font-display uppercase tracking-tighter text-[#2563EB] mb-3">Sent.</div>
                  <p className="text-sm opacity-60">Brian will be in touch shortly.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className={labelClass}>Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="Your name"
                        className={inputClass}
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Email *</label>
                      <input
                        required
                        type="email"
                        placeholder="you@company.com"
                        className={inputClass}
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Company <span className="opacity-40">(optional)</span></label>
                    <input
                      type="text"
                      placeholder="Where do you work?"
                      className={inputClass}
                      value={form.company}
                      onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className={labelClass}>What are you working on? *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="What's broken, what you need built, and when it needs to work."
                      className={`${inputClass} resize-none leading-relaxed`}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 bg-[#2563EB] text-white font-black uppercase tracking-tighter text-sm py-4 rounded-full hover:bg-white hover:text-[#080808] transition-colors duration-200"
                  >
                    Send Message <ArrowUpRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [contactOpen, setContactOpen] = useState(false);
  const openContact = () => setContactOpen(true);

  return (
    <div ref={containerRef} className="min-h-screen bg-navy-900 overflow-x-hidden font-sans selection:bg-cyan-accent selection:text-white relative">
      <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none z-50">
        <div className="w-8 h-8 border-t border-r border-[#2563EB]" />
      </div>
      <div className="absolute bottom-0 left-0 p-4 opacity-20 pointer-events-none z-50">
        <div className="w-8 h-8 border-b border-l border-[#2563EB]" />
      </div>
      <ScrollProgress />
      <Navbar onContact={openContact} />
      <HeroSection />
      <LogoMarquee />
      <AboutSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <Suspense fallback={<div className="h-screen border-t border-white/5" />}>
        <FunnelSection />
      </Suspense>
      <ContactSection />
      <Footer onContact={openContact} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services/:slug" element={<ServicePageRoute />} />
      </Routes>
    </>
  );
}

function ServicePageRoute() {
  const { slug } = useParams();
  return <ServicePage slug={slug ?? ''} />;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#2563EB] z-[999] origin-left"
    />
  );
}

function Navbar({ onContact }: { onContact: () => void }) {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-5 inset-x-0 z-[200] flex justify-center pointer-events-none"
    >
      <nav
        className="pointer-events-auto rounded-full bg-[#080808]/90 backdrop-blur-md overflow-hidden"
        style={{ border: '1px solid rgba(37,99,235,0.35)' }}
      >
        <div className="flex items-center px-5 py-[10px]">
          <span className="font-black font-display tracking-tighter uppercase text-[15px] leading-none shrink-0">
            Brian Cliette
          </span>
          <div className="w-px h-4 bg-white/20 mx-5 shrink-0" />
          <div className="flex gap-5 md:gap-7 items-center text-[13px] md:text-[15px] uppercase tracking-tighter font-black font-display">
            <a href="#about" className="hidden sm:block opacity-75 hover:opacity-100 hover:text-[#2563EB] transition-all duration-200">About</a>
            <a href="#services" className="hidden sm:block opacity-75 hover:opacity-100 hover:text-[#2563EB] transition-all duration-200">Services</a>
            <a href="#work" className="hidden sm:block opacity-75 hover:opacity-100 hover:text-[#2563EB] transition-all duration-200">Work</a>
            <button onClick={onContact} className="bg-[#2563EB] text-white rounded-full px-4 py-2 hover:opacity-80 transition-opacity duration-200 cursor-pointer">Let's Talk</button>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}

function HeroSection() {
  return (
    <MinimalistHero
      mainText="Build Agents.|Print Pipeline."
      imageSrc={brianHeroMinimalist}
      imageAlt="Brian Cliette — Agentic Engineering & AI GTM Consultant"
      overlayText={{ part1: 'Brian', part2: 'Cliette' }}
      socialLinks={[
        { icon: FaLinkedinIn, href: 'https://linkedin.com/in/briancliette' },
        { icon: FaXTwitter, href: 'https://twitter.com/briancliette' },
        { icon: FaInstagram, href: 'https://instagram.com/briancliette' },
      ]}
      locationText=""
    />
  );
}


const ABOUT_FRAME_COUNT = 80;

function AboutFrameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameIndexRef = useRef(ABOUT_FRAME_COUNT - 1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const draw = (index: number) => {
      const img = framesRef.current[index];
      if (!img?.complete || !img.naturalWidth) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      // Contain semantics: full frame visible, letterboxed if needed
      const scale = Math.min(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
      const x = (canvas.width - img.naturalWidth * scale) / 2;
      const y = (canvas.height - img.naturalHeight * scale) / 2;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    };

    const syncSize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      draw(frameIndexRef.current);
    };

    const resizeObserver = new ResizeObserver(syncSize);
    resizeObserver.observe(container);
    syncSize();

    const preload = () => {
      const images: HTMLImageElement[] = new Array(ABOUT_FRAME_COUNT);
      framesRef.current = images;

      const loadFrame = (i: number) => {
        const img = new Image();
        img.src = `/about-frames/frame_${String(i + 1).padStart(3, '0')}.webp`;
        img.onload = () => {
          if (i === ABOUT_FRAME_COUNT - 1) {
            frameIndexRef.current = ABOUT_FRAME_COUNT - 1;
            draw(ABOUT_FRAME_COUNT - 1);
          }
        };
        images[i] = img;
      };

      // Load the initial display frame immediately
      loadFrame(ABOUT_FRAME_COUNT - 1);

      // Load remaining frames in batches of 10 to avoid network stall
      const BATCH = 10;
      const loadBatch = (start: number) => {
        for (let i = start; i < Math.min(start + BATCH, ABOUT_FRAME_COUNT - 1); i++) {
          loadFrame(i);
        }
        if (start + BATCH < ABOUT_FRAME_COUNT - 1) {
          setTimeout(() => loadBatch(start + BATCH), 80);
        }
      };
      setTimeout(() => loadBatch(0), 0);
    };

    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: 'bottom top',
      onUpdate: (self) => {
        const idx = Math.max(0, ABOUT_FRAME_COUNT - 1 - Math.floor(self.progress * ABOUT_FRAME_COUNT));
        if (idx !== frameIndexRef.current) {
          frameIndexRef.current = idx;
          draw(idx);
        }
      },
    });

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { preload(); observer.disconnect(); } },
      { rootMargin: '400px' }
    );
    observer.observe(container);

    return () => {
      st.kill();
      observer.disconnect();
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

function AboutSection() {
  const stats = [
    { value: '800K–1M', label: 'Organic Leads / Month' },
    { value: '$60M+', label: 'Ad Budget Managed' },
    { value: '55K+', label: 'Udemy Students' },
    { value: '5M+', label: 'Book Downloads' },
  ];

  const press = [
    { name: 'Entrepreneur', src: '/press/Entrepreneur-logo.webp' },
    { name: 'Forbes',       src: '/press/forbes-logo-black-transparent.webp' },
    { name: 'Inc.',         src: '/press/Inc._(business_magazine)_logo.svg.webp' },
    { name: 'HuffPost',     src: '/press/huffpost.svg' },
    { name: 'Penn State',   src: '/press/penn state news.webp' },
  ];

  return (
    <section id="about" className="border-t border-white/5 overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[700px]">

        {/* Content column */}
        <div className="w-full md:w-3/5 pt-20 md:pt-40 pb-16 px-8 md:px-16 flex flex-col">
          <div className="mb-10 border-l-2 border-[#2563EB] pl-6">
            <h2 className="text-[10px] uppercase tracking-widest accent-text mb-4">01 // Origin Story</h2>
            <h3 className="text-4xl md:text-5xl font-black font-display tracking-tighter uppercase leading-none">
              Operator.<br />Architect.<br />Already Shipped It.
            </h3>
          </div>

          <div className="space-y-4 pl-6 border-l border-white/10 mb-10">
            <p className="text-sm opacity-70 leading-relaxed">
              Most AI strategy ends at the deck. Mine ends at the dashboard. I design and deploy agent infrastructure: prospecting systems, signal workflows, RevOps automation that turns intent into closed revenue. Not someday. This quarter.
            </p>
            <p className="text-sm opacity-70 leading-relaxed">
              I've been building on the internet since Friendster. Investment banker, university professor, growth operator; I've run every motion. In the last decade: Twilio's $60M global paid program, AG1's climb to $2B, Pixlee (a16z-backed), and U-Lace (Shark Tank / Mark Cuban).
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3 mb-10">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="brutal-border p-5 bg-slate-900/50 backdrop-blur-sm rounded-sm"
              >
                <div className="text-2xl md:text-3xl font-black font-display tracking-tighter accent-text leading-none mb-1">
                  {stat.value}
                </div>
                <div className="text-[11px] uppercase tracking-[0.2em] opacity-50">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Press */}
          <div className="pl-6">
            <p className="text-[8px] uppercase tracking-[0.4em] opacity-40 mb-3">As Featured In</p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {press.map(pub => (
                <img
                  key={pub.name}
                  src={pub.src}
                  alt={pub.name}
                  className="h-5 w-auto object-contain opacity-25 hover:opacity-60 transition-opacity duration-200"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Scroll-animated frame canvas — right side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-2/5 relative shrink-0 min-h-[320px] md:min-h-0 overflow-hidden"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 28%, black 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            maskImage: 'linear-gradient(to right, transparent 0%, black 28%, black 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 100%)',
            maskComposite: 'intersect',
          }}
        >
          <AboutFrameCanvas />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2563EB]/10 via-transparent to-[#080808]/50 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const navigate = useNavigate();
  return (
    <section id="services" className="py-32 px-6 md:px-12">
      <div className="mb-16 border-l-2 border-[#2563EB] pl-6">
        <h2 className="text-[10px] uppercase tracking-widest accent-text mb-4">02 // Core Services</h2>
        <h3 className="text-4xl md:text-6xl font-black font-display tracking-tighter uppercase leading-none">
          The AI<br />Playbook.
        </h3>
      </div>

      <BentoGrid items={[
        {
          title: "Agentic Engineering",
          meta: "01. Intelligence",
          description: "Purpose-built agent networks that handle outreach from first signal to booked meeting, with no SaaS seat and no babysitting required. Clients average 240% ROI within 12 months.",
          icon: <Bot className="w-5 h-5 text-[#2563EB]" />,
          status: "Flagship",
          tags: ["Agents", "Outreach", "Pipeline"],
          colSpan: 2,
          hasPersistentHover: true,
          cta: "Learn more →",
          onClick: () => navigate('/services/agentic-engineering'),
        },
        {
          title: "AI Automation",
          meta: "03. Automation",
          description: "Research, enrichment, CRM hygiene, lead scoring: the work eating 6 hours of your reps' day runs 24/7 on agents instead.",
          icon: <Zap className="w-5 h-5 text-white" />,
          status: "Always on",
          tags: ["Workflows", "CRM", "Enrichment"],
          accent: true,
          cta: "Learn more →",
          onClick: () => navigate('/services/ai-automation'),
        },
        {
          title: "AI-First GTM Strategy",
          meta: "02. Strategy",
          description: "I build the signal-to-pipeline stack that turns buyer behavior into booked meetings before the window closes.",
          icon: <Network className="w-5 h-5 text-[#2563EB]" />,
          status: "Strategic",
          tags: ["GTM", "Intent", "Pipeline"],
          colSpan: 2,
          cta: "Learn more →",
          onClick: () => navigate('/services/gtm-strategy'),
        },
        {
          title: "Revenue Intelligence",
          meta: "04. Revenue",
          description: "Signal monitoring and AI scoring that identifies which accounts are in-market this week, before your competitors book the first call.",
          icon: <LineChart className="w-5 h-5 text-[#2563EB]" />,
          status: "Live",
          tags: ["Signals", "Scoring", "AI"],
          cta: "Learn more →",
          onClick: () => navigate('/services/revenue-intelligence'),
        },
      ] as BentoItem[]} />
    </section>
  );
}

function LogoMarquee() {
  const logos = [
    'ag1logo.webp',
    'twilio logo.webp',
    'evidation logo.webp',
    'pixlee logo.webp',
    'ulace logo.webp',
    'Penn-State-University-Logo.webp',
    'Planoly_Logo.webp',
    'begin health logo.webp',
    'marketerhire logo.webp',
    'gem logo.webp',
    'snipfeedlogo.webp',
    'growth machine logo.webp',
    'Tribe Metrics.webp',
    'NutrotonicLogo.webp',
    'Drknotlogo.webp',
    'five star jewelers.webp',
    'freida rothman logo.webp',
    'keratincure logo.webp',
    'logotype_cohen-financial.webp',
    'cc-stacked-logo.webp',
    'flysupply logo.webp',
    'weco logo.webp',
    'BrandBossHQ-Logo-Dark.webp',
    'Cliette Ai.webp',
    'Waliy Ai.webp',
    'startearly-logo-new-purple.svg',
  ];

  return (
    <div className="py-12 border-b border-white/5 overflow-hidden">
      <p className="text-[8px] uppercase tracking-[0.4em] opacity-30 text-center mb-8">Brands & Teams I've Worked With</p>
      <div className="animate-marquee-logos flex items-center whitespace-nowrap w-max">
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="mx-10 shrink-0 w-[160px] h-[56px] flex items-center justify-center">
            <img
              src={`/logos/${encodeURIComponent(logo)}`}
              alt=""
              className="max-w-full max-h-full object-contain opacity-30 hover:opacity-70 transition-opacity duration-300"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function FeaturedWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const projects = [
    {
      title: 'Athletic Greens',
      category: 'CRO & Sales Funnel Optimization',
      desc: 'Led 25+ CRO tests managing 1M+ monthly visitors, boosting net new customers from ~800 to ~1,250 per month with conversion lifts of 5–45%.',
      img: athleticGreensImg,
    },
    {
      title: 'Twilio',
      category: 'Demand Generation',
      desc: 'Co-managed a $60M global paid ads budget and a 12-person team, optimizing developer acquisition across Stack Overflow, Reddit, and Quora.',
      img: twilioImg,
    },
    {
      title: 'Evidation Health',
      category: 'Growth Marketing',
      desc: 'Drove 600K net signups and a 40% MAU increase in under six months, surpassing company growth goals by 103%.',
      img: evidationImg,
    },
  ]

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const panels = section.querySelectorAll<HTMLElement>('.panel-item')
    const totalPanels = panels.length
    const panelSegment = 1 / totalPanels
    const panelYOffset = 5
    const panelScaleStep = 0.075

    panels.forEach((panel, idx) => {
      gsap.set(panel, {
        xPercent: -50,
        yPercent: -50 + idx * panelYOffset,
        scale: 1 - idx * panelScaleStep,
      })
    })

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${window.innerHeight * totalPanels * 1.5}px`,
      pin: true,
      pinSpacing: true,
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress
        const activeIdx = Math.min(Math.floor(progress / panelSegment), totalPanels - 1)
        const segProgress = (progress - activeIdx * panelSegment) / panelSegment

        panels.forEach((panel, idx) => {
          if (idx < activeIdx) {
            gsap.set(panel, { yPercent: -250, rotationX: 35 })
          } else if (idx === activeIdx) {
            gsap.set(panel, {
              yPercent: gsap.utils.interpolate(-50, -200, segProgress),
              rotationX: gsap.utils.interpolate(0, 35, segProgress),
              scale: 1,
            })
          } else {
            const offset = idx - activeIdx
            gsap.set(panel, {
              yPercent: -50 + (offset - segProgress) * panelYOffset,
              rotationX: 0,
              scale: 1 - (offset - segProgress) * panelScaleStep,
            })
          }
        })
      },
    })

    return () => { st.kill() }
  }, [])

  return (
    // Height-0 outer div: GSAP pin spacer = end value only (not end + 100vh).
    // Removes the one-screen blank gap that appears after all cards animate out.
    <div
      id="work"
      ref={sectionRef}
      className="relative w-full border-t border-white/5"
    >
      {/* Full-screen visual layer — absolutely positioned so it doesn't contribute to outer div height */}
      <div
        className="absolute top-0 left-0 w-full h-screen overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {/* CSS atmospheric background — no WebGL cost */}
        <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(37,99,235,0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 15% 85%, rgba(107,114,128,0.06) 0%, transparent 60%), #080808' }} />

        {/* Section label */}
        <div className="absolute top-12 left-12 z-30 pointer-events-none">
          <div className="text-[10px] uppercase tracking-widest accent-text mb-1">03 // Featured Work</div>
          <div className="text-[10px] font-mono opacity-30 uppercase tracking-widest">Scroll to explore</div>
        </div>

        {/* Card deck */}
        {projects.map((project, i) => (
          <div
            key={i}
            className="panel-item absolute top-1/2 left-1/2 rounded-2xl overflow-hidden"
            style={{
              width: '65%',
              height: '62%',
              zIndex: projects.length - i,
              transformOrigin: 'center bottom',
              willChange: 'transform',
            }}
          >
            <img src={project.img} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/50 to-transparent" />

            <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs opacity-40">0{i + 1}</span>
              </div>
              <div>
                <h4 className="text-4xl md:text-6xl font-black font-display uppercase tracking-tighter leading-none mb-4">
                  {project.title}
                </h4>
                <p className="text-sm opacity-60 leading-relaxed max-w-md">{project.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SilkBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(el.offsetWidth, el.offsetHeight)
    el.appendChild(renderer.domElement)

    const uniforms = {
      uTime: { value: 0 },
      uSpeed: { value: 1.2 },
      uScale: { value: 1.5 },
      uNoiseIntensity: { value: 0.9 },
      uColor: { value: new THREE.Vector3(0.05, 0.1, 0.18) }, // dark navy
      uRotation: { value: 0.4 },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      vertexShader: /* glsl */`
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: /* glsl */`
        varying vec2 vUv;
        uniform float uTime;
        uniform vec3 uColor;
        uniform float uSpeed;
        uniform float uScale;
        uniform float uRotation;
        uniform float uNoiseIntensity;

        const float e = 2.71828182845904523536;

        float noise(vec2 texCoord) {
          float G = e;
          vec2 r = G * sin(G * texCoord);
          return fract(r.x * r.y * (1.0 + texCoord.x));
        }

        vec2 rotateUvs(vec2 uv, float angle) {
          float c = cos(angle); float s = sin(angle);
          return mat2(c, -s, s, c) * uv;
        }

        void main() {
          float rnd = noise(gl_FragCoord.xy);
          vec2 uv = rotateUvs(vUv * uScale, uRotation);
          vec2 tex = uv * uScale;
          float tOffset = uSpeed * uTime;
          tex.y += 0.03 * sin(8.0 * tex.x - tOffset);
          float pattern = 0.6 + 0.4 * sin(5.0 * (tex.x + tex.y +
                            cos(3.0 * tex.x + 5.0 * tex.y) + 0.02 * tOffset) +
                            sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));
          vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
          col.a = 0.9;
          gl_FragColor = col;
        }
      `,
    })

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material)
    scene.add(mesh)

    let rafId: number
    let visible = false
    let lastTime = performance.now()

    const tick = () => {
      const now = performance.now()
      uniforms.uTime.value += (now - lastTime) / 1000 * 0.1
      lastTime = now
      renderer.render(scene, camera)
      if (visible) rafId = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible) { lastTime = performance.now(); tick() }
        else cancelAnimationFrame(rafId)
      },
      { threshold: 0.05 }
    )
    observer.observe(el)

    const onResize = () => renderer.setSize(el.offsetWidth, el.offsetHeight)
    window.addEventListener('resize', onResize)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      material.dispose()
      mesh.geometry.dispose()
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function ContactSection() {
  const [form, setForm] = React.useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = React.useState(false);
  const [focused, setFocused] = React.useState<string | null>(null);

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const Field = ({
    id, label, type = 'text', placeholder, required = false, textarea = false,
  }: { id: string; label: string; type?: string; placeholder: string; required?: boolean; textarea?: boolean }) => {
    const isFocused = focused === id;
    const baseClass = [
      'w-full bg-white/5 border rounded-lg px-4 py-3 text-sm placeholder:text-white/20 placeholder:uppercase placeholder:tracking-widest',
      'focus:outline-none transition-all duration-300 resize-none',
      isFocused ? 'border-[#2563EB]/60 bg-white/[0.07] shadow-[0_0_0_3px_rgba(37,99,235,0.1)]' : 'border-white/10',
    ].join(' ');
    return (
      <div className="relative group">
        <label
          htmlFor={id}
          className={`block text-[9px] uppercase tracking-[0.25em] mb-2 transition-colors duration-200 ${
            isFocused ? 'text-white' : 'text-white/70'
          }`}
        >
          {label}{required && <span className="ml-1 text-[#2563EB]">*</span>}
        </label>
        {textarea ? (
          <textarea
            id={id}
            rows={4}
            required={required}
            placeholder={placeholder}
            className={baseClass + ' leading-relaxed'}
            value={form[id as keyof typeof form]}
            onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
            onFocus={() => setFocused(id)}
            onBlur={() => setFocused(null)}
          />
        ) : (
          <input
            id={id}
            type={type}
            required={required}
            placeholder={placeholder}
            className={baseClass}
            value={form[id as keyof typeof form]}
            onChange={e => setForm(f => ({ ...f, [id]: e.target.value }))}
            onFocus={() => setFocused(id)}
            onBlur={() => setFocused(null)}
          />
        )}
      </div>
    );
  };

  return (
    <section id="contact-form" className="pt-10 pb-32 px-6 md:px-16">
      <div className="max-w-5xl mx-auto">

        {/* Form / Success */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_32px_64px_rgba(0,0,0,0.5)] p-6 md:p-14"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center gap-6 min-h-[300px]"
            >
              <div className="w-12 h-12 rounded-full border border-[#2563EB] flex items-center justify-center">
                <ArrowUpRight size={20} className="accent-text" />
              </div>
              <div className="text-5xl font-black font-display uppercase tracking-tighter accent-text">Sent.</div>
              <p className="text-sm text-white/50 max-w-xs">Brian will review your message and follow up within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 md:gap-x-16 gap-y-8 md:gap-y-10 mb-8 md:mb-10">
                <Field id="name" label="Full Name" placeholder="Your name" required />
                <Field id="email" label="Email" type="email" placeholder="you@company.com" required />
                <Field id="company" label="Company" placeholder="Where do you work?" />
                <div className="flex items-end">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-white/30 leading-relaxed">
                    Clients typically include Series&nbsp;A–C SaaS,
                    PE-backed portcos, and growth-stage DTC brands.
                  </div>
                </div>
              </div>
              <Field id="message" label="What are you working on?" placeholder="What's broken, what you need built, and when it needs to work." required textarea />

              <div className="mt-8 md:mt-14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <p className="text-[10px] uppercase tracking-widest text-white/20">
                  No pitch decks. No NDAs upfront.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="group flex items-center gap-4 bg-[#2563EB] text-white font-black uppercase tracking-tighter text-sm px-8 py-4 rounded-full hover:bg-white hover:text-[#080808] transition-colors duration-200 cursor-pointer"
                >
                  Send Message
                  <span className="w-8 h-8 rounded-full border border-white/30 group-hover:border-[#080808]/30 flex items-center justify-center transition-colors duration-200">
                    <ArrowUpRight size={14} />
                  </span>
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}


function Footer({ onContact }: { onContact: () => void }) {
  return (
    <footer id="contact" className="relative pt-16 md:pt-32 pb-12 px-6 md:px-12 brutal-border border-x-0 border-b-0 mt-auto flex flex-col overflow-hidden">
      <SilkBackground />
      <div className="relative z-10 flex flex-col h-full">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20">
        <motion.div
          initial={{ y: 200 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col text-left border-l-2 border-[#2563EB] pl-6"
        >
          <span className="accent-text text-[10px] tracking-widest uppercase mb-4 font-bold">Selective consulting & advisory engagements</span>
          <h2 className="text-[12vw] md:text-[8vw] font-black font-display uppercase tracking-tighter leading-[0.8] mb-0">Let's<br />Build.</h2>
        </motion.div>

        <button
          onClick={onContact}
          className="mt-8 md:mt-0 flex items-center gap-4 text-base md:text-lg tracking-tighter uppercase font-bold hover:text-[#2563EB] transition-colors duration-200 cursor-pointer py-3"
        >
          Send a Message <ArrowUpRight size={24} />
        </button>
      </div>

      <div className="mt-auto border-t brutal-border pt-6 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
        <div className="flex gap-8 items-center w-full md:w-auto justify-between md:justify-start">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-widest opacity-50 mb-1">Socials</span>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/briancliette" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="p-2 -m-2 opacity-50 hover:opacity-100 hover:text-[#2563EB] transition-all duration-200"><FaLinkedinIn size={18} /></a>
              <a href="https://twitter.com/briancliette" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="p-2 -m-2 opacity-50 hover:opacity-100 hover:text-[#2563EB] transition-all duration-200"><FaXTwitter size={18} /></a>
              <a href="https://instagram.com/briancliette" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="p-2 -m-2 opacity-50 hover:opacity-100 hover:text-[#2563EB] transition-all duration-200"><FaInstagram size={18} /></a>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <div className="text-[10px] leading-tight">
            <span className="block font-bold accent-text">001. AGENTIC ENGINEERING</span>
            <span className="block opacity-40">002. AI-FIRST GTM STRATEGY</span>
            <span className="block opacity-40">003. AI AUTOMATION</span>
            <span className="block opacity-40">004. REVENUE INTELLIGENCE</span>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="text-[28px] md:text-[40px] font-black font-display tracking-tighter leading-none">
            BC<span className="accent-text">.</span>
          </div>
          <div className="text-[8px] uppercase tracking-[0.4em] opacity-40 mt-1">Agentic Engineering & AI GTM</div>
        </div>
      </div>
      </div>
    </footer>
  );
}
