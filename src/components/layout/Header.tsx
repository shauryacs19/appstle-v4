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
<<<<<<< HEAD
      className="sticky top-0 z-50 h-[var(--header-h)] bg-transparent px-3 pt-3 sm:px-5 lg:px-6"
    >
      {/* V2's floating rounded bar */}
      <div
        className={cn(
          "mx-auto flex h-[4.25rem] max-w-site items-center justify-between gap-4 rounded-[1.25rem] px-4 ring-1 backdrop-blur-xl transition-[background-color] duration-300 sm:px-5 lg:h-[4.75rem] lg:rounded-[1.5rem] xl:px-7",
          scrolled ? "bg-[#FBF8F3]/90 ring-line" : "bg-[#FBF8F3]/70 ring-line/80",
        )}
      >
        <Link href="/" className="shrink-0 rounded-lg" aria-label="Appstle home">
          <AppstleLogo tone="dark" tagline={false} className="gap-3 [&>svg]:size-9 [&_.font-display]:text-[1.5rem] [&_.font-display]:text-logo" />
=======
      className={cn(
        "sticky top-0 z-50 h-[var(--header-h)] border-b pt-3 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        scrolled
          ? "border-line/70 bg-white/55 shadow-[0_8px_24px_-14px_rgb(6_43_82/0.3)] backdrop-blur-md backdrop-saturate-150"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="flex h-[4.5rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-6 xl:px-12">
        <Link href="/" className="shrink-0 rounded-lg" aria-label="Appstle home">
          <AppstleLogo tone="dark" tagline={false} className="[&>svg]:size-10 [&_.font-display]:text-[1.55rem]" />
>>>>>>> e4cf854e1d32c74826e1ca2f330ce2815e88eb91
        </Link>

        <MegaMenu />

        <div className="flex items-center gap-2">
          <ButtonLink href={links.partnerProgram} size="md" variant="primary" className="hidden sm:inline-flex">
            Become a <strong>Partner</strong>
          </ButtonLink>
          <button
            type="button"
<<<<<<< HEAD
            className={cn("inline-grid size-10 place-items-center rounded-full ring-1 transition lg:hidden", "bg-white/60 text-ink ring-line hover:bg-surface")}
=======
            className={cn("inline-grid size-11 place-items-center rounded-full ring-1 transition lg:hidden", "bg-white/60 text-ink ring-line hover:bg-brand-50 hover:text-brand")}
>>>>>>> e4cf854e1d32c74826e1ca2f330ce2815e88eb91
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
