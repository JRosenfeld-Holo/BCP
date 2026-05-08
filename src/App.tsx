import React, { useRef, useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { ServicePage } from './pages/ServicePage';

const FunnelSection = lazy(() => import('./FunnelSection').then(m => ({ default: m.FunnelSection })));
import { motion, useScroll } from 'motion/react';
import { ArrowUpRight, Search, PenTool, BarChart3, Fingerprint, Star, Linkedin, Twitter, Instagram } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import brianHeroBg from '../Brian_Hero_bg.png';
import brianHeroCutout from '../Brian_Hero_cutout.png';
import brianPortraitImg from '../746A9302_edit.jpg';
import athleticGreensImg from '../athletic greens .webp';
import twilioImg from '../twilio_fin.jpg';
import evidationImg from '../evidation_health.jpg';

function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} className="min-h-screen bg-navy-900 overflow-x-hidden font-sans selection:bg-cyan-accent selection:text-navy-900 relative">
      <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none z-50">
        <div className="w-8 h-8 border-t border-r border-[#87FFFB]" />
      </div>
      <div className="absolute bottom-0 left-0 p-4 opacity-20 pointer-events-none z-50">
        <div className="w-8 h-8 border-b border-l border-[#87FFFB]" />
      </div>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <ScrollingMarquee />
      <AboutSection />
      <ServicesSection />
      <FeaturedWorkSection />
      <Suspense fallback={<div className="h-screen border-t border-white/5" />}>
        <FunnelSection />
      </Suspense>
      <Footer />
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
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#87FFFB] z-[999] origin-left"
    />
  );
}

