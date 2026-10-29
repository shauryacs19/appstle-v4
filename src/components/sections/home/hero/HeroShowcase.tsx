"use client";

/*
 * Hero showcase — built from the user's own hero design (2026-10-29).
 * The glossy blob, ribbon ring, shopping bag, Appstle tiles, cart and box are the
 * original artwork (`assets/hero/hero-art.webp`, cut from the design at 961 × 690).
 * The four cards are live, clickable components fitted exactly over the painted cards
 * with a perspective transform (corner points measured from the design), so the hero
 * matches the design while the widgets stay interactive.
 */

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Check, Crown, Gift, MapPin, ShoppingCart, Store } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import heroArt from "@/assets/hero/hero-art.webp";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const ART_W = 961;
const ART_H = 690;

/** Card size (px, in art space) + matrix3d that maps it onto the painted card. */
const FIT = {
  sub: { w: 285, h: 439, m: "matrix3d(0.9881775,-0.069518382,0,-3.7541896e-05,0.081227611,1.0096063,0,3.0664908e-05,0,0,1,0,187.1,122.7,0,1)" },
  member: { w: 274, h: 180, m: "matrix3d(0.99157491,-0.061190909,0,-1.5821175e-05,0.10994325,1.0187077,0,7.8634049e-05,0,0,1,0,488.2,100.9,0,1)" },
  rewards: { w: 275, h: 126, m: "matrix3d(0.9778349,-0.062139119,0,-2.8489841e-05,0.076210589,0.99453401,0,7.7886368e-06,0,0,1,0,503,294.2,0,1)" },
  pickup: { w: 275, h: 171, m: "matrix3d(1.0005172,-0.050610138,0,1.5802792e-06,0.056959995,0.98943219,0,-1.0724447e-05,0,0,1,0,512.7,433.4,0,1)" },
} as const;

const white = "rounded-[15px] bg-white ring-1 ring-[#EEF0F6]";
const ink = "text-[#1B2437]";
const muted = "text-[#7A8294]";

/* ───────────────────────── cards ───────────────────────── */

function SerumThumb() {
  return (
    <span className="grid size-[54px] shrink-0 place-items-center rounded-xl bg-[linear-gradient(150deg,#FFF1F5_0%,#FBDCE6_100%)]">
      <svg viewBox="0 0 24 40" className="h-[38px] w-auto" aria-hidden>
        <rect x="9.5" y="1" width="5" height="6" rx="1.2" fill="#3B3F4A" />
        <rect x="7" y="6.5" width="10" height="4" rx="1" fill="#555B68" />
        <path d="M5 13.5c0-2 1.6-3.5 3.5-3.5h7c1.9 0 3.5 1.5 3.5 3.5V36a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3Z" fill="#F4A1B3" />
        <rect x="7" y="14" width="2" height="20" rx="1" fill="#fff" opacity=".45" />
      </svg>
    </span>
  );
}

function Radio({ on }: { on: boolean }) {
  return (
    <span className={cn("grid size-[15px] shrink-0 place-items-center rounded-full ring-[1.5px] transition-colors", on ? "ring-[#1A84F5]" : "ring-[#C9CFDA]")}>
      {on && <span className="size-[7px] rounded-full bg-[#1A84F5]" />}
    </span>
  );
}

const freqs = ["Weekly", "Every 2 weeks", "Monthly"] as const;

