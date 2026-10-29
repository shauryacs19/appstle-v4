import type { ComponentProps, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SmartLink } from "@/components/ui/SmartLink";
import { BtnArrow } from "@/components/ui/BtnArrow";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "dark" | "ghost" | "light" | "outlineLight";
type Size = "sm" | "md" | "lg";

const base =
  "group/btn inline-flex select-none items-center justify-center gap-[0.3em] whitespace-nowrap rounded-xl font-normal [&_strong]:font-bold duration-300 hover:-translate-y-0.5 active:translate-y-px";

const variants: Record<Variant, string> = {
  primary: "bg-[#1A84F5] text-white shadow-[0_8px_18px_-10px_rgb(18_121_238/0.7)] hover:bg-[#0875D1] [&_.btn-arrow]:text-white/85",
  dark: "bg-brand-900 text-white hover:bg-brand-800 [&_.btn-arrow]:text-brand-300",
  secondary: "bg-brand-50 text-brand hover:bg-brand-100 [&_.btn-arrow]:text-brand",
  ghost: "text-ink hover:bg-surface-2 hover:shadow-[0_10px_22px_-14px_rgb(6_43_82/0.35)] [&_.btn-arrow]:text-brand",
  outlineLight: "text-white ring-1 ring-white/60 hover:bg-white/12 [&_.btn-arrow]:text-white/85",
  light: "btn-shine bg-white text-brand shadow-[0_6px_16px_-8px_rgb(0_40_90/0.5)] hover:bg-brand-50 hover:shadow-[0_14px_26px_-12px_rgb(0_40_90/0.6)] [&_.btn-arrow]:text-brand-500",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-[15px] text-[15px]",
  md: "h-[46px] px-[18px] text-base",
  lg: "h-[52px] px-[22px] text-[1.05rem]",
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  arrow = true,
  icon,
  className,
  children,
  ...props
}: { variant?: Variant; size?: Size; arrow?: boolean; icon?: "arrow" | "external" | "none"; children: ReactNode } & Omit<ComponentProps<typeof SmartLink>, "children">) {
  const showArrow = icon ? icon !== "none" : arrow;
  return (
    <SmartLink data-magnetic="" className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {showArrow && <BtnArrow />}
    </SmartLink>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  icon = "none",
  className,
  children,
  type = "button",
  ...props
}: { variant?: Variant; size?: Size; icon?: "arrow" | "external" | "none"; children: ReactNode } & Omit<ComponentProps<"button">, "children">) {
  return (
    <button type={type} className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
      {icon !== "none" && <BtnArrow />}
    </button>
  );
}

export function TextLink({ className, children, external, ...props }: ComponentProps<"a"> & { external?: boolean }) {
  const Cmp = external ? ArrowUpRight : ArrowRight;
  return (
    <a
      className={cn(
        "group/link inline-flex items-center gap-1.5 font-semibold text-brand underline decoration-current/0 decoration-2 underline-offset-4 transition-colors hover:decoration-current/40",
        className,
      )}
      {...props}
    >
      {children}
      <Cmp aria-hidden className="size-4 transition-transform duration-300 group-hover/link:translate-x-0.5" />
    </a>
  );
}