function Navbar() {
  const [expanded, setExpanded] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (y) => setExpanded(y > 60));
    return unsubscribe;
  }, [scrollY]);

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-5 inset-x-0 z-[200] flex justify-center pointer-events-none"
    >
      <nav
        className="pointer-events-auto rounded-full bg-[#080808]/90 backdrop-blur-md overflow-hidden"
        style={{ border: '1px solid rgba(135,255,251,0.25)' }}
      >
        <div className="flex items-center px-5 py-[10px]">
          <span className="font-black font-display tracking-tighter uppercase text-[15px] leading-none shrink-0">
            Brian Cliette
          </span>

          <div
            className="overflow-hidden flex items-center whitespace-nowrap"
            style={{
              maxWidth: expanded ? 440 : 0,
              opacity: expanded ? 1 : 0,
              transition: 'max-width 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <div className="w-px h-4 bg-white/20 mx-5 shrink-0" />
            <div className="flex gap-7 items-center text-[15px] uppercase tracking-tighter font-black font-display">
              <a href="#about" className="opacity-75 hover:opacity-100 hover:text-[#87FFFB] transition-all duration-200">About</a>
              <a href="#services" className="opacity-75 hover:opacity-100 hover:text-[#87FFFB] transition-all duration-200">Services</a>
              <a href="#work" className="opacity-75 hover:opacity-100 hover:text-[#87FFFB] transition-all duration-200">Work</a>
              <a href="#contact" className="bg-[#87FFFB] text-[#080808] rounded-full px-4 py-[7px] hover:opacity-80 transition-opacity duration-200">Let's Talk</a>
            </div>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}

function Hero() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const anim = gsap.to('[data-speed]', {
      scrollTrigger: { scrub: true },
      y: (_i: number, target: Element) =>
        (-window.outerHeight / 2) * parseFloat((target as HTMLElement).dataset.speed ?? '0'),
      x: (_i: number, target: Element) =>
        parseFloat((target as HTMLElement).dataset.drift ?? '0') * -window.outerWidth * 2,
      ease: 'none',
    });

    const nameAnim = gsap.to('.hero-name', {
      scrollTrigger: {
        trigger: '.hero-wrap',
        start: 'top top',
        end: 'bottom top',
        scrub: 0.6,
      },
      letterSpacing: '0.35em',
      opacity: 0.3,
      ease: 'power2.out',
    });

    return () => {
      anim.kill();
      nameAnim.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      <div
        className="hero-wrap"
        style={{ '--img-bg': `url(${brianHeroBg})` } as React.CSSProperties}
      >
        <img src={brianHeroCutout} alt="Brian Cliette standing with arms crossed" className="hero-cutout" />
        <div className="absolute bottom-10 left-6 md:left-12 z-[50] pointer-events-none">
          <span className="block text-[8px] uppercase tracking-[0.5em] text-black/40 font-semibold mb-1">Growth Marketing Leader</span>
          <span className="block text-[13px] uppercase tracking-[0.2em] font-black text-black/55">Turning Traffic Into Revenue</span>
        </div>
        <span className="hero-main" />
        <span className="hero-left-tri" />
        <span className="hero-stripes" />
        <span className="hero-right-tri" />
      </div>

      {/* SVG clip-path and filter definitions — 0×0, referenced by hero spans */}
      <svg
        width="1440"
        height="960"
        className="hero-svg-defs"
        style={{ height: 0, width: 0, position: 'absolute', overflow: 'hidden' }}
      >
        <clipPath id="dots" clipPathUnits="objectBoundingBox" data-speed="-2">
          <path d="M386.607 791.668C386.607 811.734 370.319 828 350.228 828C330.136 828 313.848 811.734 313.848 791.668C313.848 771.603 330.136 755.336 350.228 755.336C370.319 755.336 386.607 771.603 386.607 791.668Z" fill="#C4C4C4" />
          <path d="M292.021 791.668C292.021 807.721 278.991 820.734 262.917 820.734C246.844 820.734 233.814 807.721 233.814 791.668C233.814 775.616 246.844 762.603 262.917 762.603C278.991 762.603 292.021 775.616 292.021 791.668Z" fill="#C4C4C4" />
          <path d="M197.434 791.668C197.434 803.708 187.662 813.467 175.607 813.467C163.552 813.467 153.779 803.708 153.779 791.668C153.779 779.629 163.552 769.869 175.607 769.869C187.662 769.869 197.434 779.629 197.434 791.668Z" fill="#C4C4C4" />
          <path d="M102.848 791.668C102.848 799.694 96.3332 806.201 88.2966 806.201C80.2599 806.201 73.7448 799.694 73.7448 791.668C73.7448 783.642 80.2599 777.136 88.2966 777.136C96.3332 777.136 102.848 783.642 102.848 791.668Z" fill="#C4C4C4" />
          <path d="M335.676 719.005C335.676 735.057 322.646 748.07 306.572 748.07C290.499 748.07 277.469 735.057 277.469 719.005C277.469 702.952 290.499 689.939 306.572 689.939C322.646 689.939 335.676 702.952 335.676 719.005Z" fill="#C4C4C4" />
          <path d="M425.897 718.278C425.897 736.337 411.238 750.977 393.155 750.977C375.073 750.977 360.414 736.337 360.414 718.278C360.414 700.219 375.073 685.579 393.155 685.579C411.238 685.579 425.897 700.219 425.897 718.278Z" fill="#C4C4C4" />
          <path d="M244 718.278C244 732.324 232.599 743.71 218.534 743.71C204.47 743.71 193.069 732.324 193.069 718.278C193.069 704.232 204.47 692.846 218.534 692.846C232.599 692.846 244 704.232 244 718.278Z" fill="#C4C4C4" />
          <path d="M153.779 719.005C153.779 731.044 144.007 740.804 131.952 740.804C119.897 740.804 110.124 731.044 110.124 719.005C110.124 706.965 119.897 697.206 131.952 697.206C144.007 697.206 153.779 706.965 153.779 719.005Z" fill="#C4C4C4" />
          <path d="M54.8276 718.278C54.8276 724.298 49.9413 729.178 43.9138 729.178C37.8863 729.178 33 724.298 33 718.278C33 712.258 37.8863 707.379 43.9138 707.379C49.9413 707.379 54.8276 712.258 54.8276 718.278Z" fill="#C4C4C4" />
          <path d="M379.331 646.341C379.331 662.394 366.301 675.407 350.228 675.407C334.154 675.407 321.124 662.394 321.124 646.341C321.124 630.289 334.154 617.276 350.228 617.276C366.301 617.276 379.331 630.289 379.331 646.341Z" fill="#C4C4C4" />
          <path d="M287.655 645.615C287.655 659.66 276.254 671.047 262.19 671.047C248.125 671.047 236.724 659.66 236.724 645.615C236.724 631.569 248.125 620.182 262.19 620.182C276.254 620.182 287.655 631.569 287.655 645.615Z" fill="#C4C4C4" />
          <path d="M197.434 646.341C197.434 658.38 187.662 668.14 175.607 668.14C163.552 668.14 153.779 658.38 153.779 646.341C153.779 634.302 163.552 624.542 175.607 624.542C187.662 624.542 197.434 634.302 197.434 646.341Z" fill="#C4C4C4" />
          <path d="M105.759 645.615C105.759 655.647 97.6148 663.78 87.569 663.78C77.5231 663.78 69.3793 655.647 69.3793 645.615C69.3793 635.582 77.5231 627.449 87.569 627.449C97.6148 627.449 105.759 635.582 105.759 645.615Z" fill="#C4C4C4" />
          <path d="M328.4 573.678C328.4 585.717 318.627 595.477 306.572 595.477C294.517 595.477 284.745 585.717 284.745 573.678C284.745 561.638 294.517 551.879 306.572 551.879C318.627 551.879 328.4 561.638 328.4 573.678Z" fill="#C4C4C4" />
          <path d="M418.621 572.951C418.621 586.997 407.219 598.383 393.155 598.383C379.091 598.383 367.69 586.997 367.69 572.951C367.69 558.905 379.091 547.519 393.155 547.519C407.219 547.519 418.621 558.905 418.621 572.951Z" fill="#C4C4C4" />
          <path d="M466.641 646.341C466.641 662.394 453.611 675.407 437.538 675.407C421.465 675.407 408.434 662.394 408.434 646.341C408.434 630.289 421.465 617.276 437.538 617.276C453.611 617.276 466.641 630.289 466.641 646.341Z" fill="#C4C4C4" />
          <path d="M505.931 572.951C505.931 586.997 494.53 598.383 480.466 598.383C466.401 598.383 455 586.997 455 572.951C455 558.905 466.401 547.519 480.466 547.519C494.53 547.519 505.931 558.905 505.931 572.951Z" fill="#C4C4C4" />
          <path d="M236.724 572.951C236.724 582.984 228.58 591.117 218.534 591.117C208.489 591.117 200.345 582.984 200.345 572.951C200.345 562.918 208.489 554.785 218.534 554.785C228.58 554.785 236.724 562.918 236.724 572.951Z" fill="#C4C4C4" />
          <path d="M146.503 573.678C146.503 581.704 139.988 588.21 131.952 588.21C123.915 588.21 117.4 581.704 117.4 573.678C117.4 565.651 123.915 559.145 131.952 559.145C139.988 559.145 146.503 565.651 146.503 573.678Z" fill="#C4C4C4" />
          <path d="M277.469 501.014C277.469 509.04 270.954 515.547 262.917 515.547C254.881 515.547 248.366 509.04 248.366 501.014C248.366 492.988 254.881 486.481 262.917 486.481C270.954 486.481 277.469 492.988 277.469 501.014Z" fill="#C4C4C4" />
          <path d="M185.793 500.287C185.793 506.307 180.907 511.187 174.879 511.187C168.852 511.187 163.966 506.307 163.966 500.287C163.966 494.268 168.852 489.388 174.879 489.388C180.907 489.388 185.793 494.268 185.793 500.287Z" fill="#C4C4C4" />
          <path d="M459.366 501.014C459.366 513.053 449.593 522.813 437.538 522.813C425.483 522.813 415.71 513.053 415.71 501.014C415.71 488.975 425.483 479.215 437.538 479.215C449.593 479.215 459.366 488.975 459.366 501.014Z" fill="#C4C4C4" />
          <path d="M495.745 428.35C495.745 436.377 489.23 442.883 481.193 442.883C473.156 442.883 466.641 436.377 466.641 428.35C466.641 420.324 473.156 413.818 481.193 413.818C489.23 413.818 495.745 420.324 495.745 428.35Z" fill="#C4C4C4" />
          <path d="M539.4 501.014C539.4 513.053 529.627 522.813 517.572 522.813C505.517 522.813 495.745 513.053 495.745 501.014C495.745 488.975 505.517 479.215 517.572 479.215C529.627 479.215 539.4 488.975 539.4 501.014Z" fill="#C4C4C4" />
          <path d="M527.759 354.96C527.759 360.98 522.872 365.86 516.845 365.86C510.817 365.86 505.931 360.98 505.931 354.96C505.931 348.941 510.817 344.061 516.845 344.061C522.872 344.061 527.759 348.941 527.759 354.96Z" fill="#C4C4C4" />
          <path d="M585.966 427.624C585.966 437.657 577.822 445.79 567.776 445.79C557.73 445.79 549.586 437.657 549.586 427.624C549.586 417.591 557.73 409.458 567.776 409.458C577.822 409.458 585.966 417.591 585.966 427.624Z" fill="#C4C4C4" />
          <path d="M575.779 283.023C575.779 287.036 572.522 290.29 568.503 290.29C564.485 290.29 561.228 287.036 561.228 283.023C561.228 279.01 564.485 275.757 568.503 275.757C572.522 275.757 575.779 279.01 575.779 283.023Z" fill="#C4C4C4" />
          <path d="M666 282.297C666 288.316 661.114 293.196 655.086 293.196C649.059 293.196 644.172 288.316 644.172 282.297C644.172 276.277 649.059 271.397 655.086 271.397C661.114 271.397 666 276.277 666 282.297Z" fill="#C4C4C4" />
          <path d="M224.355 427.987C224.355 430.997 221.912 433.437 218.898 433.437C215.885 433.437 213.441 430.997 213.441 427.987C213.441 424.977 215.885 422.537 218.898 422.537C221.912 422.537 224.355 424.977 224.355 427.987Z" fill="#C4C4C4" />
          <path d="M134.862 427.624C134.862 429.63 133.233 431.257 131.224 431.257C129.215 431.257 127.586 429.63 127.586 427.624C127.586 425.617 129.215 423.991 131.224 423.991C133.233 423.991 134.862 425.617 134.862 427.624Z" fill="#C4C4C4" />
          <path d="M54.8276 572.951C54.8276 578.971 49.9413 583.85 43.9138 583.85C37.8863 583.85 33 578.971 33 572.951C33 566.931 37.8863 562.051 43.9138 562.051C49.9413 562.051 54.8276 566.931 54.8276 572.951Z" fill="#C4C4C4" />
          <path d="M750 123L1244.5 960H255.499L750 123Z" fill="#C4C4C4" />
        </clipPath>

        <clipPath id="rightTriangle" clipPathUnits="objectBoundingBox" data-speed="0.65" data-drift="-0.35">
          <path d="M1142.5 691L886 256L1399 256L1142.5 691Z" fill="#C4C4C4" />
        </clipPath>

        <clipPath id="leftTriangle" clipPathUnits="objectBoundingBox" data-speed="0.75" data-drift="0.45">
          <path fillRule="evenodd" clipRule="evenodd" d="M98 166L346 586L594 166L98 166ZM349.5 521.453C359.546 521.453 367.69 513.32 367.69 503.287C367.69 493.255 359.546 485.121 349.5 485.121C339.454 485.121 331.31 493.255 331.31 503.287C331.31 513.32 339.454 521.453 349.5 521.453ZM313.848 431.35C313.848 435.364 310.591 438.617 306.572 438.617C302.554 438.617 299.297 435.364 299.297 431.35C299.297 427.337 302.554 424.084 306.572 424.084C310.591 424.084 313.848 427.337 313.848 431.35ZM393.155 441.523C399.183 441.523 404.069 436.643 404.069 430.624C404.069 424.604 399.183 419.724 393.155 419.724C387.128 419.724 382.241 424.604 382.241 430.624C382.241 436.643 387.128 441.523 393.155 441.523ZM353.138 357.96C353.138 359.967 351.509 361.593 349.5 361.593C347.491 361.593 345.862 359.967 345.862 357.96C345.862 355.954 347.491 354.327 349.5 354.327C351.509 354.327 353.138 355.954 353.138 357.96ZM437.538 365.953C441.556 365.953 444.814 362.7 444.814 358.687C444.814 354.674 441.556 351.421 437.538 351.421C433.52 351.421 430.262 354.674 430.262 358.687C430.262 362.7 433.52 365.953 437.538 365.953ZM484.103 285.297C484.103 287.303 482.475 288.93 480.465 288.93C478.456 288.93 476.828 287.303 476.828 285.297C476.828 283.29 478.456 281.664 480.465 281.664C482.475 281.664 484.103 283.29 484.103 285.297ZM516.845 216.266C518.854 216.266 520.483 214.64 520.483 212.633C520.483 210.627 518.854 209 516.845 209C514.836 209 513.207 210.627 513.207 212.633C513.207 214.64 514.836 216.266 516.845 216.266Z" fill="#C4C4C4" />
        </clipPath>

        <clipPath id="stripes" clipPathUnits="objectBoundingBox" data-speed="-0.25" data-drift="-0.15">
          <path fillRule="evenodd" clipRule="evenodd" d="M1115.12 741H1428L1414.96 731H1109.21L1115.12 741ZM1091.78 701.5H1378.01L1353.01 681.5H1079.96L1091.78 701.5ZM1067.85 661H1326.92L1289.97 631H1050.13L1067.85 661ZM1043.63 620H1275.84L1225.85 580H1020L1043.63 620ZM1013.79 569.5H1212.81L1174.77 539.5H996.069L1013.79 569.5ZM983.662 518.5H1148.68L1123.69 498.5H971.846L983.662 518.5ZM954.417 469H1086.74L1073.69 459H948.509L954.417 469Z" fill="#C4C4C4" />
        </clipPath>

        <defs>
          <filter id="pink">
            <feFlood result="floodFill" x="0" y="0" width="100%" height="100%" floodColor="#FF87D4" floodOpacity="0.8" />
            <feBlend in="floodFill" in2="SourceGraphic" mode="soft-light" />
          </filter>
          <filter id="grey">
            <feFlood result="floodFill" x="0" y="0" width="100%" height="100%" floodColor="#F5F2FC" floodOpacity="1" />
            <feBlend in="floodFill" in2="SourceGraphic" mode="soft-light" />
          </filter>
          <filter id="blue">
            <feFlood result="floodFill" x="0" y="0" width="100%" height="100%" floodColor="#87FFFB" floodOpacity="1" />
            <feBlend in="floodFill" in2="SourceGraphic" mode="soft-light" />
          </filter>
          <filter id="yellow">
            <feFlood result="floodFill" x="0" y="0" width="100%" height="100%" floodColor="#FFE742" floodOpacity="1" />
            <feBlend in="floodFill" in2="SourceGraphic" mode="soft-light" />
          </filter>
        </defs>
      </svg>
    </>
  );
}

