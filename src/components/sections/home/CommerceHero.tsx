"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { HeartHandshake, ShoppingBag, Sparkles, Truck, type LucideIcon } from "lucide-react";
import { AppTile } from "./hero/AppTile";
import { SplitText } from "@/components/motion/SplitText";
import { ButtonLink } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";
import { commerceHero } from "@/data/home";
import { proof } from "@/data/site";
import { ease } from "@/lib/motion";
import { BundleCard, LoyaltyCard, MembershipCard, PickupCard, SubscriptionCard } from "@/components/features/widgets/ProductWidgets";
import { Deco, ParallaxField, Piece } from "./hero/Collage";
import { Doodles, type DoodleSpot } from "@/components/features/backdrops/Doodles";
import { LifetimeValueChip, NotificationCard, RepeatRateCard, RevenueCard, ShopifyTile, StorefrontCard } from "./hero/GrowthCards";

function Rise({ delay, className, children }: { delay: number; className?: string; children: ReactNode }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: ease.out, opacity: { duration: 0.55, delay } }}
    >
      {children}
    </motion.div>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[20%] left-1/2 h-[80%] w-[120%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(206_239_253/0.55),transparent)]" />
      <div className="absolute top-[44%] left-1/2 size-[min(calc(62rem*var(--hs,1)),140vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.95),rgb(255_255_255/0.55)_55%,transparent)]" />
      <Deco depth={-6} delay={0.15} className="top-[44%] left-1/2 size-[min(calc(46rem*var(--hs,1)),120vw)] -translate-x-1/2 -translate-y-1/2">
        <div className="size-full rounded-full border border-brand/20" />
      </Deco>
      <Deco depth={-10} delay={0.25} className="top-[44%] left-1/2 hidden size-[min(calc(64rem*var(--hs,1)),150vw)] -translate-x-1/2 -translate-y-1/2 md:block">
        <svg viewBox="0 0 100 100" className="size-full animate-[orbit_160s_linear_infinite]">
          <circle cx="50" cy="50" r="49.6" fill="none" stroke="var(--color-brand)" strokeOpacity=".3" strokeWidth=".16" strokeDasharray=".6 1.4" />
          {[18, 152, 236, 318].map((a, i) => (
            <circle key={a} cx={50 + 49.6 * Math.cos((a * Math.PI) / 180)} cy={50 + 49.6 * Math.sin((a * Math.PI) / 180)} r={[0.75, 0.55, 0.9, 0.5][i]} fill="var(--color-brand)" fillOpacity={0.6} />
          ))}
        </svg>
      </Deco>
      <Deco depth={-4} delay={0.2} className="top-[44%] left-1/2 hidden size-[min(calc(36rem*var(--hs,1)),100vw)] -translate-x-1/2 -translate-y-1/2 md:block">
        <div className="size-full rounded-full border border-dashed border-brand/15" />
      </Deco>
      <Deco depth={-8} delay={0.4} className="-top-28 -right-20 hidden size-80 md:block">
        <div className="size-full rounded-full bg-brand-100/35" />
      </Deco>
      <div className="absolute top-[8%] left-[8%] hidden size-[26rem] rounded-full bg-[#6FC0FA]/25 blur-[90px] md:block" />
      <div className="absolute right-[6%] bottom-[6%] hidden size-[28rem] rounded-full bg-[#1088F6]/15 blur-[100px] md:block" />
      <div className="absolute top-[38%] left-[30%] hidden size-[18rem] rounded-full bg-[#CEEFFD]/60 blur-[80px] md:block" />
      <Deco depth={-4} delay={0.5} className="top-[6%] -left-[4%] hidden size-[22rem] md:block">
        <ShoppingBag className="size-full -rotate-12 text-brand/[0.05]" strokeWidth={0.5} />
      </Deco>
      <Deco depth={-5} delay={0.6} className="-right-[5%] bottom-[2%] hidden size-[24rem] md:block">
        <Truck className="size-full rotate-6 text-brand/[0.05]" strokeWidth={0.45} />
      </Deco>
      <Deco depth={-3} delay={0.7} className="top-[2%] right-[22%] hidden size-[10rem] md:block">
        <Sparkles className="size-full text-brand/[0.05]" strokeWidth={0.6} />
      </Deco>
    </div>
  );
}

function PurposeChip({ icon: Icon, children }: { icon: LucideIcon; children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-white/90 py-1.5 pr-3.5 pl-1.5 text-[0.8rem] whitespace-nowrap text-ink ring-1 ring-canvas-line shadow-[0_14px_30px_-18px_rgb(6_43_82/0.35)] backdrop-blur">
      <span className="grid size-6 place-items-center rounded-full bg-brand-50 text-brand">
        <Icon className="size-3.5" strokeWidth={2} />
      </span>
      {children}
    </div>
  );
}

