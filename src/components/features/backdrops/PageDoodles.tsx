"use client";

import { Doodles, type DoodleSpot } from "./Doodles";

const footerSpots: DoodleSpot[] = [
  { name: "sparkle", className: "hidden md:block right-[3%] top-[10%] size-10 text-[#219BFB]/35", rotate: 10 },
  { name: "bag", className: "hidden lg:block right-[30%] top-[14%] size-9 text-[#C9A46A]/45", rotate: -8 },
  { name: "heart", className: "hidden md:block left-[38%] bottom-[22%] size-9 text-[#E2628F]/30", rotate: -8 },
  { name: "repeat", className: "hidden lg:block right-[3%] bottom-[30%] size-9 text-[#C9A46A]/40", rotate: 6 },
];

export function FooterDoodles() {
  return <Doodles autoplay spots={footerSpots} className="z-0" />;
}
