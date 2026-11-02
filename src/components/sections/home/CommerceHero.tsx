"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ShoppingBag, Sparkles, Truck } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Starter } from "@/components/ui/Starter";
import shopifyLogo from "@/assets/brand/shopify-logo.webp";
import shopifyPlus from "@/assets/brand/shopify-plus.webp";
import heroWoman from "@/assets/home/hero-merchant.webp";
import kibblesLogo from "@/assets/merchants/kibbles.webp";
import otakuLogo from "@/assets/merchants/otaku-box.webp";
import vedixLogo from "@/assets/merchants/vedix.webp";
import { Stars } from "@/components/ui/Stars";
import { links, proof } from "@/data/site";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/Button";
import { Deco, ParallaxField } from "./hero/Collage";

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <Deco depth={-4} delay={0.5} className="top-[6%] -left-[4%] hidden size-[22rem] lg:block">
        <ShoppingBag className="size-full -rotate-12 text-brand/[0.05]" strokeWidth={0.5} />
      </Deco>
      <Deco depth={-5} delay={0.6} className="-right-[5%] bottom-[2%] hidden size-[24rem] lg:block">
        <Truck className="size-full rotate-6 text-brand/[0.05]" strokeWidth={0.45} />
      </Deco>
      <Deco depth={-3} delay={0.7} className="top-[2%] right-[22%] hidden size-[10rem] lg:block">
        <Sparkles className="size-full text-brand/[0.05]" strokeWidth={0.6} />
      </Deco>
    </div>
  );
}

const headline = ["Grow Revenue", "Through", "Retention"];

function Underline() {
  return (
    <svg aria-hidden viewBox="0 0 300 24" preserveAspectRatio="none" className="absolute -bottom-[0.12em] left-0 h-[0.2em] w-full">
      <motion.path
        d="M3 16C60 6 130 4 297 12"
        fill="none"
        stroke="var(--color-orange)"
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay: 0.95, ease: ease.inOut }}
      />
    </svg>
  );
}


/* Hero floaters: how Appstle helped real merchants, one line each, taken from the published case
   studies on appstle.com (the outcome wording stays close to each study's own title). Two spots around
   the photo; every 5 seconds one of them fades to the next story. */
const floatCard = "rounded-[1rem] bg-[#fff] ring-1 ring-line";

type Story = { merchant: string; logo?: StaticImageData; app: string; outcome: string; tone: string };
const stories: Story[] = [
  { merchant: "True Moringa", app: "Subscriptions", outcome: "Skincare subscriptions up 70%", tone: "bg-brand text-white" },
  { merchant: "Kibbles", logo: kibblesLogo, app: "Subscriptions", outcome: "Higher retention and more revenue", tone: "bg-blue-ink text-white" },
  { merchant: "Paradisefold", app: "Loyalty & Rewards", outcome: "Scaled customer loyalty, cost-effectively", tone: "bg-orange text-white" },
  { merchant: "Birch Boys", app: "Subscriptions", outcome: "Better retention, smoother operations", tone: "bg-azure text-white" },
  { merchant: "The Otaku Box", logo: otakuLogo, app: "Subscriptions", outcome: "Faster support, more subscribers", tone: "bg-red text-white" },
  { merchant: "Vedix", logo: vedixLogo, app: "Subscriptions", outcome: "Subscriptions behind its global growth", tone: "bg-brand text-white" },
  { merchant: "AIC Expat", app: "Memberships", outcome: "Expanded its services with memberships", tone: "bg-blue-ink text-white" },
  { merchant: "Two Dudes", app: "Subscriptions", outcome: "Men's grooming, simplified by subscription", tone: "bg-sky-blue text-blue-ink" },
  { merchant: "Pandoo", app: "Subscriptions", outcome: "Steady growth with eco-friendly subscriptions", tone: "bg-powder text-blue-ink" },
  { merchant: "Haypigs", app: "Subscriptions", outcome: "From pet passion to retail success", tone: "bg-orange text-white" },
];

const spots = ["-top-8 -left-2 sm:-left-12", "-bottom-8 right-2 sm:-right-10"];

function StoryCard({ story }: { story: Story }) {
  return (
    <div className={cn(floatCard, "flex max-w-[19rem] items-center gap-3 py-2.5 pr-4 pl-2.5")}>
      {story.logo ? (
        <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#fff] p-1.5 ring-1 ring-line">
          <Image src={story.logo} alt="" sizes="40px" className="max-h-full w-auto object-contain" />
        </span>
      ) : (
        <span className={cn("grid size-10 shrink-0 place-items-center rounded-xl font-display text-[15px] font-bold", story.tone)}>
          {story.merchant.replace(/^The /, "").slice(0, 1)}
        </span>
      )}
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-ink-subtle">
          {story.merchant}
          <span aria-hidden className="size-1 rounded-full bg-orange" />
          <span className="text-brand-700">{story.app}</span>
        </p>
        <p className="mt-0.5 text-[13.5px] leading-snug font-semibold text-ink">{story.outcome}</p>
      </div>
    </div>
  );
}

