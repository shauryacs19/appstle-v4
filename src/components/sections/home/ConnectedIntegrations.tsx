"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ArrowRight, Gift, Headset, LayoutTemplate, Mail, Star, Workflow, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { AppstleMark } from "@/components/brand/AppstleLogo";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { ButtonLink } from "@/components/ui/Button";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { integrationGroups, type Integration } from "@/data/integrations";
import { links } from "@/data/links";
import { products } from "@/data/products";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const rows = ["lg:row-start-1", "lg:row-start-2", "lg:row-start-3"];
const icons: Record<string, LucideIcon> = { Mail, Star, Headset, Gift, Workflow, LayoutTemplate };

function Tile({ item, i, side, progress, still }: { item: Integration; i: number; side: number; progress: MotionValue<number>; still: boolean }) {
  const sx = side * (18 + ((i * 29) % 3) * 16);
  const sy = 46 + ((i * 17) % 3) * 22;
  const sr = (((i * 53) % 7) - 3) * 4;
  const x = useTransform(progress, [0, 1], [sx, 0]);
  const y = useTransform(progress, [0, 1], [sy, 0]);
  const rotate = useTransform(progress, [0, 1], [sr, 0]);
  const wide = item.logo && item.logo.width / item.logo.height > 1.6;
  return (
    <motion.li
      style={still ? undefined : { x, y, rotate }}
      className={cn(
        "group/tile relative grid h-[3.9rem] place-items-center rounded-xl bg-white ring-1 ring-[#DCE5F0] shadow-[0_1px_2px_rgb(6_43_82/0.05)] transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_26px_-14px_rgb(6_43_82/0.4)] hover:ring-brand/35",
        wide ? "w-[6.6rem]" : "w-[4.6rem]",
      )}
    >
      {item.logo ? (
        <span className="absolute inset-2">
          <Image src={item.logo} alt={item.name} title={item.name} fill sizes="100px" className="object-contain" />
        </span>
      ) : (
        <span className="text-[11px] font-semibold text-ink">{item.name}</span>
      )}
    </motion.li>
  );
}