function ScrollingMarquee() {
  const items = [
    'Growth Marketing',
    'Conversion Rate Optimization',
    'Programmatic SEO',
    'Demand Generation',
    'Generative AI',
    'User Acquisition',
  ];

  return (
    <div className="py-10 border-y border-white/5 overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ repeat: Infinity, ease: 'linear', duration: 28 }}
        className="flex items-center whitespace-nowrap w-max"
      >
        {[...items, ...items].map((label, i) => (
          <React.Fragment key={i}>
            <span className={`text-7xl font-black font-display uppercase tracking-tighter px-10 leading-none ${i % 2 === 0 ? 'text-white/10' : 'text-outline'}`}>
              {label}
            </span>
            <span className="text-[#87FFFB] px-4 shrink-0 flex items-center"><Star size={10} fill="currentColor" /></span>
          </React.Fragment>
        ))}
      </motion.div>
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

  const press = ['Entrepreneur', 'Forbes', 'Inc.', 'Huffington Post', 'Penn State News'];

  return (
    <section id="about" className="border-t border-white/5 overflow-hidden">
      <div className="flex flex-col md:flex-row min-h-[700px]">

        {/* Content column */}
        <div className="w-full md:w-3/5 pt-40 pb-16 px-8 md:px-16 flex flex-col">
          <div className="mb-10 border-l-2 border-[#87FFFB] pl-6">
            <h2 className="text-[10px] uppercase tracking-widest accent-text mb-4">01 // Origin Story</h2>
            <h3 className="text-4xl md:text-5xl font-black font-display tracking-tighter uppercase leading-none">
              Digital Nomad.<br />Growth Hacker.<br />Results Machine.
            </h3>
          </div>

          <div className="space-y-4 pl-6 border-l border-white/10 mb-10">
            <p className="text-sm opacity-70 leading-relaxed">
              I help brands and entrepreneurs find sustainable paths to sales growth on the social internet — using creativity, market research, and data analysis to uncover each company's unique formula for consistent growth online.
            </p>
            <p className="text-sm opacity-70 leading-relaxed">
              I've been doing it since the days of Friendster & MySpace. First as a successful online entrepreneur, then as an investment banking associate, university professor, and startup digital strategist. In the past decade I've driven growth for Twilio, AG1 ($2B), Pixlee (a16z), and U-Lace (Mark Cuban / Shark Tank).
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
                <div className="text-[9px] uppercase tracking-[0.2em] opacity-50">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Press */}
          <div className="pl-6">
            <p className="text-[8px] uppercase tracking-[0.4em] opacity-40 mb-3">As Featured In</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {press.map(pub => (
                <span key={pub} className="text-[11px] font-bold uppercase tracking-widest opacity-25 hover:opacity-60 transition-opacity duration-200 cursor-default">{pub}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Image column — right side, Brian looks left into the content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full md:w-2/5 relative shrink-0 min-h-[480px] md:min-h-0"
          style={{
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 28%, black 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 100%)',
            WebkitMaskComposite: 'source-in',
            maskImage: 'linear-gradient(to right, transparent 0%, black 28%, black 100%), linear-gradient(to bottom, transparent 0%, black 15%, black 82%, transparent 100%)',
            maskComposite: 'intersect',
          }}
        >
          <img
            src={brianPortraitImg}
            alt="Brian Cliette profile portrait"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: '55% 25%' }}
          />
        </motion.div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const navigate = useNavigate();
  return (
    <section id="services" className="py-32 px-6 md:px-12">
      <div className="mb-16 border-l-2 border-[#87FFFB] pl-6">
        <h2 className="text-[10px] uppercase tracking-widest accent-text mb-4">02 // Core Capabilities</h2>
        <h3 className="text-4xl md:text-6xl font-black font-display tracking-tighter uppercase whitespace-pre-line leading-none">
          The Growth<br />Playbook.
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* SEO Strategy — large */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => navigate('/services/programmatic-seo')}
          className="brutal-border p-8 md:p-12 md:col-span-2 group rounded-sm bg-slate-900/50 backdrop-blur-sm relative overflow-hidden cursor-pointer transition-colors duration-200 hover:bg-slate-800/60"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
            <div className="group-hover:rotate-180 transition-transform duration-700 ease-out">
              <Search size={120} className="accent-text" />
            </div>
          </div>
          <div className="relative z-10 h-full flex flex-col justify-between min-h-[240px]">
            <span className="text-[10px] uppercase tracking-widest accent-text block mb-12">01. Discovery</span>
            <div>
              <h4 className="text-3xl mb-4 uppercase tracking-tighter font-display shadow-sm">
                <span className="font-light">Programmatic</span><br />
                <span className="font-black">SEO</span>
              </h4>
              <p className="text-xs opacity-60 uppercase leading-loose max-w-sm">
                Driving 800K–1M organic leads monthly through programmatic SEO architecture and high-authority link strategies. No shortcuts — just scalable systems that compound.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Analytics */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => navigate('/services/cro-ab-testing')}
          className="brutal-border p-8 group rounded-sm bg-slate-900/50 backdrop-blur-sm flex flex-col justify-between cursor-pointer transition-colors duration-200 hover:bg-slate-800/60"
        >
          <div className="flex justify-between items-start mb-8">
            <span className="text-[10px] uppercase tracking-widest accent-text">04. Data</span>
            <BarChart3 size={24} className="accent-text opacity-50 group-hover:opacity-100 transition-opacity duration-200" />
          </div>
          <div>
            <h4 className="text-xl mb-2 uppercase tracking-tighter font-display">
              <span className="font-light">CRO &</span><br />
              <span className="font-black">A/B Testing</span>
            </h4>
            <div className="w-full h-1 bg-white/10 mt-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
                className="h-full bg-[#87FFFB]"
              />
            </div>
          </div>
        </motion.div>

        {/* Content Marketing — accent card */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => navigate('/services/demand-generation')}
          className="brutal-border p-8 group rounded-sm bg-[#87FFFB] text-[#080808] md:col-span-1 md:row-span-2 flex flex-col justify-between cursor-pointer"
        >
          <span className="text-[10px] uppercase tracking-widest font-bold block mb-12">02. Narrative</span>
          <motion.div
            whileHover={{ scale: 1.1, rotate: -5 }}
            className="mb-12 origin-left"
          >
            <PenTool size={48} className="text-[#080808]" />
          </motion.div>
          <div>
            <h4 className="text-2xl mb-4 uppercase tracking-tighter font-display">
              <span className="font-light">Demand</span><br />
              <span className="font-black">Generation</span>
            </h4>
            <p className="text-xs font-semibold uppercase leading-loose opacity-80">
              Multi-channel, multi-touch campaigns that fill the funnel — from paid social and SEM to email nurtures and influencer outreach.
            </p>
          </div>
        </motion.div>

        {/* Brand Consulting — wide */}
        <motion.div
          whileHover={{ y: -4 }}
          onClick={() => navigate('/services/growth-strategy')}
          className="brutal-border p-8 md:p-12 md:col-span-3 group rounded-sm bg-slate-900/50 backdrop-blur-sm flex flex-col md:flex-row justify-between items-start md:items-end gap-8 cursor-pointer transition-colors duration-200 hover:bg-slate-800/60"
        >
          <div>
            <span className="text-[10px] uppercase tracking-widest accent-text block mb-6">03. Identity</span>
            <h4 className="text-3xl mb-4 uppercase tracking-tighter font-display">
              <span className="font-light">Growth</span><br />
              <span className="font-black">Strategy</span>
            </h4>
            <p className="text-xs opacity-60 uppercase leading-loose max-w-lg">
              Full-funnel GTM strategy — from user acquisition and retention modeling to budget allocation and channel mix optimization. Data in, revenue out.
            </p>
          </div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="p-4 border border-[#87FFFB]/30 rounded-full bg-[#080808] shrink-0"
          >
            <Fingerprint size={48} className="accent-text" />
          </motion.div>
        </motion.div>
      </div>
    </section>
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
    // GSAP sticky-card deck
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
    <div
      id="work"
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden border-t border-white/5"
      style={{ perspective: '1000px' }}
    >
      {/* CSS atmospheric background — no WebGL cost */}
      <div className="absolute inset-0 -z-10" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 60%, rgba(135,255,251,0.05) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 15% 85%, rgba(255,135,212,0.04) 0%, transparent 60%), #080808' }} />

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

          <div className="absolute inset-0 p-10 flex flex-col justify-between">
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

  return <div ref={containerRef} className="absolute inset-0 w-full h-full -z-10 pointer-events-none" />
}

