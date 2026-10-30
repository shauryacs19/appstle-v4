import { Crown, Gift, PackagePlus, Repeat2, Store } from "lucide-react";
import type { ProductId } from "@/data/products";
import { cn } from "@/lib/cn";

const icons = { subscriptions: Repeat2, memberships: Crown, loyalty: Gift, bundles: PackagePlus, pickup: Store } as const;

const tones = {
  blue: "bg-[linear-gradient(150deg,#3AA8FC_0%,#1088F6_46%,#0A6FD1_100%)] text-white ring-1 ring-white/25 shadow-[0_2px_6px_rgb(6_43_82/0.08),0_22px_44px_-16px_rgb(16_136_246/0.6)]",
  white: "bg-white text-brand-ink ring-1 ring-[#D7E1EE] shadow-[0_1px_2px_rgb(6_43_82/0.05),0_20px_40px_-18px_rgb(6_43_82/0.3)]",
} as const;

export function AppTile({ id, tone = "blue", className }: { id: ProductId; tone?: keyof typeof tones; className?: string }) {
  const Icon = icons[id];
  return (
    <div className={cn("relative grid size-20 place-items-center overflow-hidden rounded-[30%]", tones[tone], className)}>
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 top-0 h-1/2 bg-linear-to-b to-transparent",
          tone === "blue" ? "from-white/28" : "from-[#EEF7FE]",
        )}
      />
      <span aria-hidden className={cn("absolute -right-1/4 -bottom-1/4 size-3/4 rounded-full", tone === "blue" ? "bg-[#0052A3]/25" : "bg-brand-50/70")} />
      <Icon className="relative size-[44%]" strokeWidth={1.9} />
    </div>
  );
}
