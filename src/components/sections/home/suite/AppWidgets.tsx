"use client";

/*
 * Compact, clickable widgets for the products section — three per app, in the same
 * visual language as the hero cards (white 15px cards, 11–13px UI type, palette colours).
 * Content mirrors real Appstle storefront widgets (demo.appstle.com: "Hair Serum · Company 123").
 * Illustrative values only — nothing is ordered, booked or charged.
 */

import {
  Check,
  Crown,
  Gift,
  Lock,
  MapPin,
  Minus,
  Package,
  Pause,
  Plus,
  Repeat2,
  RotateCcw,
  ShoppingBag,
  SkipForward,
  Sparkles,
  Truck,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import type { ProductId } from "@/data/products";
import { BundleBuilderDemo } from "@/components/features/demos/BundleBuilderDemo";
import { LoyaltyPointsDemo } from "@/components/features/demos/LoyaltyPointsDemo";
import { MembershipTierDemo } from "@/components/features/demos/MembershipTierDemo";
import { PickupSchedulerDemo } from "@/components/features/demos/PickupSchedulerDemo";
import { SubscriptionWidgetDemo } from "@/components/features/demos/SubscriptionWidgetDemo";
import { DeliveryLane } from "@/components/features/backdrops/scenes";
import { Confetti } from "@/components/motion/Confetti";
import { accentVars } from "@/lib/accents";
import { cn } from "@/lib/cn";

/* palette */
const BTN = "bg-[#1A84F5] text-white hover:bg-[#0875D1]";
const ink = "text-[#1B2437]";
const muted = "text-[#6B7385]";

export const card = "rounded-[15px] bg-white ring-1 ring-[#ECEEF5] shadow-[0_1px_2px_rgb(30_40_90/0.04),0_18px_36px_-22px_rgb(40_60_140/0.28)]";

/** Primary widget button with a short "done" state, so every CTA visibly responds. */
function ActionButton({ label, done, className, onClick }: { label: string; done: string; className?: string; onClick?: () => void }) {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    if (!ok) return;
    const t = setTimeout(() => setOk(false), 1800);
    return () => clearTimeout(t);
  }, [ok]);
  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        setOk(true);
      }}
      className={cn("flex h-10 w-full items-center justify-center gap-1.5 rounded-xl text-[12.5px] font-medium transition-colors", ok ? "bg-[#E3F7EA] text-[#1F9D57]" : BTN, className)}
    >
      {ok && <Check aria-hidden className="size-4" strokeWidth={3} />}
      <span aria-live="polite">{ok ? done : label}</span>
    </button>
  );
}

function Head({ icon, title, tone, right }: { icon: ReactNode; title: string; tone: string; right?: ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("grid size-[22px] shrink-0 place-items-center rounded-md", tone)}>{icon}</span>
      <span className={cn("text-[12px] font-semibold", ink)}>{title}</span>
      {right && <span className="ml-auto">{right}</span>}
    </div>
  );
}

function Radio({ on }: { on: boolean }) {
  return (
    <span className={cn("grid size-[15px] shrink-0 place-items-center rounded-full ring-[1.5px]", on ? "ring-[#1A84F5]" : "ring-[#C9CFDA]")}>
      {on && <span className="size-[7px] rounded-full bg-[#1A84F5]" />}
    </span>
  );
}

function Chip({ on, children, onClick, tone = "blue" }: { on: boolean; children: ReactNode; onClick: () => void; tone?: "blue" | "dark" | "pink" | "violet" }) {
  const active = { blue: "bg-[#1A84F5] text-white", dark: "bg-[#1F3E5A] text-white", pink: "bg-[#FBE3EE] text-[#C2416F]", violet: "bg-[#6565F5] text-white" }[tone];
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn("rounded-full px-2.5 py-[6px] text-[10.5px] whitespace-nowrap", on ? active : "bg-white text-[#3D4659] ring-1 ring-[#E1E4EC] hover:ring-[#B9C9E6]")}
    >
      {children}
    </button>
  );
}

