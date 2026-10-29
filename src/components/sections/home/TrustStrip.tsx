import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { merchantLogos, pressLogos } from "@/data/merchants";
import { press, proof } from "@/data/site";
import { SmartLink } from "@/components/ui/SmartLink";
import { ChartNoAxesCombined, Headset, Zap } from "lucide-react";
import type { SVGProps } from "react";

/** Filled bag icon with an “S” (matches the reference strip). */
function BagS(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M8.5 7.5V6.8a3.5 3.5 0 0 1 7 0v.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M5.2 7.5h13.6l1 13.2a1 1 0 0 1-1 1.1H5.2a1 1 0 0 1-1-1.1Z" fill="currentColor" />
      <text x="12" y="18.6" textAnchor="middle" fontSize="10" fontWeight="800" fill="#fff" fontFamily="var(--font-inter), sans-serif">S</text>
    </svg>
  );
}

// Capability strip — no review or merchant counts here (those live once, in the hero).
const features = [
  { icon: Zap, title: "All-in-One Platform", text: "Five commerce solutions, one ecosystem." },
  { icon: BagS, title: "Built for Shopify", text: "Native on Shopify & Shopify Plus." },
  { icon: Headset, title: "Merchant Success", text: `${proof.support.display} support from real experts.` },
  { icon: ChartNoAxesCombined, title: "Flexible Solutions", text: "Tools for every stage of your growth." },
];

export function TrustStrip() {
  return (
    <section id="trust" aria-labelledby="trust-title" className="relative">
      <div className="mx-auto max-w-[87rem] px-5 pb-6 sm:px-8 lg:px-10">
        <Reveal>
          <ul className="relative z-10 -mt-8 grid grid-cols-1 divide-y divide-[#ECE8F2] rounded-[1.5rem] bg-white/75 px-2 shadow-[0_20px_50px_-30px_rgb(60_60_150/0.35)] ring-1 ring-white backdrop-blur-md sm:grid-cols-2 sm:divide-y-0 lg:-mt-24 lg:grid-cols-4 lg:divide-x">
            {features.map((f) => (
              <li key={f.title} className="flex items-center gap-4 px-5 py-5 lg:px-8 lg:py-7">
                <span className="grid size-[3.6rem] shrink-0 place-items-center rounded-full bg-[#E9F1FD] text-[#1A7FF0]">
                  <f.icon aria-hidden className="size-6" strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block text-[0.95rem] font-semibold text-[#13294B]">{f.title}</span>
                  <span className="mt-1 block max-w-[12rem] text-[0.82rem] leading-snug text-[#5E6A80]">{f.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
        <h2 id="trust-title" className="mt-10 text-center font-sans text-[0.9rem] font-medium tracking-normal text-ink-muted">
          Trusted by Shopify &amp; Shopify Plus brands of every size
        </h2>
        <Marquee label="Merchants using Appstle" duration={70} className="mt-6 min-w-0">
          {merchantLogos.map((m) => (
            <div key={m.name} className="flex h-12 w-36 shrink-0 items-center justify-center px-5 sm:w-40">
              <Image
                src={m.logo}
                alt={m.name}
                sizes="140px"
                loading="lazy"
                className="max-h-9 w-auto object-contain opacity-55 grayscale transition-[opacity,filter,scale] duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0"
              />
            </div>
          ))}
        </Marquee>
      </div>
      <div className="pb-6">
        <ul className="mx-auto flex max-w-site flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-4 sm:px-8" aria-label="As seen on">
          <li className="eyebrow text-ink-subtle">As seen on</li>
          {press.map((p) => (
            <li key={p.outlet}>
              <SmartLink href={p.href} aria-label={`Appstle on ${p.outlet}`} className="block rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand">
                <Image
                  src={pressLogos[p.outlet]}
                  alt={p.outlet}
                  sizes="120px"
                  loading="lazy"
                  className="h-5 w-auto object-contain opacity-50 grayscale transition-[opacity,filter,scale] duration-300 hover:scale-110 hover:opacity-100 hover:grayscale-0"
                />
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
