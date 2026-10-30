import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { BundleBuilderDemo } from "@/components/features/demos/BundleBuilderDemo";
import { LoyaltyPointsDemo } from "@/components/features/demos/LoyaltyPointsDemo";
import { MembershipAccountDemo } from "@/components/features/demos/MembershipAccountDemo";
import { PickupSchedulerDemo } from "@/components/features/demos/PickupSchedulerDemo";
import { SubscriptionWidgetDemo } from "@/components/features/demos/SubscriptionWidgetDemo";
import { Confetti } from "@/components/motion/Confetti";
import { Doodles, type DoodleSpot } from "@/components/features/backdrops/Doodles";
import { BundleRise, DeliveryLane, LoyaltyRise, PickupRise, RenewOrbit, Sparkles } from "@/components/features/backdrops/scenes";
import { Stars } from "@/components/ui/Stars";
import { ButtonLink } from "@/components/ui/Button";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { suiteCopy } from "@/data/productCopy";
import { productById, type ProductId } from "@/data/products";
import { cn, formatNumber } from "@/lib/cn";
import { SmartLink } from "@/components/ui/SmartLink";
import { StackTabs } from "./suite/StackTabs";

type Tone = "light" | "mist" | "sky" | "navy";
const tones: Record<Tone, { card: string; text: string; muted: string; frame: string; doodle: string; dark?: boolean }> = {
  light: {
    card: "bg-white ring-1 ring-[#D7E1EE] hover:ring-brand/30",
    text: "text-ink",
    muted: "text-ink-muted",
    frame: "bg-[#F3F7FC] ring-[#E1E9F3]",
    doodle: "text-brand-400/40",
  },
  mist: {
    card: "bg-[linear-gradient(165deg,#F2F8FF_0%,#E8F2FD_100%)] ring-1 ring-[#D8E7F7] hover:ring-brand/30",
    text: "text-ink",
    muted: "text-ink-muted",
    frame: "bg-white/85 ring-[#E1ECF8]",
    doodle: "text-brand-400/45",
  },
  sky: {
    card: "bg-[linear-gradient(165deg,#F3F9FF_0%,#E8F3FE_60%,#DDEEFD_100%)] ring-1 ring-[#CFE3F8] hover:ring-brand/35",
    text: "text-ink",
    muted: "text-ink-muted",
    frame: "bg-white/80 ring-[#D6E7F8]",
    doodle: "text-brand-400/50",
  },
  navy: {
    card: "bg-[linear-gradient(160deg,#13264A,#0B1730)] ring-1 ring-white/5 hover:ring-white/15",
    text: "text-white",
    muted: "text-white/72",
    frame: "bg-white/6 ring-white/10",
    doodle: "text-brand-300/40",
    dark: true,
  },
};

const doodleSpots: Record<ProductId, DoodleSpot[]> = {
  subscriptions: [
    { name: "repeat", className: "right-[5%] top-[3%] size-10", rotate: -8 },
    { name: "calendar", className: "hidden sm:block right-[18%] top-[4.5%] size-8", rotate: 8 },
    { name: "parcel", className: "right-[5%] bottom-[2.5%] size-9", rotate: -6 },
  ],
  memberships: [
    { name: "crown", className: "right-[5%] top-[3%] size-11", rotate: 10 },
    { name: "gem", className: "hidden sm:block right-[20%] top-[4.5%] size-8", rotate: -8 },
    { name: "ticket", className: "right-[5%] bottom-[2.5%] size-10", rotate: 8 },
  ],
  loyalty: [
    { name: "gift", className: "right-[5%] top-[3%] size-11", rotate: 10 },
    { name: "star", className: "hidden sm:block right-[20%] top-[4.5%] size-8", rotate: 12 },
    { name: "heart", className: "right-[5%] bottom-[2.5%] size-9", rotate: -6 },
  ],
  bundles: [
    { name: "percent", className: "right-[4%] top-[4%] size-10", rotate: -8 },
    { name: "bag", className: "hidden sm:block right-[16%] top-[5%] size-10", rotate: 6 },
    { name: "tag", className: "right-[4%] bottom-[3%] size-10", rotate: 14 },
  ],
  pickup: [
    { name: "pin", className: "right-[4%] top-[2.5%] size-9 md:right-auto md:left-[30%] md:top-[5%] md:size-11", rotate: -8 },
    { name: "van", className: "hidden md:block left-[24%] bottom-[6%] size-12", rotate: -4 },
    { name: "clock", className: "hidden md:block left-[3%] bottom-[4%] size-9", rotate: 6 },
  ],
};

