import Image from "next/image";
import { ArrowRight, CalendarDays, Headset, MapPin, Store, type LucideIcon } from "lucide-react";
import { Doodles, type DoodleSpot } from "@/components/features/backdrops/Doodles";
import { ScrollLines } from "@/components/features/ScrollLines";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SmartLink } from "@/components/ui/SmartLink";
import { links } from "@/data/links";
import { aboutPage } from "@/data/pages/about";
import { cn } from "@/lib/cn";
import teamPhoto from "@/assets/home/hero-team.webp";

const doodleSpots: DoodleSpot[] = [
  { name: "sparkle", className: "right-[2%] -top-9 size-8 text-brand-400/55 lg:right-auto lg:left-[40%] lg:-top-3 lg:size-10", rotate: -10 },
  { name: "star", className: "hidden lg:block right-[1%] -top-14 size-9 text-ink/25", rotate: 12 },
  { name: "heart", className: "hidden lg:block left-[47%] -bottom-14 size-9 text-[#9AA3AE]", rotate: -8 },
  { name: "bolt", className: "hidden lg:block right-[1%] -bottom-15 size-10 text-brand-500/45", rotate: 6 },
];

const offices = ["Menlo Park, CA", "British Columbia", "South Asia"];

const factIcons: LucideIcon[] = [CalendarDays, MapPin, Store, Headset];

export function AboutSection() {
  const { hero, facts } = aboutPage;
  return (
    <section id="about" aria-labelledby="about-title" className="relative isolate scroll-mt-24 overflow-x-clip bg-surface py-band">
      <div className="relative mx-auto max-w-site px-5 sm:px-8 lg:px-10">
        <Doodles autoplay spots={doodleSpots} />
        <ScrollLines stops={[{ section: "#about", color: "#6FC0FA", line: { around: "[data-about-photo]" } }]} />
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="relative z-10 lg:col-span-7">
            <Reveal>
              <Eyebrow className="rounded-full bg-white px-3 py-1.5 ring-1 ring-[#D7E1EE]">About Appstle</Eyebrow>
            </Reveal>
            <h2 id="about-title" className="mt-5 text-[2.3rem] leading-[1.03] font-bold tracking-[-0.04em] text-ink sm:text-[3rem] lg:text-[3.4rem]">
              <SplitText>
                Compelling apps at <span className="text-brand">compelling prices.</span>
              </SplitText>
            </h2>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-[36rem] text-lg leading-relaxed text-ink-muted">{hero.intro}</p>
              <SmartLink href={links.about} className="hit-area group mt-4 inline-flex items-center gap-2 font-semibold text-brand hover:text-brand-500">
                Read our story
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </SmartLink>
            </Reveal>

            <Stagger className="mt-8" interval={0.06} amount={0.2}>
            <ul aria-label="Appstle at a glance" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {facts.map((f, i) => {
                const Icon = factIcons[i] ?? Store;
                const blue = i === 2;
                return (
                  <StaggerItem as="li" key={f.label}>
                  <div
                    data-spotlight={blue ? "dark" : ""}
                    data-tilt="3"
                    className={cn(
                      "group relative isolate h-full overflow-hidden rounded-2xl p-3.5 shadow-soft transition-[translate,box-shadow] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 hover:shadow-float",
                      blue ? "bg-[linear-gradient(150deg,#0A6FD1,#0058B0_70%,#003F7D)] text-white ring-1 ring-white/10" : "bg-white ring-1 ring-[#D7E1EE]",
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-7 place-items-center rounded-lg ring-1 transition-[rotate,scale] duration-500 ease-[var(--ease-spring)] group-hover:scale-110 group-hover:-rotate-8",
                        blue ? "bg-white/14 text-white ring-white/15" : "bg-brand-50 text-brand-ink ring-brand/10",
                      )}
                    >
                      <Icon className="size-3.5" strokeWidth={2.2} />
                    </span>
                    <p className={cn("mt-3 font-display text-[1.25rem] leading-none font-bold tracking-[-0.02em]", blue ? "text-white" : "text-ink")}>{f.value}</p>
                    <p className={cn("mt-1 text-xs leading-snug", blue ? "text-white/90" : "text-ink-subtle")}>{f.label}</p>
                  </div>
                  </StaggerItem>
                );
              })}
            </ul>
            </Stagger>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <figure className="group relative mx-auto max-w-[34rem]">
              <Image
                data-about-photo=""
                src={teamPhoto}
                alt="Four smiling colleagues gathered around a laptop and a tablet"
                sizes="(min-width: 1024px) 38vw, 92vw"
                className="relative h-auto w-full drop-shadow-[0_24px_30px_rgb(6_43_82/0.16)] transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
              />
              <figcaption className="absolute -top-3 left-0 flex flex-wrap gap-2 sm:-left-4">
                <span className="sr-only">Appstle offices: </span>
                {offices.map((o, i) => (
                  <span
                    key={o}
                    style={{ rotate: `${[-3, 2, -1][i]}deg` }}
                    className="hover-pop inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-soft ring-1 ring-[#D7E1EE] backdrop-blur"
                  >
                    <MapPin aria-hidden className="size-3.5 text-brand-ink" />
                    {o}
                  </span>
                ))}
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