function Bottle({ color = "#F4A1B3", className }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 40" className={cn("h-8 w-auto", className)} aria-hidden>
      <rect x="9.5" y="1" width="5" height="6" rx="1.2" fill="#3B3F4A" />
      <rect x="7" y="6.5" width="10" height="4" rx="1" fill="#555B68" />
      <path d="M5 13.5c0-2 1.6-3.5 3.5-3.5h7c1.9 0 3.5 1.5 3.5 3.5V36a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3Z" fill={color} />
      <rect x="7" y="14" width="2" height="20" rx="1" fill="#fff" opacity=".45" />
    </svg>
  );
}

function Thumb({ bg, children, size = "size-12" }: { bg: string; children: ReactNode; size?: string }) {
  return <span className={cn("grid shrink-0 place-items-center rounded-xl", size, bg)}>{children}</span>;
}

/* ───────────── Subscriptions ───────────── */


function PortalWidget() {
  const months = ["Thu, Nov 12", "Sat, Dec 12", "Tue, Jan 12", "Fri, Feb 12", "Thu, Mar 12"];
  const [skips, setSkips] = useState(0);
  const [paused, setPaused] = useState(false);
  return (
    <div className={cn(card, "p-4")}>
      <Head
        icon={<Repeat2 className="size-3.5" strokeWidth={2.2} />}
        tone="bg-[#E6F3FF] text-[#1A84F5]"
        title="My subscription"
        right={<span className={cn("rounded-full px-2 py-0.5 text-[9.5px] font-semibold", paused ? "bg-[#FBE3EE] text-[#C2416F]" : "bg-[#E3F7EA] text-[#1F9D57]")}>{paused ? "Paused" : "Active"}</span>}
      />
      <div className="mt-3 flex items-center gap-2.5 rounded-xl bg-[#F6F8FC] p-2.5">
        <Thumb bg="bg-[#FDECF2]" size="size-9">
          <Bottle className="h-6" />
        </Thumb>
        <div className="leading-tight">
          <p className={cn("text-[11.5px] font-medium", ink)}>Hair Serum · Monthly</p>
          <p className={cn("mt-0.5 text-[10.5px]", muted)} aria-live="polite">
            {paused ? "Paused — resume anytime" : `Next order ${months[Math.min(skips, months.length - 1)]}`}
            {!paused && skips > 0 && <span className="text-[#1A84F5]"> · {skips} skipped</span>}
          </p>
        </div>
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        <button type="button" disabled={paused || skips >= months.length - 1} onClick={() => setSkips((n) => n + 1)} className="flex items-center justify-center gap-1.5 rounded-lg py-[7px] text-[10.5px] text-[#1B2437] ring-1 ring-[#E1E4EC] hover:ring-[#9CC8FB] disabled:opacity-40">
          <SkipForward aria-hidden className="size-3 text-[#1A84F5]" /> Skip next
        </button>
        <button type="button" disabled={skips === 0} onClick={() => setSkips((n) => Math.max(0, n - 1))} className="flex items-center justify-center gap-1.5 rounded-lg py-[7px] text-[10.5px] text-[#1B2437] ring-1 ring-[#E1E4EC] hover:ring-[#9CC8FB] disabled:opacity-40">
          <RotateCcw aria-hidden className="size-3 text-[#1A84F5]" /> Undo
        </button>
        <button type="button" onClick={() => setPaused((v) => !v)} className="flex items-center justify-center gap-1.5 rounded-lg py-[7px] text-[10.5px] text-[#1B2437] ring-1 ring-[#E1E4EC] hover:ring-[#9CC8FB]">
          <Pause aria-hidden className="size-3 text-[#1A84F5]" /> {paused ? "Resume" : "Pause"}
        </button>
      </div>
    </div>
  );
}


/* ───────────── Memberships ───────────── */




