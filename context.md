# appstle-v3 — context

Appstle marketing site. Blue + white, glass surfaces. Read this file instead of re-scanning the code.
Previous long changelog: `restore-points/2026-10-27-pre-final-cleanup/context.md.bak`.

## Stack
Next 16.4 (App Router, cacheComponents, React Compiler) · React 19.3 · Tailwind v4 · motion 14 · lucide-react · tailwind-merge.
Install on Windows only (`install.cmd` / `npm install`), never from WSL/Linux. `npm run dev` → port 3005 (v5 copy of v3).

## Theme
- Tokens in `src/styles/tokens.css`: `brand` #1088F6 (hover `brand-700` #0A6FD1), `brand-500` #0177F2, `brand-400` #219BFB, `brand-100` #CEEFFD, `brand-50` #EEF7FE, `surface` #FFFFFF, `ink` #2D2D2D. Fonts: Inter (body), Bricolage Grotesque (display).
- Glass layer: `src/styles/glass.css`, switched on by `data-glass` on `<html>` (`app/layout.tsx`); remove the attribute for the solid design. Static page backgrounds (white + line pattern `public/patterns/commerce.svg`, `--pattern-alpha`). Light panels/cards/pills → frosted glass; coloured panels keep colour + glass edge; header clear at top, frosted on scroll (no border); nav dropdowns + mobile drawer stay solid (revert-layer block); white widgets inside dark cards stay solid; tinted sections (#products, #how-it-works, #support) fade in/out from white.

## Home (`src/app/page.tsx`)
CommerceHero → TrustStrip → About → RetentionStack `#products` → ConnectedIntegrations `#integrations` → GrowthStory `#how-it-works` → Testimonials `#stories` → Support `#support` → ClosingCta → Footer.
- Hero (`sections/home/CommerceHero.tsx`, `styles/commerce-hero.css`): headline in a morphing glass lens; 4 corner product cards, 2 crossfading `Cycle` slots, inner ring (Notification, Shopify + PLUS tile, app tiles, purpose chips incl. "Built for Shopify & Shopify Plus", LTV chip), glass orbs, doodles, orbit rings.
- Hero scaling: ≥768px the hero is a fixed 1440×860 design (`.hero-stage`) zoomed by `--hs` = clamp(.45, min(vw/1440, (svh−header)/860), 1.3), so cards and text resize together and keep spacing. <768px: stacked copy + CompactCollage.
- External links are inert (`EXTERNAL_LINKS` in `ui/SmartLink.tsx`).

## Map
- `src/app/` — routes (37 pages), layout (fonts, data-js boot, Header/Footer, HoverFX, AppstleBot)
- `src/components/` — `layout/` (Header, MegaMenu, MobileNav, Footer), `sections/<page>/`, `features/` (demos, widgets, integrations, assistant, backdrops/Doodles), `motion/`, `ui/` (Panel sets `data-panel`), `brand/`
- `src/data/` — site copy and data; `src/content/` — page JSON; `src/lib/`, `src/hooks/`, `src/styles/`

## Notes
- Appstle Bot is a UI-only preview (full RAG version: `restore-points/2026-10-27-bot-full/`).
- eslint can't run from the Linux VM; run `npm run lint` on Windows.
- `tsconfig.json` excludes `restore-points`.
- [2026-10-27] Final cleanup (full backup `restore-points/2026-10-27-pre-final-cleanup/full-project.tgz`): removed 28 unused files + unused film media, 24 unused exports, unused imports/locals, dead intro/`useIntroDone` logic, unused CSS rules/keyframes (`guide.css` gone), all code comments.
- [2026-10-27] Hero spacing (backup `restore-points/2026-10-27-pre-hero-spacing/`): side Cycle slots moved to the stage edges (`left-[2%]` Revenue/Storefront, `right-[2%]` RepeatRate/Pickup); "Keep customers coming back" chip moved to `right-[26%] bottom-[18%]` (no longer over the LTV chip). Commerce line-art pattern shown behind the hero again (still faded behind the headline). Overlap check at 1440: no piece touches another piece or the copy.
