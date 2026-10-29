import Image from "next/image";
import { SectionLines } from "@/components/features/backdrops/SectionLines";
import { Quote } from "lucide-react";
import { ReviewWall } from "@/components/features/ReviewWall";
import { Reveal } from "@/components/motion/Reveal";
import { SplitText } from "@/components/motion/SplitText";
import { Stars } from "@/components/ui/Stars";
import { ButtonLink } from "@/components/ui/Button";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { links } from "@/data/links";
import { productById, products } from "@/data/products";
import { proof } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import { formatNumber } from "@/lib/cn";
import { SmartLink } from "@/components/ui/SmartLink";

const featured = testimonials.find((t) => t.merchant === "Wick & Jane")!;
const rest = testimonials.filter((t) => t !== featured);

export function TestimonialsSection() {
  return (
    <section id="stories" data-line-host="" aria-labelledby="stories-title" className="relative isolate overflow-x-clip py-[clamp(4rem,10svh,7rem)]">
      <SectionLines variant="reviews" />
      <div className="mx-auto max-w-site px-5 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Loved by merchants</Eyebrow>
          </Reveal>
          <h2 id="stories-title" className="mt-4 text-[2.2rem] text-ink sm:text-[3rem]">
            <SplitText>
              In their <span className="text-brand">own words.</span>
            </SplitText>
          </h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <figure className="relative isolate flex h-full flex-col justify-between overflow-hidden rounded-[1.75rem] bg-cobalt-50 p-7 ring-1 ring-cobalt-100 sm:p-9">
              <Quote aria-hidden className="absolute -top-2 right-6 size-28 text-cobalt-200/70" strokeWidth={1.4} />
              <div>
                <Stars />
                <blockquote data-serif="" className="mt-5 text-[1.45rem] leading-[1.35] text-[#13294B] italic sm:text-[1.8rem]">
                  “{featured.quote}”
                </blockquote>
              </div>
              <figcaption className="mt-8 flex items-center gap-3">
                <span className="grid size-12 place-items-center rounded-full bg-white ring-1 ring-cobalt-100">
                  <Image src={featured.logo} alt="" sizes="48px" className="max-h-8 w-auto max-w-9 object-contain" />
                </span>
                <span>
                  <span className="block font-semibold text-[#13294B]">{featured.merchant}</span>
                  <span className="block text-sm text-ink-muted">{productById[featured.product].name} · review on appstle.com</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white p-6 ring-1 ring-[#ECE8F2] sm:p-7">
              <div className="flex items-end gap-3">
                <span className="font-display text-[3.2rem] leading-none font-bold tracking-[-0.04em] text-ink">5.0</span>
                <div className="pb-1">
                  <Stars />
                  <p className="mt-1 text-sm text-ink-muted">
                    from <strong className="font-semibold text-ink">{proof.reviews.display}</strong> merchant reviews
                  </p>
                </div>
              </div>
              <ul className="mt-6 divide-y divide-line border-t border-line">
                {products.map((p) => (
                  <li key={p.id}>
                    <SmartLink
                      href={`${p.installHref}/reviews`}
                      className="group flex items-center gap-3 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    >
                      <ProductIcon id={p.id} size="sm" />
                      <span className="min-w-0 flex-1 truncate text-[0.92rem] font-semibold text-ink group-hover:text-brand">{p.shortName}</span>
                      <span className="flex items-center gap-1.5 text-sm text-ink-muted">
                        <Stars value={p.rating.value} className="hidden sm:inline-flex [&>span]:size-3 [&_svg]:size-3" />
                        <strong className="font-semibold text-ink">{p.rating.value.toFixed(1)}</strong>
                        <span className="tabular-nums">({formatNumber(p.rating.count)})</span>
                      </span>
                    </SmartLink>
                  </li>
                ))}
              </ul>
              <p className="mt-auto pt-4 text-xs text-ink-subtle">Shopify App Store ratings and review counts.</p>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-8" amount={0.1}>
        <ReviewWall items={rest} />
      </Reveal>
      <div className="mt-10 flex flex-wrap justify-center gap-3 px-5">
        <ButtonLink href={`${productById.subscriptions.installHref}/reviews`}>Read all reviews</ButtonLink>
        <ButtonLink href={links.caseStudies} variant="ghost" className="bg-white ring-1 ring-[#DCE3EE] hover:ring-[#9CC8FB]">
          Case studies
        </ButtonLink>
      </div>
    </section>
  );
}