function MemberPriceWidget() {
  const [member, setMember] = useState(true);
  const rows = [
    { name: "Hair Serum", price: 69.99 },
    { name: "Complete Skincare Set", price: 39.99 },
  ];
  return (
    <div className={cn(card, "p-4")}>
      <Head icon={<Sparkles className="size-3.5" strokeWidth={2.2} />} tone="bg-[#ECECFE] text-[#6565F5]" title="Member pricing" />
      <div className="mt-3 grid grid-cols-2 rounded-full bg-[#F4F4FB] p-[3px] text-[10.5px]">
        {(["Guest", "Silver member"] as const).map((v) => {
          const on = (v !== "Guest") === member;
          return (
            <button key={v} type="button" aria-pressed={on} onClick={() => setMember(v !== "Guest")} className={cn("rounded-full py-[5px]", on ? "bg-[#6565F5] font-medium text-white" : "text-[#6B7385]")}>
              {v}
            </button>
          );
        })}
      </div>
      <ul className="mt-3 space-y-1.5">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between text-[11px]">
            <span className={muted}>{r.name}</span>
            <span className="flex items-baseline gap-1.5">
              {member && <s className="text-[10px] text-[#9AA1B0]">${r.price.toFixed(2)}</s>}
              <span className={cn("text-[13px] font-bold", member ? "text-[#6565F5]" : ink)}>${(member ? r.price * 0.9 : r.price).toFixed(2)}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className={cn("mt-2.5 rounded-lg px-2.5 py-1.5 text-[10px]", member ? "bg-[#E3F7EA] text-[#1F9D57]" : "bg-[#F4F4FE] text-[#4B4BC9]")}>
        {member ? "You save $11.00 with your Silver membership" : "Members pay 10% less — join Silver to save $11.00"}
      </p>
    </div>
  );
}

/* ───────────── Loyalty & Rewards ───────────── */



