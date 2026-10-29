import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Panel } from "@/components/ui/Panel";
import { cn } from "@/lib/cn";

export function CtaBand({
  id = "get-started",
  eyebrow = "Compelling apps at compelling prices",
  title,
  body,
  actions,
  extras,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  actions: ReactNode;
  extras?: ReactNode;
  className?: string;
}) {
  return (
    <Panel
      id={id}
      labelledBy={`${id}-title`}
      className={cn("on-dark bg-[linear-gradient(100deg,#219BFB_0%,#4F86F8_35%,#6565F5_68%,#B9A4FC_100%)] text-white", className)}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <p className="rounded-full bg-white/18 px-3.5 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-white uppercase ring-1 ring-white/25">{eyebrow}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 id={`${id}-title`} className="mt-5 text-[2.2rem] leading-[1.06] text-white sm:text-[3rem]">
            {title}
          </h2>
        </Reveal>
        {body && (
          <Reveal delay={0.12}>
            <div className="mx-auto mt-4 max-w-xl text-[1.05rem] leading-relaxed text-white/85">{body}</div>
          </Reveal>
        )}
        <Reveal delay={0.18} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {actions}
        </Reveal>
        {extras && (
          <Reveal delay={0.24} className="mt-8">
            {extras}
          </Reveal>
        )}
      </div>
    </Panel>
  );
}
