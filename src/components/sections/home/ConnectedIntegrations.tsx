"use client";

import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { CreditCard, Gift, Headset, Languages, LayoutTemplate, Mail, ShoppingBag, Star, Workflow, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { AppstleMark } from "@/components/brand/AppstleLogo";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { integrationGroups, integrations, shopifySurfaces, type Integration } from "@/data/integrations";
import { links } from "@/data/links";
import { products, type ProductId } from "@/data/products";
import { useHydrated } from "@/hooks/useHydrated";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const icons: Record<string, LucideIcon> = { Mail, Star, Headset, Gift, Workflow, LayoutTemplate, Languages, CreditCard, ShoppingBag };

type TileItem = Pick<Integration, "name" | "logo">;
type Group = { title: string; icon: string; blurb: string; items: readonly TileItem[] };

const productGroupDefs: (Omit<Group, "items"> & { cats: Integration["category"][] })[] = [
  { title: "Email & SMS marketing", icon: "Mail", blurb: "Flows and campaigns for shoppers", cats: ["Email & SMS"] },
  { title: "Reviews", icon: "Star", blurb: "Social proof on every product", cats: ["Reviews"] },
  { title: "Customer support", icon: "Headset", blurb: "Helpdesk for every ticket", cats: ["Support"] },
  { title: "Translation", icon: "Languages", blurb: "Your storefront in every language", cats: ["Translation"] },
  { title: "Loyalty & referrals", icon: "Gift", blurb: "Rewards and affiliate programs", cats: ["Loyalty & referrals"] },
  { title: "Automation", icon: "Workflow", blurb: "Workflows across your stack", cats: ["Automation"] },
  { title: "Storefront & upsells", icon: "LayoutTemplate", blurb: "Pages, funnels and offers", cats: ["Storefront & pages", "Upsell & pricing"] },
  { title: "Payments", icon: "CreditCard", blurb: "Billing beyond Shopify Payments", cats: ["Payments"] },
];

const NATIVE = "Built into Shopify";

function groupsFor(product: ProductId | null): readonly Group[] {
  if (!product) return integrationGroups;
  const listed = integrations.filter((i) => i.listedOn.includes(product));
  const groups = productGroupDefs
    .map(({ cats, ...g }) => ({ ...g, items: listed.filter((i) => cats.includes(i.category)) }))
    .filter((g) => g.items.length);
  if (groups.length) return groups;
  return [{ title: NATIVE, icon: "ShoppingBag", blurb: "Works natively, no extra apps", items: shopifySurfaces[product].map((name) => ({ name })) }];
}

function Tile({ item, i, side, progress, still }: { item: TileItem; i: number; side: number; progress: MotionValue<number>; still: boolean }) {
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
      initial={still ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.35, ease: ease.out }}
      className={cn(
        "group/tile relative grid h-[3.9rem] place-items-center rounded-xl bg-white ring-1 ring-[#DCE5F0] shadow-[0_1px_2px_rgb(6_43_82/0.05)] transition-[box-shadow,translate] duration-300 hover:-translate-y-1 hover:shadow-[0_14px_26px_-14px_rgb(6_43_82/0.4)] hover:ring-brand/35",
        !item.logo ? "w-auto px-3" : wide ? "w-[6.6rem]" : "w-[4.6rem]",
      )}
    >
      {item.logo ? (
        <span className="absolute inset-2">
          <Image src={item.logo} alt={item.name} title={item.name} fill sizes="100px" className="object-contain" />
        </span>
      ) : (
        <span className="text-xs font-semibold text-ink">{item.name}</span>
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
  group: Group;
  index: number;
  side: -1 | 1;
  progress: MotionValue<number>;
  still: boolean;
  active: boolean;
  onHover: (i: number | null) => void;
}) {
  const Icon = icons[group.icon];
  return (
    <Reveal delay={0.08 * (index % 3)} className="h-full min-w-0">
      <article
        data-int-card={index}
        data-int-title={group.title}
        data-side={side < 0 ? "left" : "right"}
        onPointerEnter={() => onHover(index)}
        onPointerLeave={() => onHover(null)}
        className={cn(
          "relative h-full rounded-[1.4rem] bg-white p-4 ring-1 transition-[box-shadow,translate,--tw-ring-color] duration-500 sm:p-5",
          active ? "-translate-y-1 shadow-card ring-brand/35" : "shadow-soft ring-[#D7E1EE]",
        )}
      >
        <div className="flex items-center gap-2.5">
          <span className={cn("grid size-9 place-items-center rounded-xl transition-colors duration-500", active ? "bg-brand text-white" : "bg-brand-50 text-brand-ink")}>
            <Icon aria-hidden className="size-[18px]" strokeWidth={2.1} />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-[1.05rem] leading-tight font-bold text-ink">{group.title}</h3>
            <p className="text-sm text-ink-muted">{group.blurb}</p>
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

function Column({
  groups,
  offset,
  side,
  fill,
  progress,
  still,
  active,
  onHover,
}: {
  groups: readonly Group[];
  offset: number;
  side: -1 | 1;
  fill: boolean;
  progress: MotionValue<number>;
  still: boolean;
  active: number | null;
  onHover: (i: number | null) => void;
}) {
  return (
    <div className={cn("contents lg:row-start-1 lg:flex lg:flex-col lg:justify-center lg:gap-5", side < 0 ? "lg:col-start-1" : "lg:col-start-3")}>
      <AnimatePresence mode="popLayout" initial={false}>
        {groups.map((g, k) => (
          <motion.div
            key={g.title}
            layout={!still}
            layoutId={still ? undefined : `int-${g.title}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, ease: ease.out }}
            className={cn("relative min-w-0", fill && "lg:flex-1")}
          >
            <GroupCard group={g} index={offset + k} side={side} progress={progress} still={still} active={active === offset + k} onHover={onHover} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function Hub({ product, onSelect }: { product: ProductId | null; onSelect: (id: ProductId | null) => void }) {
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
          {product ? (
            <button
              type="button"
              onClick={() => onSelect(null)}
              className="absolute top-full mt-2 rounded-full px-2 py-0.5 text-sm font-semibold whitespace-nowrap text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Show all apps
            </button>
          ) : (
            <span className="absolute top-full mt-2 font-display text-sm font-bold whitespace-nowrap text-ink">Appstle apps</span>
          )}
        </div>
      </div>
      <ul aria-label="Filter integrations by app" className="absolute inset-0">
        {products.map((p, i) => {
          const on = product === p.id;
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
                <button
                  type="button"
                  aria-pressed={on}
                  title={`Show ${p.shortName} integrations`}
                  onClick={() => onSelect(on ? null : p.id)}
                  className={cn(
                    "flex cursor-pointer items-center gap-1.5 rounded-full py-1 pr-2.5 pl-1 shadow-soft ring-1 transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                    on ? "bg-brand ring-brand" : "bg-white ring-[#D7E1EE] hover:ring-brand/40",
                  )}
                >
                  <ProductIcon id={p.id} size="sm" className={cn("size-6 rounded-full", on && "bg-white/20 text-white ring-0")} />
                  <span className={cn("text-xs font-semibold whitespace-nowrap", on ? "text-white" : "text-ink")}>{p.shortName.split(" &")[0]}</span>
                </button>
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

function useLinePaths(stage: RefObject<HTMLDivElement | null>, layoutKey: string) {
  const [paths, setPaths] = useState<Path[]>([]);
  const [drawn, setDrawn] = useState(false);
  const measureRef = useRef<() => void>(() => {});
  const keyRef = useRef(layoutKey);
  const first = useRef(true);
  useEffect(() => {
    keyRef.current = layoutKey;
  }, [layoutKey]);
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
      const keep = new Set(keyRef.current.split("|"));
      const next = [...el.querySelectorAll<HTMLElement>("[data-int-card]")]
        .filter((card) => keep.has(card.dataset.intTitle ?? ""))
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
    measureRef.current = measure;
    measure();
    setDrawn(true);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    mq.addEventListener("change", measure);
    document.fonts?.ready.then(measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
    };
  }, [stage]);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setDrawn(false);
    let raf = 0;
    const t = setTimeout(() => {
      measureRef.current();
      raf = requestAnimationFrame(() => {
        raf = requestAnimationFrame(() => setDrawn(true));
      });
    }, 600);
    return () => {
      clearTimeout(t);
      cancelAnimationFrame(raf);
    };
  }, [layoutKey]);
  return { paths, drawn };
}

export function ConnectedIntegrations() {
  const stage = useRef<HTMLDivElement>(null);
  const mounted = useHydrated();
  const reduce = !!useReducedMotion() && mounted;
  const inView = useInView(stage, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "start 0.4"] });
  const [active, setActive] = useState<number | null>(null);
  const [product, setProduct] = useState<ProductId | null>(null);
  const groups = groupsFor(product);
  const { paths, drawn } = useLinePaths(stage, groups.map((g) => g.title).join("|"));
  const selected = product ? products.find((p) => p.id === product)! : null;
  const native = groups[0]?.title === NATIVE;
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  const split = Math.ceil(groups.length / 2);
  const left = groups.slice(0, split);
  const right = groups.slice(split);
  const tall = split >= 3;
  const select = (id: ProductId | null) => {
    setActive(null);
    setProduct(id);
  };

  return (
    <section id="integrations" aria-labelledby="int-title" className="int-stage relative overflow-x-clip py-band">
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
            <p className="mt-3 text-sm font-medium text-ink-subtle">Pick an app in the ring to see its integrations.</p>
          </Reveal>
        </div>

        <div
          ref={stage}
          className="relative mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(17rem,21rem)_minmax(0,1fr)] lg:gap-x-[clamp(3rem,6vw,6rem)] lg:gap-y-5"
        >
          <svg
            aria-hidden
            data-on={inView && drawn ? "" : undefined}
            className="int-lines pointer-events-none absolute inset-0 hidden size-full overflow-visible lg:block"
          >
            {paths.map((p, i) => {
              const on = active === i || !!product;
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
            className="relative mb-4 sm:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-start-1 lg:mb-0 lg:self-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 1.2, ease: ease.out }}
          >
            <Hub product={product} onSelect={select} />
            <p aria-live="polite" className="mt-10 min-h-5 text-center text-sm text-ink-muted lg:mt-6">
              {selected &&
                (native
                  ? `${selected.shortName} works natively inside Shopify`
                  : `${total} integration${total === 1 ? "" : "s"} across ${groups.length} categories for ${selected.shortName}`)}
            </p>
          </motion.div>

          <LayoutGroup id="int-groups">
            <Column groups={left} offset={0} side={-1} fill={tall} progress={scrollYProgress} still={reduce} active={active} onHover={setActive} />
            <Column groups={right} offset={split} side={1} fill={tall && right.length === split} progress={scrollYProgress} still={reduce} active={active} onHover={setActive} />
          </LayoutGroup>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-12 flex max-w-3xl flex-col items-center gap-5 text-center">
          <div className="flex flex-wrap justify-center gap-2.5">
            <SmartLink
              href={links.appPartners}
              className="inline-flex h-[46px] items-center rounded-[10px] bg-brand px-[18px] font-semibold text-white transition-colors hover:bg-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              See all app partners
            </SmartLink>
            <SmartLink
              href={links.contact}
              className="inline-flex h-[46px] items-center rounded-[10px] bg-navy px-[18px] font-semibold text-white transition-colors hover:bg-navy-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Request an integration
            </SmartLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