function VipWidget() {
  const [spent, setSpent] = useState(180);
  const gold = spent >= 300;
  return (
    <div className={cn(card, "p-4")}>
      <Head icon={<Crown className="size-3.5" strokeWidth={2.2} />} tone="bg-[#FDE6EF] text-[#E2628F]" title="VIP tiers" right={<span className="rounded-full bg-[#FDE6EF] px-2 py-0.5 text-[9.5px] font-medium text-[#D24E81]">{gold ? "Gold" : "Silver"}</span>} />
      <div className="mt-3 flex items-center justify-between text-[10.5px]">
        <span className="font-semibold text-[#D24E81]">${spent} spent</span>
        <span className={muted}>Gold at $300</span>
      </div>
      <div className="mt-1.5 h-[6px] overflow-hidden rounded-full bg-[#F7E6EF]">
        <div className="h-full rounded-full bg-[#F17AAE] transition-[width] duration-500" style={{ width: `${Math.min(100, (spent / 300) * 100)}%` }} />
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-2">
        <p className={cn("text-[10.5px]", muted)}>{gold ? "Gold unlocked · 2× points" : `Spend $${300 - spent} more to reach Gold`}</p>
        <button type="button" onClick={() => setSpent((v) => (v >= 300 ? 180 : v + 40))} className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium text-[#D24E81] ring-1 ring-[#F4B9D1] hover:bg-[#FDF1F6]">
          {gold ? "Reset" : "+ $40 order"}
        </button>
      </div>
    </div>
  );
}


/* ───────────── Bundles & Upsells ───────────── */





function UpsellWidget() {
  const [added, setAdded] = useState(false);
  return (
    <div className={cn(card, "p-4")}>
      <p className="text-[9.5px] font-semibold tracking-[0.14em] text-[#5B6478] uppercase">Frequently bought together</p>
      <div className="mt-2.5 flex items-center gap-2.5">
        <Thumb bg="bg-[#F1ECFF]" size="size-10">
          <Bottle color="#C5B2FF" className="h-6" />
        </Thumb>
        <div className="leading-tight">
          <p className={cn("text-[11.5px] font-medium", ink)}>Silk Hair Wrap</p>
          <p className={cn("text-[10.5px]", muted)}>
            <s>$24</s> <span className="font-semibold text-[#7B5CF0]">$18 with bundle</span>
          </p>
        </div>
        <button type="button" onClick={() => setAdded(!added)} className={cn("ml-auto grid size-7 place-items-center rounded-full", added ? "bg-[#E3F7EA] text-[#1F9D57]" : "bg-[#1A84F5] text-white")} aria-label={added ? "Added" : "Add"}>
          {added ? <Check aria-hidden className="size-3.5" strokeWidth={3} /> : <Plus aria-hidden className="size-3.5" strokeWidth={3} />}
        </button>
      </div>
    </div>
  );
}

/* ───────────── Pickup & Delivery ───────────── */


function StoresWidget() {
  const [store, setStore] = useState("Downtown");
  const stores = [
    { name: "Downtown", dist: "0.8 mi", ready: "Ready in 2 hrs" },
    { name: "Westside", dist: "3.4 mi", ready: "Ready tomorrow" },
  ];
  return (
    <div className={cn(card, "p-4")}>
      <Head icon={<MapPin className="size-3.5" strokeWidth={2.2} />} tone="bg-[#E3EFFB] text-[#0875D1]" title="Pickup location" />
      <div className="mt-3 space-y-1.5">
        {stores.map((s) => (
          <button key={s.name} type="button" aria-pressed={store === s.name} onClick={() => setStore(s.name)} className={cn("flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left", store === s.name ? "bg-[#EEF5FD] ring-[1.5px] ring-[#0875D1]" : "ring-1 ring-[#E6E9F0]")}>
            <Radio on={store === s.name} />
            <span className="leading-tight">
              <span className={cn("block text-[11px] font-medium", ink)}>{s.name} store</span>
              <span className={cn("block text-[10px]", muted)}>{s.ready}</span>
            </span>
            <span className={cn("ml-auto text-[10px]", muted)}>{s.dist}</span>
          </button>
        ))}
      </div>
    </div>
  );
}



/* ───────────── collage ───────────── */

/* ───────────── Larger widgets based on demo.appstle.com ───────────── */

const giftBoxes = [
  { name: "Men's Grooming Box", price: 27.99, color: "#9CC8FB" },
  { name: "Baby Care Box", price: 19.99, color: "#F4B9D1" },
  { name: "Women's Personal Care Box", price: 37.99, color: "#C5B2FF" },
];

/** Gift Subscription Boxes collection (demo store) → Appstle gift subscriptions. */
function GiftWidget() {
  const [box, setBox] = useState(0);
  const [months, setMonths] = useState(3);
  const [email, setEmail] = useState("");
  const b = giftBoxes[box];
  return (
    <div className={cn(card, "p-4")}>
      <Head icon={<Gift className="size-3.5" strokeWidth={2.2} />} tone="bg-[#E6F3FF] text-[#1A84F5]" title="Gift a subscription" />
      <div className="mt-3 grid grid-cols-3 gap-2">
        {giftBoxes.map((g, i) => (
          <button key={g.name} type="button" aria-pressed={box === i} onClick={() => setBox(i)} className={cn("rounded-xl p-2 text-left", box === i ? "bg-[#F1F7FE] ring-[1.5px] ring-[#1A84F5]" : "ring-1 ring-[#E6E9F0] hover:ring-[#9CC8FB]")}>
            <span className="grid h-12 place-items-center rounded-lg" style={{ background: `${g.color}40` }}>
              <Package aria-hidden className="size-6" style={{ color: g.color }} />
            </span>
            <span className={cn("mt-1.5 block text-[10px] leading-tight font-medium", ink)}>{g.name}</span>
            <span className={cn("block text-[10px]", muted)}>${g.price}/mo</span>
          </button>
        ))}
      </div>
      <p className={cn("mt-3 text-[10.5px] font-medium", ink)}>Gift length</p>
      <div className="mt-1.5 grid grid-cols-3 gap-1.5">
        {[3, 6, 12].map((m) => (
          <Chip key={m} on={months === m} onClick={() => setMonths(m)}>
            {m} months
          </Chip>
        ))}
      </div>
      <label className={cn("mt-3 block text-[10.5px] font-medium", ink)}>
        Recipient email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="friend@example.com"
          className="mt-1.5 block w-full rounded-lg px-2.5 py-2 text-[11px] font-normal text-[#1B2437] ring-1 ring-[#E1E4EC] outline-none placeholder:text-[#9AA1B0] focus:ring-[1.5px] focus:ring-[#1A84F5]"
        />
      </label>
      <div className="mt-3 flex items-center justify-between">
        <span className={cn("text-[10.5px]", muted)}>{months} × ${b.price} · prepaid</span>
        <span className={cn("text-[16px] font-bold", ink)}>${(b.price * months).toFixed(2)}</span>
      </div>
      <ActionButton className="mt-2.5" label="Gift this subscription" done={email ? `Gift sent to ${email}` : "Gift scheduled"} />
    </div>
  );
}

const memberItems = [
  { name: "Limited Edition Candle Set", price: 40, tag: "Members only" },
  { name: "Night Repair Serum", price: 58, tag: "Early access · 48h" },
  { name: "Member Gift Box", price: 25, tag: "Members only" },
];

/** Members-only collection with gated products. */
function MembersStoreWidget() {
  const [member, setMember] = useState(false);
  const [added, setAdded] = useState<string[]>([]);
  return (
    <div className={cn(card, "p-4")}>
      <Head icon={<Lock className="size-3.5" strokeWidth={2.2} />} tone="bg-[#ECECFE] text-[#6565F5]" title="Members-only collection" />
      <div className="mt-3 grid grid-cols-2 rounded-full bg-[#F4F4FB] p-[3px] text-[10.5px]">
        {(["Guest", "Gold member"] as const).map((v) => (
          <button key={v} type="button" aria-pressed={(v !== "Guest") === member} onClick={() => setMember(v !== "Guest")} className={cn("rounded-full py-[5px]", (v !== "Guest") === member ? "bg-[#6565F5] font-medium text-white" : "text-[#6B7385]")}>
            Viewing as {v}
          </button>
        ))}
      </div>
      <ul className="mt-3 space-y-2">
        {memberItems.map((m) => {
          const on = added.includes(m.name);
          return (
            <li key={m.name} className="flex items-center gap-2.5 rounded-xl p-2 ring-1 ring-[#E6E9F0]">
              <Thumb bg="bg-[#ECECFE]" size="size-10">
                <Sparkles aria-hidden className="size-4 text-[#6565F5]" />
              </Thumb>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="rounded-full bg-[#ECECFE] px-1.5 py-px text-[8.5px] font-semibold text-[#6565F5]">{m.tag}</span>
                <span className={cn("mt-1 block truncate text-[11px] font-medium", ink)}>{m.name}</span>
                <span className={cn("block text-[10.5px]", muted)}>${m.price}.00</span>
              </span>
              {member ? (
                <button type="button" onClick={() => setAdded((a) => (on ? a.filter((x) => x !== m.name) : [...a, m.name]))} className={cn("grid size-8 shrink-0 place-items-center rounded-full", on ? "bg-[#E3F7EA] text-[#1F9D57]" : "bg-[#6565F5] text-white")} aria-label={on ? `Remove ${m.name}` : `Add ${m.name}`}>
                  {on ? <Check aria-hidden className="size-4" strokeWidth={3} /> : <Plus aria-hidden className="size-4" strokeWidth={3} />}
                </button>
              ) : (
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#F4F4FB] text-[#9AA1B0]" title="Locked">
                  <Lock aria-hidden className="size-3.5" />
                </span>
              )}
            </li>
          );
        })}
      </ul>
      {member ? (
        <p className="mt-3 rounded-lg bg-[#E3F7EA] py-2 text-center text-[10.5px] font-medium text-[#1F9D57]">{added.length ? `${added.length} member item${added.length > 1 ? "s" : ""} in cart` : "Unlocked — add anything above"}</p>
      ) : (
        <button type="button" onClick={() => setMember(true)} className={cn("mt-3 flex h-10 w-full items-center justify-center gap-1.5 rounded-xl text-[12.5px] font-medium", "bg-[#6565F5] text-white hover:bg-[#4B4BC9]")}>
          <Crown aria-hidden className="size-4" /> Become a member to unlock
        </button>
      )}
    </div>
  );
}

const redeemOptions = [
  { id: "five", label: "$5 off your order", pts: 500, off: 5, ship: false },
  { id: "ship", label: "Free shipping", pts: 200, off: 0, ship: true },
  { id: "ten", label: "10% off your order", pts: 900, off: 6, ship: false },
];

/** Cart & checkout redemption. */
function RedeemWidget() {
  const [pick, setPick] = useState<string | null>("five");
  const r = redeemOptions.find((o) => o.id === pick);
  const shipping = r?.ship ? 0 : 6;
  const total = 60 + shipping - (r?.off ?? 0);
  return (
    <div className={cn(card, "p-4")}>
      <Head icon={<ShoppingBag className="size-3.5" strokeWidth={2.2} />} tone="bg-[#FDE6EF] text-[#E2628F]" title="Your cart" right={<span className="text-[10px] font-medium text-[#D24E81]">1,250 pts</span>} />
      <ul className={cn("mt-3 space-y-1.5 text-[11px]", ink)}>
        {[
          ["Coffee Pods · 12 pack", 36],
          ["Ceramic Mug", 24],
        ].map(([n, pr]) => (
          <li key={n as string} className="flex items-center gap-2.5">
            <span className="size-8 rounded-lg bg-[#FDF1F6]" />
            {n}
            <span className="ml-auto">${pr}.00</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[9.5px] font-semibold tracking-[0.14em] text-[#5B6478] uppercase">Redeem your points</p>
      <div className="mt-1.5 space-y-1.5" role="radiogroup" aria-label="Rewards">
        {redeemOptions.map((o) => (
          <button key={o.id} type="button" role="radio" aria-checked={pick === o.id} onClick={() => setPick(pick === o.id ? null : o.id)} className={cn("flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-left text-[11px]", pick === o.id ? "bg-[#FDF1F6] ring-[1.5px] ring-[#E2628F]" : "ring-1 ring-[#E6E9F0] hover:ring-[#F4B9D1]")}>
            <Radio on={pick === o.id} />
            <span className={ink}>{o.label}</span>
            <span className="ml-auto text-[10px] text-[#D24E81]">{o.pts} pts</span>
          </button>
        ))}
      </div>
      <div className={cn("mt-3 space-y-1 text-[10.5px]", muted)}>
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>$60.00</span>
        </p>
        <p className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping ? "$6.00" : "Free"}</span>
        </p>
        {r && r.off > 0 && (
          <p className="flex justify-between text-[#D24E81]">
            <span>Reward</span>
            <span>−${r.off.toFixed(2)}</span>
          </p>
        )}
        <p className={cn("flex justify-between pt-1 text-[14px] font-bold", ink)}>
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </p>
      </div>
      <ActionButton className="mt-2.5" label="Checkout" done={r ? `${r.pts} pts redeemed` : "Order placed"} />
    </div>
  );
}

const setItems = [
  { name: "Gentle Cleanser", price: 18, color: "#C5B2FF" },
  { name: "Balancing Toner", price: 16, color: "#9CC8FB" },
  { name: "Daily Moisturizer", price: 18, color: "#F4B9D1" },
];

/** Complete Skincare Set (demo store) → fixed-price bundle with subscribe option. */
function FixedBundleWidget() {
  const [sub, setSub] = useState(false);
  const [qty, setQty] = useState(1);
  const unit = sub ? 35.99 : 39.99;
  return (
    <div className={cn(card, "p-4")}>
      <Head icon={<Package className="size-3.5" strokeWidth={2.2} />} tone="bg-[#F1ECFF] text-[#7B5CF0]" title="Complete Skincare Set" right={<span className="rounded-full bg-[#F1ECFF] px-2 py-0.5 text-[9.5px] font-semibold text-[#7B5CF0]">Save 23%</span>} />
      <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#F8F5FF] py-3">
        {setItems.map((i, n) => (
          <span key={i.name} className="flex items-center gap-2">
            {n > 0 && <Plus aria-hidden className="size-3 text-[#9B86F7]" />}
            <Bottle color={i.color} className="h-11" />
          </span>
        ))}
      </div>
      <ul className="mt-3 space-y-1">
        {setItems.map((i) => (
          <li key={i.name} className={cn("flex items-center gap-2 text-[11px]", ink)}>
            <Check aria-hidden className="size-3 text-[#7B5CF0]" strokeWidth={3} />
            {i.name}
            <s className="ml-auto text-[10px] text-[#9AA1B0]">${i.price}.00</s>
          </li>
        ))}
      </ul>
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        <button type="button" aria-pressed={!sub} onClick={() => setSub(false)} className={cn("rounded-lg px-2.5 py-2 text-left text-[10.5px]", !sub ? "bg-[#F6F2FF] ring-[1.5px] ring-[#9B86F7]" : "ring-1 ring-[#E6E9F0]")}>
          <span className={cn("block font-medium", ink)}>One-time</span>
          <span className={muted}>$39.99</span>
        </button>
        <button type="button" aria-pressed={sub} onClick={() => setSub(true)} className={cn("rounded-lg px-2.5 py-2 text-left text-[10.5px]", sub ? "bg-[#F6F2FF] ring-[1.5px] ring-[#9B86F7]" : "ring-1 ring-[#E6E9F0]")}>
          <span className={cn("block font-medium", ink)}>Subscribe & save 10%</span>
          <span className={muted}>$35.99 / month</span>
        </button>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="flex items-center rounded-full ring-1 ring-[#E1E4EC]">
          <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid size-7 place-items-center text-[#5B6478]">
            <Minus aria-hidden className="size-3" />
          </button>
          <span className={cn("w-5 text-center text-[11.5px] font-semibold tabular-nums", ink)}>{qty}</span>
          <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(9, q + 1))} className="grid size-7 place-items-center text-[#5B6478]">
            <Plus aria-hidden className="size-3" />
          </button>
        </span>
        <span className="text-right leading-tight">
          <s className="block text-[10px] text-[#9AA1B0]">${(52 * qty).toFixed(2)}</s>
          <span className={cn("text-[16px] font-bold", ink)}>${(unit * qty).toFixed(2)}</span>
        </span>
      </div>
      <ActionButton className="mt-2.5" label="Add set to cart" done={`${qty} set${qty > 1 ? "s" : ""} added`} />
    </div>
  );
}

/** Local delivery: postcode check, delivery window, schedule. */
function DeliveryZoneWidget() {
  const [zip, setZip] = useState("94025");
  const [checked, setChecked] = useState<"yes" | "no" | null>("yes");
  const [win, setWin] = useState("Afternoon");
  const check = () => setChecked(/^9\d{4}$/.test(zip.trim()) ? "yes" : "no");
  return (
    <div className={cn(card, "p-4")}>
      <Head icon={<Truck className="size-3.5" strokeWidth={2.2} />} tone="bg-[#E3EFFB] text-[#0875D1]" title="Local delivery" />
      <form
        className="mt-3 flex gap-1.5"
        onSubmit={(e) => {
          e.preventDefault();
          check();
        }}
      >
        <input
          value={zip}
          onChange={(e) => {
            setZip(e.target.value);
            setChecked(null);
          }}
          inputMode="numeric"
          maxLength={5}
          aria-label="Postcode"
          placeholder="Postcode"
          className="min-w-0 flex-1 rounded-lg px-2.5 py-2 text-[11.5px] text-[#1B2437] ring-1 ring-[#E1E4EC] outline-none focus:ring-[1.5px] focus:ring-[#0875D1]"
        />
        <button type="submit" className="rounded-lg bg-[#0875D1] px-3 text-[11px] font-medium text-white hover:bg-[#065DA6]">
          Check
        </button>
      </form>
      {checked === "yes" && (
        <p className="mt-2 flex items-center gap-1.5 rounded-lg bg-[#E3F7EA] px-2.5 py-1.5 text-[10.5px] text-[#1F9D57]">
          <Check aria-hidden className="size-3" strokeWidth={3} /> We deliver to {zip} · $4.99 · free over $50
        </p>
      )}
      {checked === "no" && <p className="mt-2 rounded-lg bg-[#FDF1F6] px-2.5 py-1.5 text-[10.5px] text-[#C2416F]">Outside our delivery area — try store pickup.</p>}
      <p className={cn("mt-3 text-[10.5px] font-medium", ink)}>Delivery window · Thu, Nov 12</p>
      <div className={cn("mt-1.5 space-y-1.5", checked !== "yes" && "pointer-events-none opacity-40")}>
        {[
          ["Morning", "9 AM – 12 PM"],
          ["Afternoon", "12 – 4 PM"],
          ["Evening", "5 – 8 PM"],
        ].map(([n, t]) => (
          <button key={n} type="button" aria-pressed={win === n} onClick={() => setWin(n)} className={cn("flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[7px] text-left text-[11px]", win === n ? "bg-[#EEF5FD] ring-[1.5px] ring-[#0875D1]" : "ring-1 ring-[#E6E9F0]")}>
            <Radio on={win === n} />
            <span className={ink}>{n}</span>
            <span className={cn("ml-auto text-[10px]", muted)}>{t}</span>
          </button>
        ))}
      </div>
      <ActionButton className={cn("mt-3", checked !== "yes" && "pointer-events-none opacity-50")} label="Schedule delivery" done={`${win} delivery booked`} />
    </div>
  );
}

/** The original Appstle product demos (used across every version of the site), in each app's palette colour. */
function Original({ id, children }: { id: ProductId; children: ReactNode }) {
  return (
    <div style={accentVars(id)} className="relative isolate">
      {children}
    </div>
  );
}

const confetti = ["#E2628F", "#E2628F", "#F4B9D1", "#FBE3EE", "#F5B53F", "#FFD58A", "#A8325F", "#FFFFFF"];

type Place = { x: number; y: number; w: number; s: number };
export type CanvasWidget = { key: "large1" | "large2" | "small"; feature: string; node: ReactNode; place: Place };

/**
 * Per app: the ORIGINAL demo widget (large) + one more large widget + one smaller one,
 * each labelled with the part of the app it belongs to. `place` = default spot on the
 * 880-wide canvas; `height` = that app's canvas height.
 */
export const appWidgets: Record<ProductId, { label: string; height: number; items: CanvasWidget[] }> = {
  subscriptions: {
    label: "Subscription purchase options widget, gift subscriptions and customer portal",
    height: 760,
    items: [
      { key: "large1", feature: "Subscription widget", place: { x: 24, y: 48, w: 384, s: 1 }, node: <Original id="subscriptions"><SubscriptionWidgetDemo /></Original> },
      { key: "large2", feature: "Gift subscriptions", place: { x: 452, y: 96, w: 384, s: 1 }, node: <GiftWidget /> },
      { key: "small", feature: "Customer portal", place: { x: 452, y: 580, w: 360, s: 0.96 }, node: <PortalWidget /> },
    ],
  },
  memberships: {
    label: "Membership tiers, members-only collection and member pricing",
    height: 720,
    items: [
      { key: "large1", feature: "Membership tiers", place: { x: 24, y: 48, w: 384, s: 1 }, node: <Original id="memberships"><MembershipTierDemo /></Original> },
      { key: "large2", feature: "Members-only access", place: { x: 452, y: 96, w: 384, s: 1 }, node: <MembersStoreWidget /> },
      { key: "small", feature: "Member pricing", place: { x: 60, y: 500, w: 340, s: 0.96 }, node: <MemberPriceWidget /> },
    ],
  },
  loyalty: {
    label: "Points rewards, cart redemption and VIP tiers",
    height: 760,
    items: [
      {
        key: "large1",
        feature: "Points & rewards",
        place: { x: 20, y: 48, w: 512, s: 0.9 },
        node: (
          <Original id="loyalty">
            <LoyaltyPointsDemo />
            <Confetti colors={confetti} className="z-20 rounded-[1.75rem]" />
          </Original>
        ),
      },
      { key: "large2", feature: "Cart & checkout redemption", place: { x: 516, y: 110, w: 344, s: 0.98 }, node: <RedeemWidget /> },
      { key: "small", feature: "VIP tiers", place: { x: 70, y: 600, w: 340, s: 0.96 }, node: <VipWidget /> },
    ],
  },
  bundles: {
    label: "Build-a-Box bundle builder, fixed-price bundles and frequently bought together",
    height: 760,
    items: [
      { key: "large1", feature: "Build-a-Box", place: { x: 20, y: 48, w: 576, s: 0.8 }, node: <Original id="bundles"><BundleBuilderDemo /></Original> },
      { key: "large2", feature: "Fixed-price bundles", place: { x: 512, y: 110, w: 350, s: 0.98 }, node: <FixedBundleWidget /> },
      { key: "small", feature: "Frequently bought together", place: { x: 70, y: 610, w: 340, s: 0.96 }, node: <UpsellWidget /> },
    ],
  },
  pickup: {
    label: "Pickup, delivery and shipping scheduler, local delivery and pickup locations",
    height: 780,
    items: [
      {
        key: "large1",
        feature: "Pickup & delivery scheduler",
        place: { x: 20, y: 48, w: 448, s: 0.9 },
        node: (
          <Original id="pickup">
            <DeliveryLane className="mb-4" />
            <PickupSchedulerDemo />
          </Original>
        ),
      },
      { key: "large2", feature: "Local delivery", place: { x: 474, y: 96, w: 380, s: 0.98 }, node: <DeliveryZoneWidget /> },
      { key: "small", feature: "Pickup locations", place: { x: 490, y: 560, w: 340, s: 0.96 }, node: <StoresWidget /> },
    ],
  },
};
