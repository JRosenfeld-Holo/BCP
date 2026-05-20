"use client";

import { cn } from "@/lib/utils";

export interface BentoItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  status?: string;
  tags?: string[];
  meta?: string;
  cta?: string;
  colSpan?: number;
  hasPersistentHover?: boolean;
  onClick?: () => void;
  accent?: boolean;
}

interface BentoGridProps {
  items: BentoItem[];
}

function BentoGrid({ items }: BentoGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={item.onClick}
          className={cn(
            "group relative p-8 rounded-xl overflow-hidden transition-all duration-300",
            "border border-white/10",
            item.accent
              ? "bg-[#2563EB] text-white"
              : "bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/60",
            "hover:shadow-[0_4px_24px_rgba(37,99,235,0.15)]",
            "hover:-translate-y-1 will-change-transform",
            item.colSpan === 2 ? "sm:col-span-2 md:col-span-2" : "col-span-1",
            item.onClick ? "cursor-pointer" : "",
            item.hasPersistentHover && "-translate-y-1 shadow-[0_4px_24px_rgba(37,99,235,0.15)]"
          )}
        >
          {/* Dot grid overlay */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
            )}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[length:4px_4px]" />
          </div>

          <div className="relative flex flex-col h-full min-h-[200px] justify-between space-y-6">
            {/* Top row */}
            <div className="flex items-start justify-between">
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                item.accent ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10"
              )}>
                {item.icon}
              </div>
              {item.status && (
                <span className={cn(
                  "text-xs font-medium px-2 py-1 rounded-lg",
                  item.accent
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white/80"
                )}>
                  {item.status}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <h3 className={cn(
                "font-black font-display uppercase tracking-tighter text-2xl leading-tight",
                item.accent ? "text-white" : "text-white/90"
              )}>
                {item.title}
                {item.meta && (
                  <span className={cn(
                    "ml-2 text-xs font-normal normal-case tracking-normal",
                    item.accent ? "text-white/60" : "text-white/30"
                  )}>
                    {item.meta}
                  </span>
                )}
              </h3>
              <p className={cn(
                "text-sm leading-relaxed",
                item.accent ? "text-white/80" : "text-white/50"
              )}>
                {item.description}
              </p>
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-2">
                {item.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className={cn(
                      "text-[10px] uppercase tracking-widest px-2 py-1 rounded-md transition-all duration-200",
                      item.accent
                        ? "bg-white/20 text-white/80"
                        : "bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:text-white/60"
                    )}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className={cn(
                "text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                item.accent ? "text-white/80" : "text-[#2563EB]"
              )}>
                {item.cta || "Explore →"}
              </span>
            </div>
          </div>

          {/* Gradient border shimmer */}
          <div className={cn(
            "absolute inset-0 -z-10 rounded-xl p-px bg-gradient-to-br from-transparent via-white/5 to-transparent transition-opacity duration-300",
            item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          )} />
        </div>
      ))}
    </div>
  );
}

export { BentoGrid };
