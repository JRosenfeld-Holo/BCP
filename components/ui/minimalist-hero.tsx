import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import UnicornStudioEmbed from '@/unicornstudio-project-embed-container';

interface MinimalistHeroProps {
  mainText: string;
  imageSrc: string;
  imageAlt: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  socialLinks: { icon: React.ComponentType<{ className?: string; size?: number }>; href: string }[];
  locationText: string;
  className?: string;
}

const SocialIcon = ({ href, icon: Icon }: { href: string; icon: React.ComponentType<{ className?: string; size?: number }> }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="p-2 -m-2 text-foreground/60 transition-colors hover:text-foreground">
    <Icon className="h-5 w-5" />
  </a>
);

export const MinimalistHero = ({
  mainText,
  imageSrc,
  imageAlt,
  overlayText,
  socialLinks,
  locationText,
  className,
}: MinimalistHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background font-sans',
        className
      )}
    >
      {/* Full-bleed background embed */}
      <div className="absolute inset-0 z-0">
        <UnicornStudioEmbed />
      </div>

      {/* ── MOBILE layout (hidden on md+) ───────────────────────────── */}
      <div className="md:hidden relative z-10 flex flex-col h-full w-full">
        {/* Image — top half, full width */}
        <div className="flex-1 flex items-end justify-center">
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="h-auto w-[312px] object-cover"
            style={{
              marginTop: '50px',
              maskImage: 'radial-gradient(ellipse 80% 90% at 52% 38%, white 50%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 80% 90% at 52% 38%, white 50%, transparent 80%)',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          />
        </div>

        {/* Text block — bottom half */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="px-8 pb-6 flex flex-col gap-2"
        >
          <h1 className="text-6xl font-extrabold text-foreground leading-none">
            {overlayText.part1}<br />{overlayText.part2}
          </h1>
          <h2 className="text-xl font-extrabold text-foreground/70 leading-snug">
            {mainText.split('|').map((line, i) => (
              <React.Fragment key={i}>{line}<br /></React.Fragment>
            ))}
          </h2>
        </motion.div>

        {/* Social footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="px-8 pb-8 flex items-center gap-8"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
      </div>

      {/* ── DESKTOP layout (hidden below md) ───────────────────────── */}
      <div className="hidden md:grid relative z-10 w-full max-w-7xl flex-grow grid-cols-3 items-center p-12">
        {/* Left: large name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex items-center justify-start"
        >
          <h1 className="text-7xl font-extrabold text-foreground lg:text-9xl leading-none">
            {overlayText.part1}<br />{overlayText.part2}
          </h1>
        </motion.div>

        {/* Center: image */}
        <div className="flex justify-center items-center h-full">
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 h-auto w-[368px] object-cover md:scale-150 lg:w-[415px]"
            style={{
              marginTop: '50px',
              maskImage: 'radial-gradient(ellipse 72% 85% at 52% 34%, white 48%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 72% 85% at 52% 34%, white 48%, transparent 80%)',
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
        </div>

        {/* Right: tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center justify-start"
        >
          <h2 className="text-5xl font-extrabold text-foreground lg:text-6xl leading-tight">
            {mainText.split('|').map((line, i) => (
              <span key={i} className="block whitespace-nowrap">{line}</span>
            ))}
          </h2>
        </motion.div>
      </div>

      {/* Desktop footer */}
      <footer className="hidden md:flex z-30 w-full max-w-7xl items-center justify-between px-12 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-8"
        >
          {socialLinks.map((link, index) => (
            <SocialIcon key={index} href={link.href} icon={link.icon} />
          ))}
        </motion.div>
        {locationText && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="text-sm font-medium text-foreground/80"
          >
            {locationText}
          </motion.div>
        )}
      </footer>
    </div>
  );
};