function useMomentCycle() {
  const [shown, setShown] = useState([0, 1]);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    let next = spots.length;
    let last = -1;
    const id = window.setInterval(() => {
      setShown((cur) => {
        const spot = (last + 1) % spots.length;
        last = spot;
        while (cur.includes(next % stories.length)) next++;
        const out = [...cur];
        out[spot] = next % stories.length;
        next++;
        return out;
      });
    }, 5000);
    return () => window.clearInterval(id);
  }, [reduce]);
  return shown;
}

function Moments() {
  const shown = useMomentCycle();
  return (
    <>
      {spots.map((spot, i) => {
        return (
          <div key={spot} className={cn("absolute z-10", spot)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={shown[i]}
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.98 }}
                transition={{ duration: 0.9, ease: ease.out }}
              >
                <div className="hero-float" style={{ "--fd": `${8 + i}s`, "--fy": "4px", "--fdl": `${-i * 1.3}s` } as CSSProperties}>
                  <StoryCard story={stories[shown[i]]} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </>
  );
}

function PhotoStack({ className }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, delay: 0.3, ease: ease.out }}
      className={cn("relative", className)}
    >
      <div aria-hidden className="absolute -bottom-10 -left-10 -z-10 size-40 rounded-full border-[3px] border-orange/70" />
      <div className="relative overflow-hidden rounded-[2rem] ring-4 ring-white">
        <Image src={heroWoman} alt="" sizes="(min-width: 1024px) 560px, 90vw" priority className="h-auto w-full" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(200deg,transparent_45%,rgb(30_58_138/0.24)_100%)] mix-blend-multiply" />
      </div>
      <Moments />
    </motion.div>
  );
}

function HeroCollage() {
  return (
    <div aria-hidden className="hero-ring pointer-events-none absolute hidden items-center justify-center lg:flex [&_.hero-tilt]:pointer-events-auto">
      <PhotoStack className="w-[min(100%,38rem)]" />
    </div>
  );
}


export function CommerceHero() {
  const ref = useRef<HTMLElement>(null);
  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="hero-shell relative isolate -mt-[var(--header-h)] overflow-x-clip pt-[var(--header-h)]"
    >
      <ParallaxField target={ref}>
        <Backdrop />
        <div className="hero-stage relative mx-auto px-7 pt-10 pb-14 sm:px-10 sm:pt-14 lg:flex lg:items-center lg:px-12 lg:pt-16 lg:pb-4">
          <HeroCollage />

          <div className="hero-copy relative z-10 max-w-[40rem]">
            <Reveal delay={0.1}>
              <p className="mb-7 inline-flex flex-wrap items-center gap-x-2.5 gap-y-1 rounded-full bg-white/80 py-1.5 pr-4 pl-3 text-sm font-medium text-ink-700 ring-1 ring-line backdrop-blur">
                <Stars value={5} className="[&_svg]:size-3.5 [&>span]:size-3.5" />
                <a href={proof.reviews.source} className="font-semibold text-ink hover:underline">
                  {proof.reviews.display} reviews
                </a>
                <span>on</span>
                <Image src={shopifyLogo} alt="Shopify" sizes="56px" className="h-4 w-auto" />
                <span aria-hidden className="h-4 w-px bg-navy/20" />
                <Image src={shopifyPlus} alt="Shopify Plus" sizes="64px" className="h-3.5 w-auto" />
              </p>
            </Reveal>

            <h1 id="hero-title" className="text-[2.75rem] leading-[0.98] font-extrabold tracking-[-0.04em] text-navy sm:text-6xl lg:text-[4.35rem]">
              {headline.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.9, delay: 0.18 + i * 0.1, ease: ease.out }}
                  >
                    {i === 2 ? (
                      <span className="relative inline-block text-brand-700">
                        {line}
                        <Underline />
                      </span>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <Reveal delay={0.55}>
              <p className="mt-7 max-w-[36rem] border-l-[3px] border-orange/70 pl-5 text-lg leading-relaxed font-medium text-ink-700 sm:text-[1.15rem]">
                Drive growth with customizable retention tools, trusted by {proof.merchants.display} Shopify merchants — subscriptions,
                memberships, loyalty, bundles and pickup &amp; delivery, with support around the clock.
              </p>
            </Reveal>

            <Reveal delay={0.68} className="mt-9 flex flex-wrap items-center gap-3">
              <ButtonLink href={links.contact} size="lg" >
                Book a <strong>Demo</strong>
              </ButtonLink>
              <Starter />
            </Reveal>

          </div>
        </div>
        <div className="-mt-6 px-7 pb-6 sm:px-10 lg:hidden">
          <div aria-hidden className="mx-auto max-w-[34rem] pt-12 pb-8 sm:max-w-[38rem]">
            <PhotoStack />
          </div>
        </div>
      </ParallaxField>
    </section>
  );
}
