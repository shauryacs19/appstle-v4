import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

const slots = [
  { x: 6, size: 22, dur: 13, delay: 0, dx: 14 },
  { x: 18, size: 16, dur: 10, delay: 4.5, dx: -10 },
  { x: 31, size: 26, dur: 15, delay: 2, dx: 8 },
  { x: 47, size: 18, dur: 11, delay: 7, dx: -14 },
  { x: 62, size: 24, dur: 14, delay: 1, dx: 12 },
  { x: 76, size: 16, dur: 9.5, delay: 5.5, dx: -6 },
  { x: 88, size: 22, dur: 12.5, delay: 3, dx: 10 },
  { x: 54, size: 14, dur: 10.5, delay: 9, dx: 6 },
];

export function RisingIcons({ icons, className }: { icons: LucideIcon[]; className?: string }) {
  return (
    <div aria-hidden style={{ "--h": "38rem" } as CSSProperties} className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {slots.map((s, i) => {
        const Icon = icons[i % icons.length];
        const style = {
          left: `${s.x}%`,
          width: s.size,
          height: s.size,
          animation: `rise-fade ${s.dur}s linear ${s.delay}s infinite`,
          "--dx": `${s.dx}px`,
          "--r0": `${i % 2 ? 8 : -10}deg`,
          "--r1": `${i % 2 ? -12 : 14}deg`,
          "--o": i % 3 === 0 ? "0.75" : "0.55",
        } as CSSProperties;
        return (
          <span key={i} className="absolute -bottom-8 text-brand-400 opacity-0 motion-reduce:hidden" style={style}>
            <Icon className="size-full" strokeWidth={1.6} />
          </span>
        );
      })}
    </div>
  );
}
