"use client";

import { motion } from "motion/react";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { Gift, HeartHandshake, Package, Repeat, ShoppingBag, Sparkles, TrendingUp, Truck, UserCheck, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Starter } from "@/components/ui/Starter";
import shopifyLogo from "@/assets/brand/shopify-logo.webp";
import shopifyPlus from "@/assets/brand/shopify-plus.webp";
import heroWoman from "@/assets/home/hero-woman.webp";
import { AppstleMark } from "@/components/brand/AppstleLogo";
import { Stars } from "@/components/ui/Stars";
import { links, proof } from "@/data/site";
import { cn, formatNumber } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/Button";
import { PickupCard, SubscriptionCard } from "@/components/features/widgets/ProductWidgets";
import { Deco, ParallaxField, Piece } from "./hero/Collage";
import { Doodles, type DoodleSpot } from "@/components/features/backdrops/Doodles";
import { NotificationCard, RevenueCard, ShopifyTile } from "./hero/GrowthCards";

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

function PurposeChip({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 py-1.5 pr-3.5 pl-1.5 text-[0.8rem] whitespace-nowrap text-ink ring-1 ring-[#D7E1EE] shadow-[0_14px_30px_-18px_rgb(6_43_82/0.35)] backdrop-blur">
      <span className="grid size-6 place-items-center rounded-full bg-brand-50 text-brand-ink">
        <Icon className="size-3.5" strokeWidth={2} />
      </span>
      {children}
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
        stroke="var(--color-brand-300)"
        strokeWidth="7"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay: 0.95, ease: ease.inOut }}
      />
    </svg>
  );
}


function Floater({ delay, d, children }: { delay: number; d: number; children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: ease.out }}
    >
      <div className="hero-float" style={{ "--fd": `${d}s`, "--fy": "4px", "--fdl": `${-delay}s` } as CSSProperties}>
        <div className="hero-tilt">{children}</div>
      </div>
    </motion.div>
  );
}

function LogoTile({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex h-14 items-center gap-2.5 rounded-2xl bg-white/90 px-4 shadow-[0_2px_6px_rgb(6_43_82/0.06),0_24px_48px_-24px_rgb(6_43_82/0.4)] ring-1 ring-white/80 backdrop-blur", className)}>
      {children}
    </div>
  );
}

function HeroCollage() {
  return (
    <div aria-hidden className="hero-ring pointer-events-none absolute hidden items-center justify-center lg:flex [&_.hero-tilt]:pointer-events-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: ease.out }}
        className="relative w-[min(100%,34rem)]"
      >
        <Image
          src={heroWoman}
          alt=""
          sizes="520px"
          priority
          className="h-auto w-full rounded-[2rem] shadow-[0_40px_80px_-36px_rgb(6_43_82/0.55)] ring-1 ring-white/80"
        />
        <div className="absolute -top-7 -left-8">
          <Floater delay={0.6} d={8}>
            <LogoTile>
              <Image src={shopifyLogo} alt="" sizes="110px" className="h-7 w-auto" />
            </LogoTile>
          </Floater>
        </div>
        <div className="absolute top-1/2 -right-10 -translate-y-1/2">
          <Floater delay={0.75} d={9.5}>
            <LogoTile>
              <AppstleMark className="size-8 rounded-[8px]" />
              <span className="font-display text-xl font-bold tracking-[-0.03em] text-ink">Appstle</span>
            </LogoTile>
          </Floater>
        </div>
        <div className="absolute -bottom-7 left-10">
          <Floater delay={0.9} d={9}>
            <LogoTile>
              <Image src={shopifyPlus} alt="" sizes="120px" className="h-6 w-auto" />
            </LogoTile>
          </Floater>
        </div>
      </motion.div>
    </div>
  );
}

