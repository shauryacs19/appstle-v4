import { Crown, Gift, PackagePlus, Repeat2, Store } from "lucide-react";
import type { ProductId } from "@/data/products";
import { cn } from "@/lib/cn";

const icons = { subscriptions: Repeat2, memberships: Crown, loyalty: Gift, bundles: PackagePlus, pickup: Store } as const;

export function ProductIcon({ id, className, size = "md" }: { id: ProductId; className?: string; size?: "sm" | "md" | "lg" }) {
  const Icon = icons[id];
  return (
    <span
      aria-hidden
      className={cn(
        "inline-grid shrink-0 place-items-center bg-brand-50 text-brand ring-1 ring-brand/10",
        size === "sm" && "size-7 rounded-lg",
        size === "md" && "size-10 rounded-xl",
        size === "lg" && "size-12 rounded-2xl",
        className,
      )}
    >
      <Icon className={cn(size === "sm" ? "size-4" : size === "md" ? "size-5" : "size-6")} strokeWidth={2.1} />
    </span>
  );
}