function GroupCard({
  group,
  index,
  side,
  progress,
  still,
  active,
  onHover,
}: {
  group: (typeof integrationGroups)[number];
  index: number;
  side: -1 | 1;
  progress: MotionValue<number>;
  still: boolean;
  active: boolean;
  onHover: (i: number | null) => void;
}) {
  const Icon = icons[group.icon];
  return (
    <Reveal delay={0.08 * (index % 3)} className="min-w-0">
      <article
        data-int-card={index}
        data-side={side < 0 ? "left" : "right"}
        onPointerEnter={() => onHover(index)}
        onPointerLeave={() => onHover(null)}
        className={cn(
          "relative h-full rounded-[1.4rem] bg-white p-4 ring-1 transition-[box-shadow,translate,--tw-ring-color] duration-500 sm:p-5",
          active ? "-translate-y-1 shadow-card ring-brand/35" : "shadow-soft ring-[#D7E1EE]",
        )}
      >
        <div className="flex items-center gap-2.5">
          <span className={cn("grid size-9 place-items-center rounded-xl transition-colors duration-500", active ? "bg-brand text-white" : "bg-brand-50 text-brand")}>
            <Icon aria-hidden className="size-[18px]" strokeWidth={2.1} />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-[1.05rem] leading-tight font-bold text-ink">{group.title}</h3>
            <p className="text-[0.8rem] text-ink-muted">{group.blurb}</p>
          </div>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${group.title} integrations`}>
          {group.items.map((item, n) => (
            <Tile key={item.name} item={item} i={index * 3 + n} side={side} progress={progress} still={still} />
          ))}
        </ul>
      </article>
    </Reveal>
  );
}

function Hub() {
  const n = products.length;
  return (
    <div data-int-hub className="relative mx-auto aspect-square w-full max-w-[19rem] lg:max-w-none">
      <div aria-hidden className="absolute inset-[6%] rounded-full border border-brand/15" />
      <div aria-hidden className="absolute inset-[22%] rounded-full border border-brand/20 bg-white/60" />
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[orbit_70s_linear_infinite]">
        <circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-brand)" strokeOpacity=".35" strokeWidth=".35" strokeDasharray="1 2.2" />
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="relative grid place-items-center">
          <span aria-hidden className="absolute size-24 animate-[pulse-ring_3.2s_var(--ease-smooth)_infinite] rounded-[1.8rem] bg-brand/25" />
          <AppstleMark title="Appstle" className="relative size-[5.5rem] rounded-[1.6rem] shadow-glow" />
          <span className="absolute top-full mt-2 font-display text-sm font-bold whitespace-nowrap text-ink">Appstle apps</span>
        </div>
      </div>
      <ul aria-label="Appstle apps" className="absolute inset-0">
        {products.map((p, i) => {
          const a = (-90 + (360 / n) * i) * (Math.PI / 180);
          const style = {
            left: `${50 + 44 * Math.cos(a)}%`,
            top: `${50 + 44 * Math.sin(a)}%`,
            "--fd": `${7 + i * 0.9}s`,
            "--fy": "5px",
            "--fdl": `${i * 0.4}s`,
          } as CSSProperties;
          return (
            <li key={p.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={style}>
              <div className="hero-float">
                <SmartLink
                  href={p.href}
                  title={p.name}
                  className="flex items-center gap-1.5 rounded-full bg-white py-1 pr-2.5 pl-1 shadow-soft ring-1 ring-[#D7E1EE] transition hover:-translate-y-0.5 hover:ring-brand/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <ProductIcon id={p.id} size="sm" className="size-6 rounded-full" />
                  <span className="text-[11.5px] font-semibold whitespace-nowrap text-ink">{p.shortName.split(" &")[0]}</span>
                </SmartLink>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type Path = { d: string; ax: number; ay: number; ex: number; ey: number };

function offsetIn(el: HTMLElement, stage: HTMLElement) {
  let x = 0;
  let y = 0;
  let n: HTMLElement | null = el;
  while (n && n !== stage) {
    x += n.offsetLeft;
    y += n.offsetTop;
    n = n.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

function useLinePaths(stage: RefObject<HTMLDivElement | null>) {
  const [paths, setPaths] = useState<Path[]>([]);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const mq = matchMedia("(min-width: 1024px)");
    const measure = () => {
      if (!mq.matches) return setPaths([]);
      const hub = el.querySelector<HTMLElement>("[data-int-hub]");
      if (!hub) return;
      const h = offsetIn(hub, el);
      const cx = h.x + hub.offsetWidth / 2;
      const cy = h.y + hub.offsetHeight / 2;
      const r = hub.offsetWidth * 0.44;
      const next = [...el.querySelectorAll<HTMLElement>("[data-int-card]")]
        .sort((a, b) => Number(a.dataset.intCard) - Number(b.dataset.intCard))
        .map((card) => {
          const o = offsetIn(card, el);
          const left = card.dataset.side === "left";
          const ax = left ? o.x + card.offsetWidth : o.x;
          const ay = o.y + card.offsetHeight / 2;
          const ang = Math.atan2(ay - cy, ax - cx);
          const ex = cx + r * Math.cos(ang);
          const ey = cy + r * Math.sin(ang);
          const dx = (ex - ax) * 0.55;
          return { d: `M${ax} ${ay} C${ax + dx} ${ay} ${ex - dx * 0.4} ${ey} ${ex} ${ey}`, ax, ay, ex, ey };
        });
      setPaths(next);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    mq.addEventListener("change", measure);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, [stage]);
  return paths;
}

export function ConnectedIntegrations() {
  const stage = useRef<HTMLDivElement>(null);
  const mounted = useHydrated();
  const reduce = !!useReducedMotion() && mounted;
  const inView = useInView(stage, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "start 0.4"] });
  const paths = useLinePaths(stage);
  const [active, setActive] = useState<number | null>(null);
  const left = integrationGroups.slice(0, 3);
  const right = integrationGroups.slice(3);

  return (
    <section id="integrations" aria-labelledby="int-title" className="int-stage relative overflow-x-clip py-[clamp(4rem,10svh,7rem)]">
      <div className="mx-auto max-w-site px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow className="rounded-full bg-white/80 px-3 py-1.5 ring-1 ring-[#D7E1EE]">Integrations</Eyebrow>
          </Reveal>
          <h2 id="int-title" className="mt-5 text-[2.3rem] leading-[1.02] font-bold tracking-[-0.04em] text-ink sm:text-[3.2rem] lg:text-[clamp(2.8rem,4vw,3.9rem)]">
            <SplitText delay={0.05}>
              Everything connects. <span className="text-brand">Your business grows.</span>
            </SplitText>
          </h2>
          <Reveal delay={0.1}>
            <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">Connect Appstle with the email, reviews, support and automation tools your store already runs on.</p>
          </Reveal>
        </div>

        <div
          ref={stage}
          className="relative mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,21rem)_minmax(0,1fr)] lg:gap-x-[clamp(3rem,6vw,6rem)] lg:gap-y-5"
        >
          <svg
            aria-hidden
            data-on={inView ? "" : undefined}
            className="int-lines pointer-events-none absolute inset-0 hidden size-full overflow-visible lg:block"
          >
            {paths.map((p, i) => {
              const on = active === i;
              return (
                <g key={i}>
                  <path d={p.d} pathLength={100} fill="none" stroke="var(--color-brand)" strokeOpacity={on ? 0.75 : 0.28} strokeWidth={on ? 2 : 1.5} className="int-line" />
                  {!reduce && (
                    <path
                      d={p.d}
                      pathLength={100}
                      fill="none"
                      stroke="var(--color-brand)"
                      strokeWidth={on ? 3.5 : 2.5}
                      strokeLinecap="round"
                      className="int-pulse"
                      data-rev={i % 2 ? "" : undefined}
                      style={{ "--pd": `${on ? 1.6 : 3.4 + (i % 3) * 0.5}s`, "--pdl": `${i * 0.45}s` } as CSSProperties}
                    />
                  )}
                  <circle cx={p.ax} cy={p.ay} r={4} fill="#fff" stroke="var(--color-brand)" strokeWidth={1.5} />
                  <circle cx={p.ex} cy={p.ey} r={2.5} fill="var(--color-brand)" />
                </g>
              );
            })}
          </svg>

          <motion.div
            className="relative mb-4 sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mb-0 lg:self-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1.2, ease: ease.out }}
          >
            <Hub />
          </motion.div>

          {left.map((g, i) => (
            <div key={g.title} className={cn("relative lg:col-start-1", rows[i])}>
              <GroupCard group={g} index={i} side={-1} progress={scrollYProgress} still={reduce} active={active === i} onHover={setActive} />
            </div>
          ))}
          {right.map((g, i) => (
            <div key={g.title} className={cn("relative lg:col-start-3", rows[i])}>
              <GroupCard group={g} index={i + 3} side={1} progress={scrollYProgress} still={reduce} active={active === i + 3} onHover={setActive} />
            </div>
          ))}
        </div>

        <Reveal delay={0.1} className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 text-center">
          <div className="flex flex-wrap justify-center gap-2.5">
            <ButtonLink href={links.appPartners} variant="primary" size="md">
              See all <strong>app partners</strong>
            </ButtonLink>
            <SmartLink
              href={links.contact}
              className="group inline-flex h-[46px] items-center gap-2 rounded-[10px] bg-white px-[18px] font-semibold text-brand ring-1 ring-[#D3DDEA] transition hover:ring-brand/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Request an integration
              <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
            </SmartLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