const confetti = ["#1088F6", "#1088F6", "#6FC0FA", "#CEEFFD", "#F5B53F", "#F5B53F", "#0066CA", "#FFFFFF"];

const demo: Record<ProductId, ReactNode> = {
  subscriptions: (
    <>
      <RenewOrbit className="hidden sm:block" />
      <SubscriptionWidgetDemo />
    </>
  ),
  memberships: <MembershipAccountDemo />,
  loyalty: (
    <div className="relative">
      <LoyaltyPointsDemo />
      <Confetti colors={confetti} className="z-20 rounded-[1.75rem]" />
    </div>
  ),
  bundles: <BundleBuilderDemo />,
  pickup: (
    <>
      <DeliveryLane className="mb-4" />
      <PickupSchedulerDemo />
    </>
  ),
};

const stageScene: Partial<Record<ProductId, ReactNode>> = {
  memberships: <Sparkles />,
  bundles: <BundleRise />,
  loyalty: <LoyaltyRise />,
  pickup: <PickupRise />,
};

const demoWidth: Record<ProductId, string> = {
  subscriptions: "max-w-sm",
  memberships: "max-w-md",
  loyalty: "max-w-lg",
  bundles: "max-w-xl",
  pickup: "max-w-md",
};

function AppCard({ id, tone, wide, flip, className }: { id: ProductId; tone: Tone; wide?: boolean; flip?: boolean; className?: string }) {
  const p = productById[id];
  const copy = suiteCopy[id];
  const t = tones[tone];
  const dark = !!t.dark;
  const ctas = (
    <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center max-sm:[&>a]:h-11">
      <ButtonLink href={p.href} size="sm" variant={dark ? "light" : "primary"}>
        Learn <strong>more</strong>
      </ButtonLink>
      <ButtonLink
        href={p.installHref}
        size="sm"
        variant={dark ? "outlineLight" : "ghost"}
        arrow={false}
        className={dark ? undefined : "ring-1 ring-[#D3DDEA] hover:ring-brand/40"}
      >
        Install on <strong>Shopify</strong>
      </ButtonLink>
    </div>
  );
  const head = (
    <div className="flex min-w-0 flex-col">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <ProductIcon
          id={id}
          size="md"
          className={cn(
            
            dark ? "bg-white/12 text-white ring-white/15" : cn(p.accent.chip, p.accent.text, "ring-0"),
          )}
        />
        <div className="min-w-0">
          <p className={cn("text-[0.95rem] font-semibold", t.text)}>{p.shortName}</p>
          <SmartLink
            href={`${p.installHref}/reviews`}
            className={cn("hit-area inline-flex items-center gap-1.5 text-xs hover:underline", dark ? "text-white/70" : "text-ink-subtle")}
          >
            <Stars value={p.rating.value} className="[&>span]:size-3 [&_svg]:size-3" />
            {p.rating.value.toFixed(1)} · {formatNumber(p.rating.count)} reviews
            <span className="sr-only"> of {p.name} on the Shopify App Store</span>
          </SmartLink>
        </div>
      </div>
      <h3 id={`app-${id}`} className={cn("mt-4 short:mt-3 font-bold tracking-[-0.03em] text-balance", t.text, wide ? "text-[1.6rem] leading-[1.08] sm:text-[1.9rem] short:text-[1.5rem]" : "text-[1.3rem] leading-[1.12] short:text-[1.15rem]")}>
        {copy.title}
      </h3>
      <p className={cn("mt-2 text-[0.95rem] leading-relaxed short:mt-1 short:text-[0.875rem]", t.muted)}>{copy.intro}</p>
    </div>
  );
  const stage = (
    <div data-fit-stage="" className={cn("relative isolate flex min-h-0 flex-1 flex-col overflow-hidden rounded-[1.5rem] p-4 ring-1 sm:p-6 short:p-3.5", t.frame)}>
      <div aria-hidden className={cn("absolute inset-0 -z-20 rounded-[inherit] opacity-40", dark ? "bg-dots" : "bg-dots-ink")} />
      {stageScene[id]}
      <p
        className={cn(
          "absolute top-3 left-3 z-10 inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold shadow-soft ring-1 backdrop-blur",
          dark ? "bg-white/10 text-white/85 ring-white/15" : "bg-white/90 text-ink-muted ring-[#E1E9F3]",
        )}
      >
        <span className="relative flex size-2">
          <span className="absolute inset-0 rounded-full bg-[#22C55E] motion-safe:animate-[pulse-ring_2s_ease-out_infinite]" />
          <span className="relative size-2 rounded-full bg-[#22C55E]" />
        </span>
        Try it live
      </p>
      <div data-fit-demo="" data-fit-max="0.92" className={cn("relative isolate mx-auto my-auto w-full min-w-0 pt-8", demoWidth[id])}>
        <div>{demo[id]}</div>
      </div>
    </div>
  );
  return (
    <article
      aria-labelledby={`app-${id}`}
      data-fit-card=""
      
      className={cn(
        "group relative isolate flex h-full flex-col overflow-hidden rounded-[1.75rem] p-5 shadow-soft sm:p-6 short:p-4",
        t.card,
        className,
      )}
    >
      {dark && <div aria-hidden className="absolute inset-0 -z-20 bg-dots opacity-30 [mask-image:linear-gradient(to_bottom,transparent,#000)]" />}
      <Doodles autoplay spots={doodleSpots[id]} className={t.doodle} />
      {wide ? (
        <div className={cn("grid h-full gap-6 lg:gap-8", flip ? "lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]" : "lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]")}>
          <div className={cn("flex flex-col justify-center gap-6", flip && "lg:order-2")}>
            {head}
            {ctas}
          </div>
          {stage}
        </div>
      ) : (
        <div className="flex h-full flex-col gap-5 short:gap-3.5">
          {head}
          {stage}
          {ctas}
        </div>
      )}
    </article>
  );
}