export function SubscriptionCard({ className }: { className?: string }) {
  const [choice, setChoice] = useState<"once" | "sub">("sub");
  const [freq, setFreq] = useState<(typeof freqs)[number]>("Monthly");
  const sub = choice === "sub";
  const [added, setAdded] = useState(false);
  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(t);
  }, [added]);
  return (
    <div className={cn(white, "flex flex-col px-[17px] pt-[18px] pb-[18px]", className)}>
      <div className="flex items-center gap-3">
        <SerumThumb />
        <div className="min-w-0 leading-tight">
          <p className={cn("text-[13.5px] font-semibold", ink)}>Glow Essentials</p>
          <p className={cn("mt-[3px] text-[12px]", muted)}>Hydrating Face Serum</p>
          <p className="mt-[3px] text-[12px] text-[#4B5466]">$69.99 USD</p>
        </div>
      </div>

      <div className="mt-[18px] flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.14em] text-[#5B6478] uppercase">
        <span className="w-4 border-t border-[#E3E6EE]" />
        Purchase options
        <span className="flex-1 border-t border-[#E3E6EE]" />
      </div>

      <div className="mt-2 space-y-1.5" role="radiogroup" aria-label="Purchase options">
        <button
          type="button"
          role="radio"
          aria-checked={!sub}
          onClick={() => setChoice("once")}
          className={cn("flex w-full items-center gap-2.5 rounded-xl px-2.5 py-[9px] text-left transition-colors", !sub ? "bg-[#F1F7FE] ring-[1.5px] ring-[#9CC8FB]" : "")}
        >
          <Radio on={!sub} />
          <span className={cn("text-[12.5px]", ink)}>One Time Purchase</span>
          <span className={cn("ml-auto text-[12.5px] font-semibold", ink)}>$69.99</span>
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={sub}
          onClick={() => setChoice("sub")}
          className={cn("flex w-full items-center gap-2 rounded-xl px-2.5 py-[9px] text-left transition-colors", sub ? "bg-[#F1F7FE] ring-[1.5px] ring-[#9CC8FB]" : "ring-1 ring-[#E6E9F0]")}
        >
          <Radio on={sub} />
          <span className={cn("text-[12.5px]", ink)}>Subscribe &amp; save</span>
          <span className="rounded-full bg-[#DCEBFF] px-1.5 py-[1px] text-[9.5px] font-semibold text-[#1A6FD6]">−10%</span>
          <span className="ml-auto text-right leading-tight">
            <span className={cn("block text-[12.5px] font-semibold", ink)}>$62.99</span>
            <s className="block text-[11px] text-[#9AA1B0]">$69.99</s>
          </span>
        </button>
      </div>

      <p className="mt-3 border-t border-[#EEF0F5] pt-2.5 text-[11.5px] text-[#3D4659]">Delivery frequency</p>
      <div className={cn("mt-2 flex gap-1.5 transition-opacity", !sub && "pointer-events-none opacity-45")}>
        {freqs.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFreq(f)}
            aria-pressed={freq === f}
            className={cn(
              "flex-1 rounded-full py-[8px] text-[11px] whitespace-nowrap transition-colors",
              freq === f ? "bg-[#1A84F5] font-medium text-white" : "bg-white text-[#3D4659] ring-1 ring-[#E1E4EC] hover:ring-[#B9C9E6]",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-[#EEF5FE] px-3 py-3">
        <Gift aria-hidden className="mt-px size-[15px] shrink-0 text-[#1A84F5]" strokeWidth={2} />
        <span className="leading-tight">
          <span className={cn("block text-[11.5px]", ink)}>Subscription rewards</span>
          <span className={cn("mt-1 block text-[10.5px]", muted)}>Get a free product after 3 orders.</span>
        </span>
      </div>

      <button
        type="button"
        onClick={() => setAdded(true)}
        className={cn("mt-auto flex h-[48px] items-center justify-center gap-2 rounded-xl text-[13.5px] font-medium transition-colors", added ? "bg-[#E3F7EA] text-[#1F9D57]" : "bg-[#1A84F5] text-white hover:bg-[#0875D1]")}
      >
        {added ? <Check aria-hidden className="size-4" strokeWidth={3} /> : <ShoppingCart aria-hidden className="size-4" strokeWidth={2} />}
        <span aria-live="polite">{added ? (sub ? `Subscribed · ${freq.toLowerCase()}` : "Added to cart") : "Add to cart"}</span>
      </button>
    </div>
  );
}

export function MembershipCard({ className }: { className?: string }) {
  const perks = ["Free express shipping", "Early access to drops", "10% off every order"];
  return (
    <div className={cn("relative flex flex-col overflow-hidden rounded-[15px] bg-[linear-gradient(32deg,#4546F6_0%,#6565F5_48%,#A598FC_100%)] px-[18px] pt-[16px] pb-[14px] text-white", className)}>
      <div className="flex items-center gap-2">
        <span className="grid size-[22px] place-items-center rounded-md bg-white/20">
          <Crown aria-hidden className="size-3.5" strokeWidth={2} />
        </span>
        <span className="text-[12.5px] font-medium">Gold Club</span>
        <span className="ml-auto rounded-full bg-white/20 px-2 py-0.5 text-[10px]">Member</span>
      </div>
      <p className="mt-2 text-[18.5px] font-semibold tracking-[-0.01em]">Your member perks</p>
      <ul className="mt-2 space-y-[5px]">
        {perks.map((p) => (
          <li key={p} className="flex items-center gap-2 text-[11.5px] text-white/92">
            <span className="grid size-3.5 place-items-center rounded-full bg-white/25">
              <Check aria-hidden className="size-2.5" strokeWidth={3} />
            </span>
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-auto flex items-center justify-between border-t border-white/20 pt-2 text-[11px]">
        <span className="text-white/85">Renews monthly</span>
        <span className="font-medium">$9.99 / mo</span>
      </div>
    </div>
  );
}

export function RewardsCard({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={cn(white, "flex flex-col px-[16px] pt-[13px] pb-[12px]", className)}>
      <div className="flex items-center gap-2">
        <span className="grid size-[20px] place-items-center rounded-md bg-[#FDE3EF] text-[#E2628F]">
          <Gift aria-hidden className="size-3" strokeWidth={2.2} />
        </span>
        <span className={cn("text-[12px] font-semibold", ink)}>Rewards</span>
        <span className="ml-auto rounded-full bg-[#FDE6EF] px-2 py-0.5 text-[10px] font-medium text-[#D24E81]">VIP · Silver</span>
      </div>
      <div className="mt-1.5 flex items-end justify-between">
        <p className={cn("text-[29px] leading-none font-bold tracking-[-0.02em] tabular-nums", ink)}>
          1,500 <span className="text-[14px] font-medium text-[#4B5466]">pts</span>
        </p>
        <span className="mb-0.5 rounded-full bg-[#E3F7EA] px-1.5 py-0.5 text-[9.5px] font-semibold text-[#1F9D57]">+80 pts</span>
      </div>
      <div className="mt-2.5 h-[6px] overflow-hidden rounded-full bg-[#F7E6EF]">
        <motion.div
          className="h-full rounded-full bg-[#F17AAE]"
          initial={reduce ? false : { width: "35%" }}
          animate={{ width: "70%" }}
          transition={{ duration: 1.1, delay: 0.6, ease: ease.out }}
        />
      </div>
      <p className="mt-auto flex items-center gap-1.5 text-[11px] font-medium text-[#1F9D57]">
        <span className="grid size-3.5 place-items-center rounded-full bg-[#22B266] text-white">
          <Check aria-hidden className="size-2.5" strokeWidth={3} />
        </span>
        Free shipping unlocked
      </p>
    </div>
  );
}

export function PickupCard({ className }: { className?: string }) {
  const [mode, setMode] = useState<"pickup" | "delivery">("pickup");
  const [day, setDay] = useState("Today");
  const [slot, setSlot] = useState("4–5 PM");
  return (
    <div className={cn(white, "flex flex-col px-[14px] pt-[12px] pb-[10px]", className)}>
      <div className="flex items-center gap-2">
        <span className="grid size-[20px] place-items-center rounded-md bg-[#FDE3EF] text-[#E2628F]">
          <Store aria-hidden className="size-3" strokeWidth={2.2} />
        </span>
        <span className={cn("text-[12px] font-semibold", ink)}>Pickup &amp; delivery</span>
      </div>
      <div className="mt-2 grid grid-cols-2 rounded-full p-[2px] text-[10.5px] ring-1 ring-[#E3E6EE]">
        {(["pickup", "delivery"] as const).map((m) => (
          <button
            key={m}
            type="button"
            aria-pressed={mode === m}
            onClick={() => setMode(m)}
            className={cn("rounded-full py-[5px] transition-colors", mode === m ? cn("bg-white ring-1 ring-[#D6DBE6]", ink) : "text-[#6B7385] hover:text-[#1B2437]")}
          >
            {m === "pickup" ? "Store pickup" : "Local delivery"}
          </button>
        ))}
      </div>
      <div className="mt-[7px] grid grid-cols-3 gap-1.5">
        {["Today", "Tue", "Wed"].map((d) => (
          <button
            key={d}
            type="button"
            aria-pressed={day === d}
            onClick={() => setDay(d)}
            className={cn("rounded-full py-[5px] text-[10.5px] transition-colors", day === d ? "bg-[#1F3E5A] text-white" : "bg-white text-[#3D4659] ring-1 ring-[#E1E4EC] hover:ring-[#B9C9E6]")}
          >
            {d}
          </button>
        ))}
      </div>
      <div className="mt-[6px] grid grid-cols-3 gap-1.5">
        {["10–11 AM", "4–5 PM", "6–7 PM"].map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={slot === s}
            onClick={() => setSlot(s)}
            className={cn("rounded-full py-[5px] text-[10px] whitespace-nowrap transition-colors", slot === s ? "bg-[#F8E2F2] text-[#C2416F]" : "bg-white text-[#3D4659] ring-1 ring-[#E1E4EC] hover:ring-[#B9C9E6]")}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="mt-auto flex items-center gap-1.5 text-[10px] text-[#6B7385]">
        <MapPin aria-hidden className="size-3 text-[#E2628F]" strokeWidth={2.2} />
        {mode === "pickup" ? "Downtown store · ready in 2 hrs" : "Local delivery · arrives today"}
      </p>
    </div>
  );
}

/* ───────────────────────── composition ───────────────────────── */

function Fitted({ fit, delay, children }: { fit: (typeof FIT)[keyof typeof FIT]; delay: number; children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="absolute top-0 left-0 origin-top-left"
      style={{ width: fit.w, height: fit.h, transform: fit.m }}
      initial={reduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay, ease: ease.out }}
    >
      {children}
    </motion.div>
  );
}

export function HeroShowcase() {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / ART_W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div
      ref={box}
      className="relative w-full [--s:0.66] xl:[--s:0.78] 2xl:[--s:0.86]"
      style={{ aspectRatio: `${ART_W} / ${ART_H}`, ...(scale ? ({ "--s": scale } as CSSProperties) : {}) }}
    >
      <div className="absolute top-0 left-0 origin-top-left [transform:scale(var(--s))]" style={{ width: ART_W, height: ART_H }}>
        <Image src={heroArt} alt="" priority sizes="(min-width: 1024px) 961px, 100vw" className="absolute inset-0 h-full w-full select-none" draggable={false} />
        <Fitted fit={FIT.sub} delay={0.2}>
          <SubscriptionCard className="h-full" />
        </Fitted>
        <Fitted fit={FIT.member} delay={0.3}>
          <MembershipCard className="h-full" />
        </Fitted>
        <Fitted fit={FIT.rewards} delay={0.4}>
          <RewardsCard className="h-full" />
        </Fitted>
        <Fitted fit={FIT.pickup} delay={0.5}>
          <PickupCard className="h-full" />
        </Fitted>
      </div>
    </div>
  );
}

/** Small-screen variant: the same live cards stacked over a soft blob. */
export function HeroShowcaseStack() {
  return (
    <div className="relative mx-auto grid w-full max-w-md gap-4">
      <div aria-hidden className="absolute inset-[-8%] -z-10 rounded-[3rem] bg-[radial-gradient(ellipse_at_30%_30%,rgb(176_210_255/0.7)_0%,rgb(197_178_255/0.5)_45%,rgb(244_185_209/0.4)_75%,transparent_100%)] blur-2xl" />
      <SubscriptionCard className="shadow-[0_24px_48px_-24px_rgb(60_60_160/0.35)]" />
      <div className="grid gap-4 sm:grid-cols-2">
        <MembershipCard className="min-h-[180px]" />
        <RewardsCard className="min-h-[126px] shadow-[0_24px_48px_-24px_rgb(60_60_160/0.3)]" />
      </div>
    </div>
  );
}
