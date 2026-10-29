"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu } from "lucide-react";
import { useState } from "react";
import { AppstleLogo } from "@/components/brand/AppstleLogo";
import { ButtonLink } from "@/components/ui/Button";
import { links } from "@/data/links";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 8));

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: ease.out }}
      className={cn(
        "sticky top-0 z-50 h-[var(--header-h)] border-b pt-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "border-canvas-line/80 bg-canvas/80 shadow-[0_8px_24px_-14px_rgb(6_43_82/0.25)] backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="flex h-[3.75rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-5 xl:px-10">
        <Link href="/" className="shrink-0 rounded-lg" aria-label="Appstle home">
          <AppstleLogo tone="dark" />
        </Link>

        <MegaMenu />

        <div className="flex items-center gap-2">
          <ButtonLink href={links.partnerProgram} size="sm" variant="primary" className="hidden sm:inline-flex">
            Become a <strong>Partner</strong>
          </ButtonLink>
          <button
            type="button"
            className={cn("inline-grid size-10 place-items-center rounded-full ring-1 transition lg:hidden", "bg-white/60 text-ink ring-line hover:bg-brand-50 hover:text-brand")}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen(true)}
          >
            <Menu aria-hidden className="size-5" />
          </button>
        </div>
      </div>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </motion.header>
  );
}
