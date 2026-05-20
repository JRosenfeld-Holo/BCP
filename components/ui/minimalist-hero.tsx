import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
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
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-foreground/60 transition-colors hover:text-foreground">
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
  const { scrollY } = useScroll();

  const imageOpacity = useTransform(scrollY, [0, 350], [1, 0]);
  const leftX = useTransform(scrollY, [0, 350], ['0%', '55%']);
  const rightX = useTransform(scrollY, [0, 350], ['0%', '-55%']);
  const textOpacityFade = useTransform(scrollY, [200, 350], [1, 0.4]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background p-8 font-sans md:p-12',
        className
      )}
    >
      {/* Full-bleed background embed */}
      <div className="absolute inset-0 z-0">
        <UnicornStudioEmbed />
      </div>

      {/* Main Content */}
      <div className="relative z-10 grid w-full max-w-7xl flex-grow grid-cols-1 items-center md:grid-cols-3">
        {/* Left: large name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          style={{ x: leftX, opacity: textOpacityFade }}
          className="order-2 md:order-1 flex items-center justify-center text-center md:justify-start"
        >
          <h1 className="text-7xl font-extrabold text-foreground md:text-8xl lg:text-9xl leading-none">
            {overlayText.part1}
            <br />
            {overlayText.part2}
          </h1>
        </motion.div>

        {/* Center: image */}
        <div className="relative order-1 md:order-2 flex justify-center items-center h-full">
          <motion.img
            src={imageSrc}
            alt={imageAlt}
            className="relative z-10 h-auto w-[268px] object-cover md:w-[307px] scale-150 lg:w-[346px]"
            style={{
              maskImage: 'radial-gradient(ellipse 72% 85% at 52% 34%, white 48%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 72% 85% at 52% 34%, white 48%, transparent 80%)',
              opacity: imageOpacity,
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
          style={{ x: rightX, opacity: textOpacityFade }}
          className="order-3 flex items-center justify-center text-center md:justify-start"
        >
          <h2 className="text-7xl font-extrabold text-foreground leading-none">
            {mainText.split('|').map((line, i) => (
              <React.Fragment key={i}>{line}<br /></React.Fragment>
            ))}
          </h2>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
          className="flex items-center space-x-4"
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
