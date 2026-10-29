import { cn } from "@/lib/cn";

const SPARKLE = "M12 0c.6 6.2 5.8 11.4 12 12-6.2.6-11.4 5.8-12 12-.6-6.2-5.8-11.4-12-12C6.2 11.4 11.4 6.2 12 0Z";

/**
 * Site-wide hero background (2026-10-29 reference): warm cream base with soft lavender,
 * electric-blue and blush washes, plus two small sparkles. Pass `accent` to tint the
 * top-right wash with a product colour (any CSS colour, e.g. "rgb(101 101 245 / 0.4)").
 */
export function HeroWash({ className, accent, sparkles = true, variant = "page" }: { className?: string; accent?: string; sparkles?: boolean; variant?: "home" | "page" }) {
  const home = variant === "home";
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(180deg,#000_0%,#000_72%,transparent_100%)]", className)}>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#FDF6EC_0%,#FCF5EE_60%,rgb(251_244_242/0)_100%)]" />
      <div
        className="absolute -top-[22%] right-[-12%] h-[72%] w-[56%] rounded-full blur-2xl"
        style={{ background: `radial-gradient(closest-side, ${accent ?? "rgb(197 178 255 / 0.55)"}, rgb(176 210 255 / 0.32) 55%, transparent)` }}
      />
      <div className="absolute top-[-10%] right-[-6%] h-[46%] w-[34%] rounded-full bg-[radial-gradient(closest-side,rgb(150_196_255/0.5),transparent)] blur-3xl" />
      <div className="absolute bottom-[-32%] left-[-18%] h-[75%] w-[42%] rounded-full bg-[radial-gradient(closest-side,rgb(150_190_255/0.6),rgb(176_210_255/0.35)_60%,transparent)] blur-xl" />
      <div className="absolute right-[-8%] bottom-[-30%] h-[60%] w-[40%] rounded-full bg-[radial-gradient(closest-side,rgb(197_178_255/0.5),rgb(244_185_209/0.3)_60%,transparent)] blur-2xl" />
      {sparkles && (
        <>
          <svg className={cn("absolute size-6 text-[#BFC8F5] max-lg:hidden", home ? "top-[13%] left-[63%]" : "top-[16%] left-[60%]")} viewBox="0 0 24 24">
            <path d={SPARKLE} fill="currentColor" />
          </svg>
          <svg className={cn("absolute size-4 text-[#F4B9D1] max-lg:hidden", home ? "top-[63%] left-[43%]" : "top-[86%] left-[54%]")} viewBox="0 0 24 24">
            <path d={SPARKLE} fill="currentColor" />
          </svg>
        </>
      )}
    </div>
  );
}
