import Image from "next/image";
import logo from "@/assets/brand/appstle-logo.png";
import { cn } from "@/lib/cn";

const MARK_VIEWBOX = "0 0 490 490";
const MARK_A =
  "M64.5 244.5a180 180 0 1 0 360 0a180 180 0 1 0 -360 0ZM327.9 142.2L327 127L372 147L381 345L342 375L339.6 336A132 132 0 1 1 327.9 142.2Z";
const GLOBE = { cx: 244.5, cy: 244.5, r: 66.3, stroke: 8.5, meridian: 28, parallels: [209, 244.5, 280] } as const;

function MarkGlobe({ className }: { className?: string }) {
  const { cx, cy, r, stroke, meridian, parallels } = GLOBE;
  const lines = parallels.map((y) => {
    const half = Math.sqrt(r * r - (y - cy) ** 2);
    return `M${(cx - half).toFixed(1)} ${y}H${(cx + half).toFixed(1)}`;
  });
  return (
    <g fill="none" stroke="currentColor" strokeWidth={stroke} className={className}>
      <circle cx={cx} cy={cy} r={r} />
      <ellipse cx={cx} cy={cy} rx={meridian} ry={r} />
      <path d={lines.join("")} />
    </g>
  );
}

export function AppstleMarkOutline({ className }: { className?: string }) {
  return (
    <svg viewBox={MARK_VIEWBOX} className={className} aria-hidden fill="none">
      <path d={MARK_A} stroke="currentColor" strokeWidth={5} fillRule="evenodd" />
    </svg>
  );
}

export function AppstleMark({ className, title, plain = false }: { className?: string; title?: string; plain?: boolean }) {
  return (
    <svg
      viewBox={MARK_VIEWBOX}
      className={cn("rounded-[22%]", className)}
      style={plain ? undefined : { background: "var(--gradient-brand)" }}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g opacity=".22" transform="translate(6 10)" color="#08427f">
        <path d={MARK_A} fill="currentColor" fillRule="evenodd" />
        <MarkGlobe />
      </g>
      <g color="#fff">
        <path d={MARK_A} fill="currentColor" fillRule="evenodd" />
        <MarkGlobe />
      </g>
    </svg>
  );
}

export function AppstleLogo({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  if (tone === "dark") {
    return <Image src={logo} alt="Appstle — Compelling apps at compelling prices" priority sizes="220px" className={cn("h-10 w-auto", className)} />;
  }
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <AppstleMark className="size-8 shrink-0 rounded-[8px] shadow-[0_6px_14px_-6px_rgb(1_119_242_/_0.7)]" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.32rem] font-bold tracking-[-0.03em]",
            "text-white",
          )}
        >
          Appstle
          <sup className="ml-0.5 align-super text-[0.5rem] font-semibold tracking-normal opacity-70">SM</sup>
        </span>
        <span
          className={cn(
            "mt-1 hidden text-[0.62rem] font-medium tracking-[0.01em] sm:block lg:hidden xl:block",
            "text-white/70",
          )}
        >
          Compelling apps at compelling prices
        </span>
      </span>
    </span>
  );
}

/** Appstle app tile in the hero's glossy 3D style (blue face, darker depth edge, white mark). */
export function AppstleBadge({ className, markClassName, title }: { className?: string; markClassName?: string; title?: string }) {
  return (
    <span className={cn("relative inline-block shrink-0", className)}>
      <span aria-hidden className="absolute inset-0 translate-x-[6%] translate-y-[8%] rounded-[26%] bg-[#0B57B8]" />
      <span className="absolute inset-0 rounded-[26%] bg-[linear-gradient(150deg,#46ADFF_0%,#1C86F4_50%,#0E6BDC_100%)] shadow-[0_14px_28px_-12px_rgb(14_90_200/0.55)]">
        <span aria-hidden className="absolute inset-[3%] rounded-[24%] bg-[linear-gradient(180deg,rgb(255_255_255/0.35)_0%,rgb(255_255_255/0)_45%)]" />
        <AppstleMark plain title={title} className={cn("absolute top-[16%] left-[16%] h-[68%] w-[68%] rounded-none", markClassName)} />
      </span>
    </span>
  );
}
