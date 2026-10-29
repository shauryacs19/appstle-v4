"use client";

import { LayoutGroup, motion, useInView, useReducedMotion } from "motion/react";
import { ChevronDown, Droplet, Repeat2 } from "lucide-react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Float } from "@/components/motion/Float";
import { LoyaltyCard, MembershipCard, PickupCard } from "@/components/features/widgets/ProductWidgets";
import type { ProductId } from "@/data/products";
import { accentVars } from "@/lib/accents";
import { cn } from "@/lib/cn";
import { ease, spring } from "@/lib/motion";

const shell = "rounded-[1.15rem] bg-white ring-1 ring-canvas-line shadow-[0_1px_2px_rgb(6_43_82/0.05),0_22px_44px_-24px_rgb(6_43_82/0.32)]";

function useAutoPick(delay: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4, once: true });
  const reduce = useReducedMotion();
  const [picked, setPicked] = useState(false);
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setPicked(true), reduce ? 0 : delay);
    return () => clearTimeout(t);
  }, [inView, reduce, delay]);
  return [ref, picked] as const;
}

function Radio({ on }: { on: boolean }) {
  return (
    <span className={cn("grid size-4 shrink-0 place-items-center rounded-full ring-[1.5px] transition-colors", on ? "ring-brand" : "ring-ink/25")}>
      {on && <span className="size-2 rounded-full bg-brand" />}
    </span>
  );
}

