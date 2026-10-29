import type { CSSProperties } from "react";
import type { ProductId } from "@/data/products";

type Scale = { base: string; 50: string; 100: string; 200: string; 300: string; 400: string; 500: string; 700: string };

const scales: Record<ProductId, Scale> = {
  // 2026-10-29 palette mapping: Electric Blue · Periwinkle · Blush Pink · Lavender · Deep Blue
  subscriptions: { base: "#1A84F5", 50: "#EEF6FF", 100: "#D9ECFE", 200: "#A6D5FD", 300: "#6FBBFC", 400: "#219BFB", 500: "#1A84F5", 700: "#0875D1" },
  memberships: { base: "#6565F5", 50: "#F2F2FE", 100: "#E4E4FE", 200: "#CBCBFC", 300: "#A9A9F9", 400: "#8484F8", 500: "#5252E6", 700: "#3E3EB8" },
  loyalty: { base: "#E2628F", 50: "#FDF2F7", 100: "#FBE3EE", 200: "#F8D0E0", 300: "#F4B9D1", 400: "#EC8DB1", 500: "#D9507F", 700: "#A8325F" },
  bundles: { base: "#7B5CF0", 50: "#F5F1FF", 100: "#ECE4FF", 200: "#DDD0FF", 300: "#C5B2FF", 400: "#A68BFA", 500: "#7B5CF0", 700: "#5A3FC0" },
  pickup: { base: "#0875D1", 50: "#EAF3FC", 100: "#D3E6F8", 200: "#A7CDF1", 300: "#6FADE6", 400: "#3B8FDB", 500: "#0875D1", 700: "#065DA6" },
};

export function accentVars(id: ProductId): CSSProperties {
  const s = scales[id];
  return {
    "--color-brand": s.base,
    "--color-brand-50": s[50],
    "--color-brand-100": s[100],
    "--color-brand-200": s[200],
    "--color-brand-300": s[300],
    "--color-brand-400": s[400],
    "--color-brand-500": s[500],
    "--color-brand-700": s[700],
  } as CSSProperties;
}
