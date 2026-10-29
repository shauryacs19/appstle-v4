"use client";

import { useEffect } from "react";

const MIN = 0.55;
const GAP = 28;

export function FitDemos({ root = "#products" }: { root?: string }) {
  useEffect(() => {
    const section = document.querySelector<HTMLElement>(root);
    if (!section) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    let timer = 0;

    const fit = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const header = document.querySelector("header")?.getBoundingClientRect().bottom ?? 72;
        const avail = window.innerHeight - Math.max(header, 0) - GAP * 2;
        section.querySelectorAll<HTMLElement>("[data-fit-card]").forEach((card) => {
          const demo = card.querySelector<HTMLElement>("[data-fit-demo]");
          const stage = card.querySelector<HTMLElement>("[data-fit-stage]");
          if (!demo || !stage) return;
          if (!desktop.matches) {
            demo.style.zoom = "";
            return;
          }
          const max = Number(demo.dataset.fitMax) || 1;
          const z = parseFloat(getComputedStyle(demo).zoom) || 1;
          const cs = getComputedStyle(stage);
          const stagePad = parseFloat(cs.paddingTop) + parseFloat(cs.paddingBottom);
          const fixed = card.getBoundingClientRect().height - stage.getBoundingClientRect().height;
          const natural = demo.getBoundingClientRect().height / z;
          if (!natural) return;
          const next = Math.min(max, Math.max(MIN, (avail - fixed - stagePad) / natural));
          if (Math.abs(next - z) > 0.005) demo.style.zoom = next.toFixed(3);
        });
      }, 40);
    };

    fit();
    const ro = new ResizeObserver(fit);
    section.querySelectorAll("[data-fit-demo] > *").forEach((el) => ro.observe(el));
    window.addEventListener("resize", fit);
    desktop.addEventListener("change", fit);
    document.fonts?.ready.then(fit);
    return () => {
      window.clearTimeout(timer);
      ro.disconnect();
      window.removeEventListener("resize", fit);
      desktop.removeEventListener("change", fit);
    };
  }, [root]);

  return null;
}
