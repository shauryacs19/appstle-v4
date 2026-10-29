import { Headset, ShoppingBag, Store } from "lucide-react";
import { SectionLines } from "@/components/features/backdrops/SectionLines";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { links } from "@/data/links";
import { proof } from "@/data/site";

const badges = [
  { icon: ShoppingBag, label: "Built for Shopify" },
  { icon: Store, label: "Native on Shopify Plus" },
  { icon: Headset, label: `${proof.support.display} support` },
];

/** Closing banner — electric blue → periwinkle → lavender, per the 2026-10-29 section mockup. */
export function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="px-3 pb-[clamp(3.5rem,9svh,6rem)] sm:px-5 lg:px-6">
      <Reveal className="relative isolate mx-auto max-w-site overflow-clip rounded-[2rem] bg-[linear-gradient(100deg,#219BFB_0%,#4F86F8_35%,#6565F5_68%,#B9A4FC_100%)] text-white sm:rounded-[2.5rem]">
        <SectionLines variant="cta" className="z-0" />
        <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-14 text-center sm:px-10 sm:py-16 lg:py-20">
          <p className="rounded-full bg-white/18 px-3.5 py-1 text-[0.7rem] font-semibold tracking-[0.16em] text-white uppercase ring-1 ring-white/25">Ready to grow?</p>
          <h2 id="cta-title" className="font-sans mt-5 text-[2.2rem] leading-[1.08] font-extrabold tracking-[-0.04em] text-white sm:text-[3rem]">
            Ready to grow your Shopify store?
          </h2>
          <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-white/85">
            Join {proof.merchants.display} Shopify and Shopify Plus brands building repeat business with Appstle — or partner with us to bring Appstle to your
            clients.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <ButtonLink href="#products" size="lg" variant="light" className="px-6 font-medium text-[#1A6FD6]">
              Explore our apps
            </ButtonLink>
            <ButtonLink href={links.partnerProgram} size="lg" variant="outlineLight" className="px-6 font-medium">
              Become a partner
            </ButtonLink>
          </div>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[0.82rem] text-white/90">
            {badges.map((b, i) => (
              <li key={b.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden className="mr-4 hidden h-4 w-px bg-white/30 sm:block" />}
                <b.icon aria-hidden className="size-4" strokeWidth={1.9} />
                {b.label}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