export function StoreSubscriptionWidget({ className }: { className?: string }) {
  const [ref, sub] = useAutoPick(1600);
  const group = useId();
  return (
    <div ref={ref} className={cn(shell, "p-4", className)}>
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[linear-gradient(150deg,#FDE9F1,#F4B9D1)] text-[#A8325F]">
          <Droplet className="size-6" strokeWidth={1.8} />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-medium tracking-[0.12em] text-ink-subtle uppercase">Company 123</p>
          <p className="truncate text-[15px] font-semibold text-ink">Hair Serum</p>
          <p className="text-[12px] text-ink-muted">$69.99 USD</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.1em] text-ink uppercase">
        <span className="h-px flex-1 bg-ink/12" />
        Purchase options
        <span className="h-px flex-1 bg-ink/12" />
      </div>

      <LayoutGroup id={group}>
        <div className="mt-3 space-y-2">
          <div className="relative rounded-xl px-3 py-2.5">
            {!sub && <motion.span layoutId="hero-pick" transition={spring.soft} className="absolute inset-0 rounded-xl bg-brand-50/60 ring-[1.5px] ring-brand" />}
            {sub && <span className="absolute inset-0 rounded-xl ring-1 ring-ink/12" />}
            <div className="relative flex items-center gap-2.5">
              <Radio on={!sub} />
              <span className="text-[12.5px] font-semibold text-ink">One Time Purchase</span>
              <span className="ml-auto text-[12.5px] font-semibold text-ink">$69.99</span>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-xl">
            {sub && <motion.span layoutId="hero-pick" transition={spring.soft} className="absolute inset-0 rounded-xl bg-brand-50/60 ring-[1.5px] ring-brand" />}
            {!sub && <span className="absolute inset-0 rounded-xl ring-1 ring-ink/12" />}
            <p className="relative bg-brand py-1 text-center text-[10.5px] font-bold text-white">Most popular</p>
            <div className="relative px-3 py-2.5">
              <div className="flex items-center gap-2.5">
                <Radio on={sub} />
                <span className="text-[12.5px] font-semibold text-ink">Subscription</span>
                <span className="rounded-full bg-ink px-1.5 py-0.5 text-[9px] font-bold text-white">SAVE 20%</span>
                <span className="ml-auto text-right leading-tight">
                  <span className="block text-[12.5px] font-semibold text-ink">$55.99</span>
                  <s className="block text-[10.5px] text-ink-subtle">$69.99</s>
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between rounded-lg bg-[#F4F4F2] px-3 py-1.5 text-[11.5px] text-ink ring-1 ring-ink/10">
                Monthly
                <ChevronDown className="size-3.5 text-ink-muted" />
              </div>
            </div>
          </div>
        </div>
      </LayoutGroup>

      <p className="mt-3 flex items-center gap-1.5 text-[11.5px] font-medium text-ink">
        <Repeat2 className="size-3.5 text-brand" /> Subscription Details
      </p>
      <div className="mt-3 rounded-lg py-2 text-center text-[12px] font-semibold text-ink ring-1 ring-ink/25">Add to cart</div>
      <p className="mt-2 text-center text-[9.5px] font-semibold tracking-[0.12em] text-ink-subtle uppercase">Powered by Appstle</p>
    </div>
  );
}

const tiers = [
  { qty: 1, price: 20 },
  { qty: 3, price: 17, tag: "Most popular" },
  { qty: 5, price: 15, tag: "Best value" },
];

export function QuantityBreaksCard({ className }: { className?: string }) {
  const [ref, picked] = useAutoPick(2400);
  const active = picked ? 1 : 0;
  const group = useId();
  return (
    <div ref={ref} className={cn(shell, "p-4", className)}>
      <p className="text-[13px] font-semibold text-ink">Buy more, save more</p>
      <LayoutGroup id={group}>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {tiers.map((t, i) => (
            <div key={t.qty} className="relative rounded-xl px-2 pt-2 pb-2.5 text-center">
              {i === active ? (
                <motion.span layoutId="hero-tier" transition={spring.soft} className="absolute inset-0 rounded-xl bg-brand-50 ring-[1.5px] ring-brand" />
              ) : (
                <span className="absolute inset-0 rounded-xl ring-1 ring-ink/12" />
              )}
              <p className="relative text-[11px] font-medium text-ink-muted">Buy {t.qty}</p>
              <p className="relative mt-0.5 text-[15px] font-bold text-ink">${t.price}</p>
              {t.tag && <p className="relative mt-1 text-[9px] font-semibold text-brand-700">{t.tag}</p>}
            </div>
          ))}
        </div>
      </LayoutGroup>
      <motion.div
        key={active}
        initial={{ opacity: 0.6 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: ease.out }}
        className="mt-3 flex items-center justify-between rounded-lg bg-brand px-3 py-2 text-[12px] font-semibold text-white"
      >
        Add to cart
        <span>${tiers[active].qty * tiers[active].price}.00</span>
      </motion.div>
    </div>
  );
}

function Tile({ id, children, delay, float, className }: { id: ProductId; children: ReactNode; delay: number; float: number; className?: string }) {
  return (
    <motion.div
      style={accentVars(id)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: ease.out }}
      className={className}
    >
      <Float amplitude={4} duration={6 + float} delay={float * 0.5}>
        {children}
      </Float>
    </motion.div>
  );
}

export function HeroWidgets() {
  return (
    <div className="relative mx-auto w-full max-w-[40rem] lg:[zoom:0.88] xl:[zoom:0.95] short:[zoom:0.74]">
      <div aria-hidden className="absolute inset-x-[6%] inset-y-[8%] -z-10 rounded-[2.5rem] bg-[linear-gradient(160deg,#E8F3FF_0%,#F0ECFF_48%,rgb(255_241_217/0.35)_100%)] ring-1 ring-[#E1DCFB]">
        <div className="stage-lines-soft absolute inset-0 rounded-[inherit] [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-4 sm:pt-10">
          <Tile id="subscriptions" delay={0.25} float={1}>
            <StoreSubscriptionWidget />
          </Tile>
          <Tile id="bundles" delay={0.5} float={3} className="hidden sm:block">
            <QuantityBreaksCard />
          </Tile>
        </div>
        <div className="flex flex-col gap-4">
          <Tile id="memberships" delay={0.35} float={2} className="hidden sm:block">
            <MembershipCard className="bg-[linear-gradient(140deg,#8C8CFA_0%,#6565F5_48%,#4646C8_100%)] shadow-[0_18px_40px_-18px_rgb(70_70_200/0.55)]" />
          </Tile>
          <Tile id="loyalty" delay={0.45} float={4}>
            <LoyaltyCard />
          </Tile>
          <Tile id="pickup" delay={0.6} float={5} className="hidden sm:block">
            <PickupCard />
          </Tile>
        </div>
      </div>
    </div>
  );
}