function Cycle({ items, every = 5, offset = 0 }: { items: ReactNode[]; every?: number; offset?: number }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce || items.length < 2) return;
    let t: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      setI((v) => (v + 1) % items.length);
      t = setInterval(() => setI((v) => (v + 1) % items.length), every * 1000);
    }, (every + offset) * 1000);
    return () => {
      clearTimeout(start);
      if (t) clearInterval(t);
    };
  }, [reduce, items.length, every, offset]);
  return (
    <div className="grid [&>*]:[grid-area:1/1]">
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.9, ease: ease.out }}
        >
          {items[i]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const big = "w-[15rem]";
const small = "w-[11.75rem]";

function HeroCollage() {
  return (
    <div aria-hidden className="hero-ring pointer-events-none absolute hidden md:block [&_.hero-tilt]:pointer-events-auto">

      {[
        "top-[30%] left-[17%] size-16",
        "top-[14%] right-[20%] size-10",
        "bottom-[22%] left-[26%] size-9",
        "bottom-[16%] right-[17%] size-20",
        "top-[52%] left-[38%] size-7",
        "top-[20%] left-[44%] size-12",
        "bottom-[30%] right-[36%] size-8",
      ].map((c, i) => (
        <span key={c} className={`hero-orb absolute ${c}`} style={{ "--od": `${11 + i * 1.7}s`, "--odl": `${-i * 1.3}s` } as CSSProperties} />
      ))}
      <Piece className={`top-[2%] left-[2%] ${big}`} depth={14} rotate={-2} delay={0.55} from={{ x: -30, y: 30 }} float={{ d: 9, y: 6 }} z={2}>
        <SubscriptionCard className="hero-card" />
      </Piece>
      <Piece className={`top-[2%] right-[2%] ${big}`} depth={16} rotate={2} delay={0.65} from={{ x: 30, y: 30 }} float={{ d: 8, y: 7 }} z={2}>
        <LoyaltyCard className="hero-card" />
      </Piece>
      <Piece className={`bottom-[2%] left-[5%] ${big}`} depth={12} rotate={2} delay={0.8} float={{ d: 9.5, y: 6, delay: 1.6 }} z={2}>
        <BundleCard className="hero-card" />
      </Piece>
      <Piece className={`right-[5%] bottom-[2%] ${big}`} depth={12} rotate={-2} delay={0.9} float={{ d: 10, y: 6, delay: 0.7 }} z={2}>
        <MembershipCard className="hero-card" />
      </Piece>

      <Piece className={`top-[42%] left-[2%] ${small}`} depth={20} rotate={-1} delay={1.3} float={{ d: 10, y: 5, delay: 0.6 }} z={1}>
        <Cycle items={[<RevenueCard key="r" chartClassName="h-[3.2rem]" />, <StorefrontCard key="s" />]} every={5} />
      </Piece>
      <Piece className={`top-[40%] right-[2%] ${small}`} depth={20} rotate={1} delay={1.45} float={{ d: 9, y: 5, delay: 1.1 }} z={1}>
        <Cycle items={[<RepeatRateCard key="rr" />, <PickupCard key="p" className="hero-card" />]} every={5} offset={2.5} />
      </Piece>

      <div>
        <Piece className={`top-[6%] left-[24%] ${small}`} depth={24} rotate={2} delay={1.05} float={{ d: 7, y: 5, delay: 1.2 }} z={3}>
          <NotificationCard />
        </Piece>
        <Piece className="top-[1%] left-[calc(50%-3.6rem)]" depth={-8} rotate={-3} delay={1.15} float={{ d: 10.5, y: 5, delay: 0.5 }} z={1}>
          <ShopifyTile />
        </Piece>
        <Piece className="top-[8%] right-[27%]" depth={-8} rotate={-6} delay={1.25} float={{ d: 11, y: 5, delay: 1 }} z={1}>
          <AppTile id="pickup" tone="white" className="size-[4.4rem]" />
        </Piece>
        <Piece className="top-[22%] right-[22%]" depth={-10} rotate={5} delay={1.35} float={{ d: 12, y: 5, delay: 0.4 }} z={1}>
          <PurposeChip icon={ShoppingBag}>Built for <strong className="font-semibold text-brand">Shopify</strong> &amp; <strong className="font-semibold text-brand">Shopify Plus</strong></PurposeChip>
        </Piece>
        <Piece className="top-[64%] left-[21%]" depth={-10} rotate={-6} delay={1.4} float={{ d: 11, y: 6 }} z={1}>
          <AppTile id="memberships" className="size-[4.4rem]" />
        </Piece>
        <Piece className="top-[62%] right-[20%]" depth={-12} rotate={6} delay={1.5} float={{ d: 12.5, y: 6, delay: 0.3 }} z={1}>
          <AppTile id="loyalty" tone="white" className="size-[4.4rem]" />
        </Piece>
        <Piece className="bottom-[1%] left-[calc(50%-5.4rem)]" depth={18} rotate={-2} delay={1.6} float={{ d: 9, y: 5, delay: 1.1 }} z={2}>
          <LifetimeValueChip />
        </Piece>
        <Piece className="right-[26%] bottom-[18%]" depth={-6} rotate={-5} delay={1.7} float={{ d: 11.5, y: 5, delay: 1.7 }} z={1}>
          <PurposeChip icon={HeartHandshake}>Keep customers <strong className="font-semibold text-brand">coming back</strong></PurposeChip>
        </Piece>
      </div>
    </div>
  );
}

const heroSpots: DoodleSpot[] = [
  { name: "sparkle", className: "hidden md:block left-[19%] top-[30%] size-12 text-brand-500/70", rotate: 8 },
  { name: "heart", className: "hidden md:block right-[17%] top-[34%] size-11 text-ink/45", rotate: 12 },
  { name: "gift", className: "hidden md:block left-[3%] top-[40%] size-14 text-[#9AA3AE]", rotate: -10 },
  { name: "percent", className: "hidden md:block right-[3%] top-[42%] size-12 text-brand-500/60", rotate: 6 },
  { name: "star", className: "hidden md:block left-[40%] top-[4%] size-10 text-ink/40", rotate: -14 },
  { name: "repeat", className: "hidden md:block right-[40%] bottom-[3%] size-12 text-brand-500/60", rotate: 10 },
  { name: "bag", className: "hidden md:block left-[22%] bottom-[18%] size-12 text-[#9AA3AE]", rotate: -6 },
  { name: "crown", className: "hidden md:block right-[23%] bottom-[20%] size-12 text-ink/40", rotate: 8 },
  { name: "tag", className: "hidden md:block left-[47%] bottom-[2%] size-10 text-[#9AA3AE]", rotate: -12 },
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
  const { eyebrow, lead } = commerceHero;
  return (
    <section
      ref={ref}
      id="top"
      aria-labelledby="hero-title"
      className="hero-shell relative isolate -mt-[var(--header-h)] overflow-x-clip pt-[var(--header-h)]"
    >
      <ParallaxField target={ref}>
        <Backdrop />
        <div className="hero-stage relative mx-auto px-5 pt-10 pb-14 sm:px-8 sm:pt-14 md:flex md:items-center md:px-6 md:py-10">
          <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
            <Doodles autoplay spots={heroSpots} />
          </div>
          <HeroCollage />

          <div className="hero-column hero-window relative z-10 mx-auto text-center">
            <span aria-hidden className="hero-lens" />
            <Rise delay={0.1} className="flex justify-center">
              <Eyebrow>{eyebrow}</Eyebrow>
            </Rise>
            <h1
              id="hero-title"
              className="mt-5 text-[2.4rem] leading-[1.08] font-semibold tracking-[-0.035em] text-balance text-ink sm:text-[3.25rem] md:mt-6 md:text-[3.75rem] md:leading-[1.06]"
            >
              <SplitText delay={0.15}>
                Everything your <span className="font-bold text-brand">Shopify</span>
              </SplitText>
              <br className="hidden md:block" />{" "}
              <SplitText delay={0.35}>
                store needs to <span className="font-bold text-brand">grow.</span>
              </SplitText>
            </h1>
            <Rise delay={0.4}>
              <p className="mx-auto mt-5 max-w-[34rem] text-[1.05rem] leading-relaxed text-ink-muted sm:text-lg">{lead}</p>
            </Rise>
            <Rise delay={0.5} className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
              <ButtonLink href="#products" className="px-5 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand">
                Explore Our <strong>Apps</strong>
              </ButtonLink>
              <ButtonLink
                href="#how-it-works"
                variant="ghost"
                arrow={false}
                className="bg-white/70 px-5 text-ink ring-1 ring-[#DCE4EE] hover:bg-white hover:shadow-none hover:ring-brand/35 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
              >
                See How It <strong>Works</strong>
              </ButtonLink>
            </Rise>
            <Rise delay={0.62} className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-2">
                <Stars />
                <span>
                  <strong className="font-semibold text-ink">{proof.reviews.display}</strong> merchant reviews
                </span>
              </span>
              <span aria-hidden className="hidden size-1 rounded-full bg-ink/25 sm:block" />
              <span>
                Trusted by <strong className="font-semibold text-ink">{proof.merchants.display}</strong> Shopify brands
              </span>
            </Rise>
          </div>
        </div>
        <div className="-mt-6 px-5 pb-6 sm:px-8 md:hidden">
          <CompactCollage />
        </div>
      </ParallaxField>
    </section>
  );
}
