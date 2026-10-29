"use client";

/*
 * Section line art (2026-10-29): every home section gets its own hand-drawn line layer,
 * themed on what the section shows — built from the existing doodle library (paths.ts,
 * drawn on when scrolled into view) plus one large flowing line per section.
 * Strokes use the palette at low opacity so the art sits behind content.
 */

import { Doodles, type DoodleSpot } from "./Doodles";
import { cn } from "@/lib/cn";

export type SectionLinesVariant = "about" | "products" | "integrations" | "growth" | "reviews" | "support" | "cta";

type Flow = { d: string; dash?: string; className: string; width?: number };

const art: Record<SectionLinesVariant, { flows: Flow[]; spots: DoodleSpot[]; viewBox: string }> = {
  /* Founded in Menlo Park, offices in British Columbia and South Asia — a dotted travel route between pins. */
  about: {
    viewBox: "0 0 1440 760",
    flows: [
      { d: "M760 120C900 40 1060 70 1150 150S1330 300 1410 250", dash: "2 10", className: "text-[#0875D1]/35", width: 2.2 },
      { d: "M40 690C180 610 300 660 420 600", dash: "2 10", className: "text-[#219BFB]/25", width: 2 },
    ],
    spots: [
      { name: "pin", className: "hidden lg:block left-[51%] top-[11%] size-9 text-[#0875D1]/45", rotate: -6 },
      { name: "pin", className: "hidden lg:block left-[79%] top-[18%] size-8 text-[#219BFB]/40", rotate: 8 },
      { name: "pin", className: "hidden lg:block right-[1.5%] top-[29%] size-8 text-[#6565F5]/40", rotate: -4 },
      { name: "sparkle", className: "hidden md:block left-[3%] top-[12%] size-7 text-[#C5B2FF]/70", rotate: 10 },
    ],
  },
  /* Five apps — one doodle per app, in that app's colour, plus a renewal loop. */
  products: {
    viewBox: "0 0 1440 900",
    flows: [
      { d: "M110 250a120 120 0 1 1 30 150", className: "text-[#219BFB]/25", width: 2 },
      { d: "M128 392l14 10 4-17", className: "text-[#219BFB]/25", width: 2 },
      { d: "M1300 120c60 40 90 110 60 170", dash: "2 9", className: "text-[#6565F5]/30", width: 2 },
    ],
    spots: [
      { name: "repeat", className: "hidden lg:block left-[6%] top-[6%] size-11 text-[#219BFB]/45", rotate: -8 },
      { name: "crown", className: "hidden lg:block left-[19%] top-[2%] size-9 text-[#6565F5]/40", rotate: 6 },
      { name: "gift", className: "hidden lg:block right-[18%] top-[3%] size-9 text-[#E2628F]/40", rotate: -6 },
      { name: "percent", className: "hidden lg:block right-[6%] top-[8%] size-10 text-[#7B5CF0]/40", rotate: 10 },
      { name: "van", className: "hidden lg:block right-[2%] bottom-[6%] size-11 text-[#0875D1]/35", rotate: -4 },
    ],
  },
  /* Everything connects — cables running in from both edges toward the hub. */
  integrations: {
    viewBox: "0 0 1440 900",
    flows: [
      { d: "M-10 140C160 140 220 300 380 300", className: "text-[#6565F5]/25", width: 2 },
      { d: "M-10 760C200 760 230 600 400 600", className: "text-[#219BFB]/25", width: 2 },
      { d: "M1450 160C1280 160 1220 310 1060 310", className: "text-[#219BFB]/25", width: 2 },
      { d: "M1450 740C1250 740 1210 590 1040 590", className: "text-[#6565F5]/25", width: 2 },
    ],
    spots: [
      { name: "plug", className: "hidden lg:block left-[2%] top-[8%] size-10 text-[#6565F5]/45", rotate: -12 },
      { name: "link", className: "hidden lg:block right-[3%] top-[10%] size-9 text-[#219BFB]/45", rotate: 8 },
      { name: "puzzle", className: "hidden lg:block left-[3%] bottom-[10%] size-10 text-[#219BFB]/40", rotate: 6 },
      { name: "gear", className: "hidden lg:block right-[2.5%] bottom-[12%] size-10 text-[#6565F5]/40", rotate: -8 },
    ],
  },
  /* Customers who come back — a rising growth line sweeping behind the three steps. */
  growth: {
    viewBox: "0 0 1440 900",
    flows: [
      { d: "M-20 760C220 740 300 640 470 650S760 560 900 470 1180 330 1330 230", className: "text-[#219BFB]/30", width: 2.4 },
      { d: "M1300 222l34 6-10 33", className: "text-[#219BFB]/30", width: 2.4 },
      { d: "M-20 800C260 790 380 720 560 720", dash: "2 10", className: "text-[#6565F5]/25", width: 2 },
    ],
    spots: [
      { name: "repeat", className: "hidden lg:block left-[4%] top-[8%] size-10 text-[#219BFB]/45", rotate: -6 },
      { name: "trophy", className: "hidden lg:block right-[4%] top-[6%] size-10 text-[#0875D1]/40", rotate: 6 },
      { name: "star", className: "hidden lg:block right-[11%] top-[20%] size-6 text-[#F4B9D1]", rotate: 12 },
    ],
  },
  /* In their own words — speech-bubble outline, stars and a heart. */
  reviews: {
    viewBox: "0 0 1440 900",
    flows: [
      { d: "M1180 70h170a26 26 0 0 1 26 26v70a26 26 0 0 1-26 26h-120l-34 30v-30h-16a26 26 0 0 1-26-26V96a26 26 0 0 1 26-26z", className: "text-[#219BFB]/25", width: 2 },
      { d: "M60 120c40-30 90-30 120 10", dash: "2 9", className: "text-[#E2628F]/30", width: 2 },
    ],
    spots: [
      { name: "star", className: "hidden lg:block left-[6%] top-[4%] size-8 text-[#F5B53F]/55", rotate: -10 },
      { name: "star", className: "hidden lg:block left-[12%] top-[11%] size-5 text-[#F5B53F]/45", rotate: 14 },
      { name: "heart", className: "hidden lg:block right-[22%] top-[4%] size-8 text-[#E2628F]/40", rotate: 8 },
      { name: "sparkle", className: "hidden lg:block right-[2%] top-[30%] size-7 text-[#C5B2FF]", rotate: 0 },
    ],
  },
  /* Real people, around the clock — clock, bolt (fast replies) and chat lines. */
  support: {
    viewBox: "0 0 1440 900",
    flows: [
      { d: "M40 120h120a22 22 0 0 1 22 22v44a22 22 0 0 1-22 22H90l-28 24v-24H40a22 22 0 0 1-22-22v-44a22 22 0 0 1 22-22z", className: "text-[#219BFB]/25", width: 2 },
      { d: "M1300 820c40-60 100-80 150-70", dash: "2 9", className: "text-[#6565F5]/30", width: 2 },
    ],
    spots: [
      { name: "clock", className: "hidden lg:block left-[3%] bottom-[8%] size-10 text-[#0875D1]/40", rotate: -6 },
      { name: "bolt", className: "hidden lg:block left-[48%] top-[2%] size-8 text-[#219BFB]/45", rotate: 8 },
      { name: "heart", className: "hidden lg:block right-[3%] top-[3%] size-7 text-[#E2628F]/40", rotate: -8 },
    ],
  },
  /* Closing banner — white orbit lines and sparkles on the blue. */
  cta: {
    viewBox: "0 0 1440 520",
    flows: [
      { d: "M980 90c260-70 470 10 470 120s-210 220-470 210", className: "text-white/25", width: 2 },
      { d: "M-20 380c160-80 330-60 430 40", dash: "2 10", className: "text-white/30", width: 2 },
    ],
    spots: [
      { name: "sparkle", className: "hidden md:block left-[6%] top-[16%] size-9 text-white/55", rotate: 0 },
      { name: "sparkle", className: "hidden md:block right-[8%] top-[18%] size-7 text-white/50", rotate: 12 },
      { name: "bag", className: "hidden lg:block left-[12%] bottom-[14%] size-10 text-white/40", rotate: -10 },
      { name: "repeat", className: "hidden lg:block right-[13%] bottom-[16%] size-10 text-white/40", rotate: 8 },
    ],
  },
};

export function SectionLines({ variant, className }: { variant: SectionLinesVariant; className?: string }) {
  const { flows, spots, viewBox } = art[variant];
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      <svg viewBox={viewBox} preserveAspectRatio="xMidYMid slice" fill="none" className="absolute inset-0 size-full opacity-80 max-md:hidden">
        {flows.map((f, i) => (
          <path
            key={i}
            d={f.d}
            stroke="currentColor"
            strokeWidth={(f.width ?? 2) * 0.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={f.dash}
            vectorEffect="non-scaling-stroke"
            className={f.className}
          />
        ))}
      </svg>
      <Doodles autoplay spots={spots} className="z-0" />
    </div>
  );
}