const heroSpots: DoodleSpot[] = [
  { name: "sparkle", className: "hidden lg:block left-[46%] top-[18%] size-12 text-brand-500/70", rotate: 8 },
  { name: "heart", className: "hidden lg:block right-[17%] top-[34%] size-11 text-ink/45", rotate: 12 },
  { name: "gift", className: "hidden lg:block left-[44%] bottom-[6%] size-14 text-[#9AA3AE]", rotate: -10 },
  { name: "percent", className: "hidden lg:block right-[3%] top-[42%] size-12 text-brand-500/60", rotate: 6 },
  { name: "star", className: "hidden lg:block left-[40%] top-[4%] size-10 text-ink/40", rotate: -14 },
  { name: "repeat", className: "hidden lg:block right-[40%] bottom-[3%] size-12 text-brand-500/60", rotate: 10 },
  { name: "bag", className: "hidden lg:block left-[46%] bottom-[24%] size-12 text-[#9AA3AE]", rotate: -6 },
  { name: "crown", className: "hidden lg:block right-[23%] bottom-[20%] size-12 text-ink/40", rotate: 8 },
  { name: "tag", className: "hidden lg:block left-[47%] bottom-[2%] size-10 text-[#9AA3AE]", rotate: -12 },
];

function CompactCollage() {
  return (
    <div aria-hidden className="relative mx-auto mt-10 h-[33rem] w-full max-w-[24rem] sm:mt-12 sm:h-[24rem] sm:max-w-[44rem]">
      <Piece className="top-0 left-0 w-[80%] sm:left-0 sm:w-[36%]" depth={0} rotate={-2} delay={0.95} float={{ d: 8, y: 5 }} z={3}>
        <NotificationCard />
      </Piece>
      <Piece className="top-[38%] right-0 w-[58%] sm:top-[4%] sm:right-0 sm:w-[30%]" depth={0} rotate={3} delay={0.75} float={{ d: 9, y: 6, delay: 0.5 }} z={2}>
        <RevenueCard chartClassName="h-[3.2rem]" />
      </Piece>
      <Piece className="bottom-0 left-0 w-[64%] sm:bottom-0 sm:left-0 sm:w-[33%]" depth={0} rotate={-2} delay={0.85} float={{ d: 10, y: 6, delay: 1 }} z={3}>
        <SubscriptionCard className="hero-card" />
      </Piece>
      <Piece className="right-0 bottom-0 hidden w-[31%] sm:block" depth={0} rotate={2} delay={1} float={{ d: 9.5, y: 5, delay: 1.4 }} z={3}>
        <PickupCard className="hero-card" />
      </Piece>
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
        <div className="hero-stage relative mx-auto px-5 pt-10 pb-14 sm:px-8 sm:pt-14 lg:flex lg:items-center lg:px-[4.5rem] lg:py-10">
          <HeroCollage />

          <div className="hero-copy relative z-10 max-w-[40rem]">

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
              <p className="mt-6 max-w-[36rem] text-lg leading-relaxed text-ink-muted sm:text-[1.2rem]">
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

            <Reveal delay={0.85}>
              <dl className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-muted">
                <div className="flex items-center gap-2.5">
                  <Stars value={5} />
                  <dt className="sr-only">Shopify App Store rating</dt>
                  <dd>
                    <a href={proof.subscriptionsRating.source} className="hit-area font-semibold text-navy hover:underline">
                      5.0 · {formatNumber(proof.subscriptionsRating.count)} reviews
                    </a>{" "}
                    <span className="text-ink-subtle">for Subscriptions</span>
                  </dd>
                </div>
                <span aria-hidden className="h-5 w-px bg-navy/15" />
                <div>
                  <dt className="sr-only">Merchants</dt>
                  <dd>
                    <span className="font-semibold text-navy">{proof.merchants.display}</span> merchants
                  </dd>
                </div>
                <span aria-hidden className="h-5 w-px bg-navy/15" />
                <div>
                  <dt className="sr-only">Support</dt>
                  <dd>
                    <span className="font-semibold text-navy">24x7x365</span> support
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
        <div className="-mt-6 px-5 pb-6 sm:px-8 lg:hidden">
          <CompactCollage />
        </div>
      </ParallaxField>
    </section>
  );
}
