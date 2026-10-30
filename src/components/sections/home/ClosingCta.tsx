import { AppstleMark } from "@/components/brand/AppstleLogo";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { ProductIcon } from "@/components/ui/ProductIcon";
import { links } from "@/data/links";
import { products } from "@/data/products";
import { proof } from "@/data/site";

export function ClosingCta() {
  return (
    <section aria-labelledby="cta-title" className="bg-[#F7F9FC] px-3 pb-[clamp(3.5rem,9svh,6rem)] sm:px-5 lg:px-6">
      <Reveal className="relative isolate mx-auto max-w-site overflow-clip rounded-[2rem] bg-[linear-gradient(140deg,#1F96FB_0%,#1088F6_35%,#0A6FD1_70%,#0052A3_100%)] text-white shadow-[0_30px_70px_-30px_rgb(1_82_163/0.7)] sm:rounded-[2.5rem]">
        <div aria-hidden className="absolute inset-0 -z-10 bg-dots opacity-25 [mask-image:radial-gradient(ellipse_at_right,#000,transparent_65%)]" />
        <div aria-hidden className="absolute -bottom-32 -left-32 -z-10 size-96 rounded-full border-[40px] border-white/6" />
        <div className="grid items-center gap-10 px-6 py-12 sm:px-10 sm:py-14 lg:grid-cols-12 lg:px-14 lg:py-16">
          <div className="lg:col-span-7">
            <h2 id="cta-title" className="text-[2.3rem] leading-[1.03] font-bold tracking-[-0.04em] sm:text-[3.2rem]">
              Ready to grow your Shopify store?
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/82">
              Join {proof.merchants.display} Shopify and Shopify Plus brands building repeat business with Appstle — or partner with us to bring Appstle to your clients.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#products" size="lg" variant="light" className="focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">
                Explore Our <strong>Apps</strong>
              </ButtonLink>
              <ButtonLink href={links.partnerProgram} size="lg" variant="outlineLight" className="focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white">
                Become a <strong>Partner</strong>
              </ButtonLink>
            </div>
          </div>
          <div aria-hidden className="relative mx-auto hidden aspect-square w-full max-w-[21rem] sm:block lg:col-span-5 [&_.hover-pop]:pointer-events-auto">
            <div className="absolute inset-[8%] rounded-full border border-white/20" />
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full animate-[orbit_80s_linear_infinite]">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth=".35" strokeDasharray="1 2.2" />
            </svg>
            <div className="absolute inset-0 grid place-items-center">
              <span className="absolute size-24 animate-[pulse-ring_3.2s_var(--ease-smooth)_infinite] rounded-[1.8rem] bg-white/20" />
              <AppstleMark className="relative size-20 rounded-[1.5rem] shadow-[0_18px_40px_-12px_rgb(0_0_0/0.4)] ring-4 ring-white/25 transition-[scale,rotate] duration-700 ease-[var(--ease-spring)] hover:scale-110 hover:rotate-6" />
            </div>
            {products.map((p, i) => {
              const a = (-90 + (360 / products.length) * i) * (Math.PI / 180);
              return (
                <span
                  key={p.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${50 + 42 * Math.cos(a)}%`, top: `${50 + 42 * Math.sin(a)}%` }}
                >
                  <span className="hero-float block" style={{ ["--fd" as string]: `${7 + i}s`, ["--fy" as string]: "5px", ["--fdl" as string]: `${i * 0.4}s` }}>
                    <ProductIcon id={p.id} size="lg" className="hover-pop bg-white shadow-soft ring-0" />
                  </span>
                </span>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
