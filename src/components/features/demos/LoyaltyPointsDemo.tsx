"use client";

import { AnimatePresence, animate, motion, useMotionValue, useMotionValueEvent } from "motion/react";
import { Cake, Gift, Heart, MessageSquareText, RotateCcw, ShoppingBag, Star, Truck, Users } from "lucide-react";
import { useId, useRef, useState } from "react";
import { DemoBadge } from "@/components/ui/Badges";
import { cn } from "@/lib/cn";

const START = 500;
const activities = [
  { id: "order", label: "Place an order", points: 100, icon: ShoppingBag },
  { id: "referral", label: "Refer a friend", points: 250, icon: Users },
  { id: "birthday", label: "Birthday reward", points: 100, icon: Cake },
  { id: "follow", label: "Follow on Instagram", points: 50, icon: Heart },
  { id: "review", label: "Leave a review", points: 50, icon: MessageSquareText },
] as const;
const rewards = [
  { id: "ship", label: "Free shipping", cost: 400, icon: Truck },
  { id: "coupon", label: "$15 off coupon", cost: 750, icon: Gift },
  { id: "product", label: "Free product", cost: 1200, icon: Star },
] as const;

export function LoyaltyPointsDemo() {
  const [balance, setBalance] = useState(START);
  const [bursts, setBursts] = useState<{ key: number; text: string }[]>([]);
  const [unlocked, setUnlocked] = useState<string[]>([]);
  const shown = useMotionValue(START);
  const [display, setDisplay] = useState(START);
  const keyRef = useRef(0);
  const live = useId();

  useMotionValueEvent(shown, "change", (v) => setDisplay(Math.round(v)));

  const change = (delta: number, text: string) => {
    const next = Math.max(0, balance + delta);
    setBalance(next);
    animate(shown, next, { duration: 0.8, ease: [0.16, 1, 0.3, 1] });
    const key = ++keyRef.current;
    setBursts((b) => [...b, { key, text }]);
    window.setTimeout(() => setBursts((b) => b.filter((x) => x.key !== key)), 1200);
  };

  const nextReward = rewards.find((r) => r.cost > balance) ?? rewards[rewards.length - 1];
  const progress = Math.min(1, balance / nextReward.cost);

  return (
    <div className="rounded-[1.75rem] bg-white p-5 shadow-float ring-1 ring-ink/8 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-lg font-bold text-ink">Rewards</p>
        <DemoBadge />
      </div>

      <div className="relative mt-5 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-100 via-brand-100 to-brand-50 p-5">
        <div aria-hidden className="absolute -right-6 -bottom-10 size-32 rounded-full bg-white/40" />
        <p className="text-sm font-medium text-ink/70">Your balance</p>
        <div className="relative mt-1 flex items-baseline gap-2">
          <span className="font-display text-5xl font-bold tracking-tight text-ink tabular-nums">{display.toLocaleString("en-US")}</span>
          <span className="font-semibold text-ink/70">points</span>
          <AnimatePresence>
            {bursts.map((b) => (
              <motion.span
                key={b.key}
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -18, scale: 1 }}
                exit={{ opacity: 0, y: -34 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "absolute top-0 left-40 rounded-full px-2.5 py-0.5 text-sm font-bold text-white shadow-soft",
                  b.text.startsWith("+") ? "bg-brand-700" : "bg-ink",
                )}
              >
                {b.text}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>
        <div className="relative mt-4">
          <div className="flex justify-between text-xs font-medium text-ink/70">
            <span>
              {balance >= nextReward.cost ? "Top reward unlocked" : `${(nextReward.cost - balance).toLocaleString("en-US")} points to ${nextReward.label.toLowerCase()}`}
            </span>
            <span>{nextReward.cost.toLocaleString("en-US")}</span>
          </div>
          <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-white/70">
            <motion.div
              className="h-full rounded-full bg-brand-700"
              initial={false}
              animate={{ width: `${progress * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>
        <p id={live} className="sr-only" aria-live="polite">
          Balance {balance} points
        </p>
      </div>

      <div className="mt-6 grid gap-x-4 gap-y-6 sm:grid-cols-2">
        <div>
          <p className="eyebrow text-ink-subtle">Earn</p>
          <ul className="mt-3 grid gap-2">
            {activities.map((a) => (
              <li key={a.id}>
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.96 }}
                  onClick={() => change(a.points, `+${a.points}`)}
                  className="group flex w-full items-center gap-2 rounded-xl px-2.5 py-2.5 text-left ring-1 ring-ink/10 transition hover:bg-brand-50 hover:ring-brand-200"
                >
                  <a.icon aria-hidden className="size-4 shrink-0 text-brand-700" />
                  <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm font-medium text-ink">{a.label}</span>
                  <span className="shrink-0 text-xs font-bold text-brand-700">+{a.points}</span>
                </motion.button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-ink-subtle">Redeem</p>
          <ul className="mt-3 grid gap-2">
            {rewards.map((r) => {
              const can = balance >= r.cost;
              const done = unlocked.includes(r.id);
              return (
                <li key={r.id}>
                  <button
                    type="button"
                    disabled={!can}
                    onClick={() => {
                      change(-r.cost, `−${r.cost}`);
                      setUnlocked((u) => [...u, r.id]);
                    }}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-xl px-2.5 py-2.5 text-left ring-1 transition",
                      can ? "bg-ink text-white ring-ink hover:bg-ink-700" : "cursor-not-allowed bg-brand-50 text-ink-subtle ring-ink/8",
                    )}
                  >
                    <r.icon aria-hidden className="size-4 shrink-0" />
                    <span className="min-w-0 flex-1 truncate whitespace-nowrap text-sm font-medium">{r.label}</span>
                    <span className="shrink-0 text-xs font-bold">{r.cost.toLocaleString("en-US")}</span>
                  </button>
                  <AnimatePresence>
                    {done && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="px-1 pt-1 text-xs font-semibold text-brand-700"
                      >
                        Redeemed in the demo — a real program would issue a reward.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
          <button
            type="button"
            onClick={() => {
              setBalance(START);
              setUnlocked([]);
              animate(shown, START, { duration: 0.6 });
            }}
            className="hit-area mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-ink"
          >
            <RotateCcw aria-hidden className="size-3.5" /> Reset demo
          </button>
        </div>
      </div>
    </div>
  );
}