const order: ProductId[] = ["subscriptions", "memberships", "loyalty", "bundles", "pickup"];

export function RetentionStack() {
  return (
    <section id="products" aria-labelledby="products-title" className="relative scroll-mt-24 bg-[#F7F9FC] py-band">
      <div className="mx-auto max-w-site px-5 sm:px-8 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow className="rounded-full bg-white px-3 py-1.5 ring-1 ring-[#D7E1EE]">The Appstle retention stack</Eyebrow>
            </Reveal>
            <h2 id="products-title" className="mt-5 text-[2.3rem] leading-[1.03] font-bold tracking-[-0.04em] text-ink sm:text-[3rem] lg:text-[3.4rem]">
              <SplitText>
                Five apps. <span className="text-brand">One retention stack.</span>
              </SplitText>
            </h2>
          </div>
          <Reveal delay={0.1} className="lg:col-span-5">
            <p className="text-lg leading-relaxed text-ink-muted lg:pb-2">
              Use one app or all five. Each is built for Shopify and Shopify Plus, and they’re designed to work together.
            </p>
          </Reveal>
        </div>

        <StackTabs
          panels={order.map((id, i) => ({
            id,
            label: productById[id].shortName,
            accent: cn(productById[id].accent.chip, productById[id].accent.text, "ring-0"),
            node: <AppCard id={id} tone="light" wide flip={i % 2 === 1} className="lg:min-h-[clamp(30rem,calc(100svh-10rem),36rem)]" />,
          }))}
        />
        <p className="mt-6 text-center text-xs text-ink-subtle">Demos use illustrative values and don’t create orders or bookings. Ratings from the Shopify App Store.</p>
      </div>
    </section>
  );
}
