"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { ButtonLink } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import { links } from "@/data/links";
import { proof } from "@/data/site";
import { ease } from "@/lib/motion";
import shopifyLogo from "@/assets/brand/shopify-logo.webp";
import shopifyPlus from "@/assets/brand/shopify-plus.webp";
import { HeroWash } from "@/components/features/backdrops/HeroWash";
import { HeroShowcase, HeroShowcaseStack } from "./hero/HeroShowcase";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: ease.out },
});

/** Hero — built to the 2026-10-29 reference (cream canvas, lavender/blue/blush washes, floating product showcase). */
export function HomeHero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative isolate -mt-[var(--header-h)] overflow-x-clip pt-[var(--header-h)]">
      <HeroWash variant="home" sparkles={false} />

      <div className="mx-auto grid max-w-site grid-cols-1 items-center gap-10 px-5 pt-8 pb-20 sm:px-8 lg:min-h-[calc(100svh-var(--header-h)-6.5rem)] lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pt-6 lg:pb-28">
        <div className="relative z-10 lg:col-span-5">
          <motion.p
            {...rise(0.1)}
            className="inline-flex items-center gap-4 rounded-full bg-white/90 py-2 pr-5 pl-4 shadow-[0_6px_20px_-10px_rgb(40_50_110/0.25)] ring-1 ring-[#ECE7F4] backdrop-blur"
          >
            <span className="inline-flex items-center gap-2">
              {/* Shopify bag only — cropped from the official Shopify lockup */}
              <span className="relative block h-[22px] w-[18px] overflow-hidden">
                <Image src={shopifyLogo} alt="" className="absolute top-0 left-0 h-[22px] w-auto max-w-none" sizes="72px" />
              </span>
              <span className="text-[0.94rem] font-semibold text-[#1A7FF0]">Built for Shopify</span>
            </span>
            <span aria-hidden className="h-4 w-px bg-ink/15" />
            <Image src={shopifyPlus} alt="Shopify Plus" className="h-[19px] w-auto" sizes="100px" />
          </motion.p>

          <h1
            id="hero-title"
            className="mt-6 font-sans text-[2.9rem] leading-[0.98] font-extrabold tracking-[-0.045em] text-[#13294B] sm:text-[3.4rem] lg:text-[clamp(2.8rem,6.2svh,3.85rem)]"
          >
            {["Grow Revenue", "Through"].map((line, i) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.18 + i * 0.1, ease: ease.out }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.32em]">
              <motion.span
                className="relative inline-block"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.38, ease: ease.out }}
              >
                <span className="relative inline-block pr-[0.08em] text-[#1A7FF0] font-serif text-[1.24em] font-semibold tracking-[-0.03em] italic [font-variation-settings:'SOFT'_50,'opsz'_120]">
                  Retention
                </span>
                <Swoosh />
              </motion.span>
            </span>
          </h1>

          <motion.p {...rise(0.55)} className="mt-2 max-w-[27rem] text-[1rem] leading-[1.65] text-[#556178] sm:text-[1.04rem]">
            Drive predictable growth with powerful apps for subscriptions, memberships, loyalty, bundles and pickup &amp; delivery — all in one platform,
            built for Shopify.
          </motion.p>

          <motion.div {...rise(0.7)} className="mt-8 flex flex-wrap items-center gap-3.5">
            <ButtonLink href={links.contact} size="md" icon="external" className="rounded-xl px-5 text-[0.98rem] font-medium">
              Book a Demo
            </ButtonLink>
            <ButtonLink
              href="#products"
              size="md"
              variant="ghost"
              icon="external"
              className="rounded-xl bg-white px-5 text-[0.98rem] font-medium shadow-[0_6px_18px_-10px_rgb(40_50_110/0.25)] ring-1 ring-[#E4E1EC] hover:ring-[#C9D6EE]"
            >
              Get Started
            </ButtonLink>
          </motion.div>

          {/* The only review / merchant claims in the hero */}
          <motion.dl {...rise(0.85)} className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.95rem] text-[#556178]">
            <div className="flex items-center gap-2.5">
              <Stars value={5} />
              <dt className="sr-only">Shopify App Store reviews</dt>
              <dd>
                <a href={proof.reviews.source} className="hover:underline">
                  <span className="font-semibold text-[#13294B]">5.0</span> · {proof.reviews.display} reviews
                </a>
              </dd>
            </div>
            <span aria-hidden className="hidden h-5 w-px bg-ink/15 sm:block" />
            <div>
              <dt className="sr-only">Merchants</dt>
              <dd>{proof.merchants.display} merchants</dd>
            </div>
          </motion.dl>
        </div>

        <div className="lg:col-span-7">
          <p className="sr-only">
            Live previews of Appstle widgets: a subscription purchase widget, a Gold Club membership card, a loyalty rewards balance and a pickup &amp;
            delivery scheduler.
          </p>
          <div className="hidden md:block lg:-mr-6 xl:-mr-10">
            <HeroShowcase />
          </div>
          <div className="md:hidden">
            <HeroShowcaseStack />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Tapered blue brush underline beneath "Retention". */
function Swoosh() {
  return (
    <svg aria-hidden viewBox="0 0 400 40" preserveAspectRatio="none" className="absolute -bottom-[0.3em] -left-[0.03em] h-[0.26em] w-[100%]">
      <defs>
        <linearGradient id="hero-swoosh" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#1A7FF0" />
          <stop offset=".75" stopColor="#3B8DF5" />
          <stop offset="1" stopColor="#6A9EF8" stopOpacity=".4" />
        </linearGradient>
      </defs>
      <motion.path
        d="M4 26C110 6 240 2 396 9C250 9 120 18 6 38Z"
        fill="url(#hero-swoosh)"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 0.9, delay: 0.95, ease: ease.inOut }}
      />
    </svg>
  );
}