function Footer() {
  return (
    <footer id="contact" className="relative pt-32 pb-12 px-6 md:px-12 brutal-border border-x-0 border-b-0 mt-auto flex flex-col overflow-hidden">
      <SilkBackground />
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 overflow-hidden">
        <motion.div
          initial={{ y: 200 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col text-left border-l-2 border-[#87FFFB] pl-6"
        >
          <span className="accent-text text-[10px] tracking-widest uppercase mb-4 font-bold">Available for consulting & full-time roles</span>
          <h2 className="text-[15vw] md:text-[8vw] font-black font-display uppercase tracking-tighter leading-[0.8] mb-0">
            Let's<br />Build.
          </h2>
        </motion.div>

        <a
          href="mailto:brian@briancliette.me"
          className="mt-12 md:mt-0 flex items-center gap-4 text-lg tracking-tighter uppercase font-bold hover:text-[#87FFFB] transition-colors duration-200 cursor-pointer"
        >
          brian@briancliette.me <ArrowUpRight size={24} />
        </a>
      </div>

      <div className="mt-auto border-t brutal-border pt-6 flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
        <div className="flex gap-8 items-center w-full md:w-auto justify-between md:justify-start">
          <div className="flex flex-col">
            <span className="text-[8px] uppercase tracking-widest opacity-50 mb-1">Socials</span>
            <div className="flex gap-4">
              <a href="https://linkedin.com/in/briancliette" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 hover:text-[#87FFFB] transition-all duration-200"><Linkedin size={18} /></a>
              <a href="https://twitter.com/briancliette" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 hover:text-[#87FFFB] transition-all duration-200"><Twitter size={18} /></a>
              <a href="https://instagram.com/briancliette" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="opacity-50 hover:opacity-100 hover:text-[#87FFFB] transition-all duration-200"><Instagram size={18} /></a>
            </div>
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <div className="text-[10px] leading-tight">
            <span className="block font-bold accent-text">001. GROWTH MARKETING</span>
            <span className="block opacity-40">002. CRO & ANALYTICS</span>
            <span className="block opacity-40">003. DEMAND GENERATION</span>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <div className="text-[40px] font-black font-display tracking-tighter leading-none">
            BC<span className="accent-text">.</span>
          </div>
          <div className="text-[8px] uppercase tracking-[0.4em] opacity-40 mt-1">Growth Marketing Leader</div>
        </div>
      </div>
    </footer>
  );
}
