"use client";

import { useId, useState } from "react";
import { SectionLines } from "@/components/features/backdrops/SectionLines";
import { ArrowUpRight, Boxes, CalendarDays, Clock, Coins, Crown, Gem, Gift, Heart, MapPin, Package, Percent, Repeat, ShoppingBag, Sparkle, Star, Store, Tag, Ticket, Truck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { Stars } from "@/components/ui/Stars";
import { productById, type ProductId } from "@/data/products";
import { accentVars } from "@/lib/accents";
import { cn } from "@/lib/cn";
import { appWidgets } from "./suite/AppWidgets";
import { WidgetCanvas } from "./suite/WidgetCanvas";

const order: ProductId[] = ["subscriptions", "memberships", "loyalty", "bundles", "pickup"];

/** Flat palette tint behind each app's live widgets. */
const tint: Record<ProductId, string> = {
  subscriptions: "bg-[#EEF6FF]",
  memberships: "bg-[#F2F2FE]",
  loyalty: "bg-[#FDF2F7]",
  bundles: "bg-[#F5F1FF]",
  pickup: "bg-[#EAF3FC]",
};

/** Icons that float upward behind each app's widgets. */
const rising: Record<ProductId, LucideIcon[]> = {
  subscriptions: [Repeat, Package, CalendarDays, Truck],
  memberships: [Crown, Gem, Ticket, Sparkle],
  loyalty: [Gift, Star, Heart, Coins],
  bundles: [Percent, ShoppingBag, Tag, Boxes],
  pickup: [MapPin, Truck, Clock, Store],
};

/** Grid-line / label-dot colour per app (palette). */
const accentHex: Record<ProductId, string> = {
  subscriptions: "#219BFB",
  memberships: "#6565F5",
  loyalty: "#E2628F",
  bundles: "#7B5CF0",
  pickup: "#0875D1",
};

const blurb: Record<ProductId, string> = {
  subscriptions: "Flexible subscriptions that are easy for customers to buy and manage.",
  memberships: "Exclusive member perks that keep customers coming back.",
  loyalty: "Points, referrals and VIP tiers that drive more purchases.",
  bundles: "Raise order value with smart product bundles and upsells.",
  pickup: "Local pickup and delivery that fit your customers’ schedule.",
};

/** Rounded-down review count, e.g. 9,054 → "9,000+", 926 → "900+", 21 → "20+". */
function approxCount(n: number) {
  const step = n >= 100 ? 100 : 10;
  return `${(Math.floor(n / step) * step).toLocaleString("en-US")}+`;
}

export function RetentionStack({ initial = "subscriptions" }: { initial?: ProductId }) {
  const [active, setActive] = useState<ProductId>(initial);
  const base = useId();
  const w = appWidgets[active];
  const p = productById[active];

  return (
    <section id="products" data-line-host="" aria-labelledby="products-title" className="relative isolate scroll-mt-24 py-[clamp(4rem,10svh,6.5rem)]">
      <SectionLines variant="products" />
      <div className="mx-auto max-w-site px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>The Appstle retention stack</Eyebrow>
          </Reveal>
          <h2 id="products-title" className="mt-4 text-[2.3rem] text-ink sm:text-[3rem]">
            Five apps. <span className="text-brand">One retention stack.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[1.02rem] leading-relaxed text-ink-muted">
            Powerful apps that work together to turn first-time buyers into loyal, repeat customers.
          </p>
        </div>

        <div className="mt-10 grid gap-3 rounded-[1.75rem] bg-white/80 p-3 ring-1 ring-[#ECE8F2] sm:p-4 lg:grid-cols-[minmax(0,0.36fr)_minmax(0,1fr)] lg:gap-4">
          {/* App list */}
          <div role="tablist" aria-label="Appstle apps" aria-orientation="vertical" className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
            {order.map((id) => {
              const app = productById[id];
              const on = id === active;
              return (
                <div
                  key={id}
                  className={cn(
                    "shrink-0 rounded-2xl ring-1 transition-colors max-lg:w-[17rem]",
                    on ? "bg-white shadow-[0_14px_30px_-20px_rgb(40_60_140/0.35)] ring-[#E3E7F2]" : "ring-transparent hover:bg-[#F7F8FC]",
                  )}
                >
                  <button
                    type="button"
                    role="tab"
                    id={`${base}-tab-${id}`}
                    aria-selected={on}
                    aria-controls={`${base}-panel`}
                    onClick={() => setActive(id)}
                    className="flex w-full items-start gap-3.5 px-4 py-3.5 text-left"
                  >
                    <span style={accentVars(id)} className="contents">
                      <ProductIcon id={id} size="md" className="ring-0" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.95rem] font-semibold text-[#13294B]">{app.shortName}</span>
                      <span className="mt-0.5 flex items-center gap-1.5 text-[0.72rem] text-ink-subtle">
                        <Stars value={app.rating.value} className="[&>span]:size-3 [&_svg]:size-3" />
                        <span className="font-semibold text-ink">{app.rating.value.toFixed(1)}</span>· {approxCount(app.rating.count)} reviews
                      </span>
                      <span className="mt-1.5 block text-[0.82rem] leading-snug text-ink-muted">{blurb[id]}</span>
                    </span>
                  </button>
                  {on && (
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 pb-4 pl-[4.4rem]">
                      <SmartLink href={app.href} className="inline-flex items-center gap-1 text-[0.82rem] font-semibold text-[#1A84F5] hover:underline">
                        Learn more <ArrowUpRight aria-hidden className="size-3.5" />
                      </SmartLink>
                      <SmartLink href={app.installHref} className="inline-flex items-center gap-1 text-[0.82rem] font-medium text-ink-muted hover:text-ink">
                        Install on Shopify <ShoppingBag aria-hidden className="size-3.5" />
                      </SmartLink>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Live widgets for the selected app, on a draggable canvas */}
          <div id={`${base}-panel`} role="tabpanel" aria-labelledby={`${base}-tab-${active}`}>
            <p className="sr-only">{w.label}</p>
            <WidgetCanvas key={active} items={w.items} height={w.height} accent={accentHex[active]} tint={tint[active]} title={p.shortName} icons={rising[active]} />
          </div>
        </div>

        <div className="mt-6">
          <p className="text-center text-xs text-ink-subtle">Demos use illustrative values and don’t create orders or bookings. Ratings from the Shopify App Store; review counts rounded (Oct 2026).</p>
        </div>
      </div>
    </section>
  );
}
