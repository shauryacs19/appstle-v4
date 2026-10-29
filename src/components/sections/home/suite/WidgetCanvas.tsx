"use client";

/*
 * Products-section canvas: a grid where an app's three live widgets sit, overlapping slightly.
 * - Drag a widget (anywhere except its buttons) to move it.
 * - Scroll over a widget, or use − / + on its label, to resize it.
 * - Clicking a widget brings it to the front. "Reset layout" restores the arrangement.
 * The whole canvas is a fixed 880 × 640 design scaled to its container, so the layout
 * looks the same at every width. Below lg the widgets simply stack.
 */

import { GripVertical, Minus, Plus, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent as RPointerEvent } from "react";
import type { LucideIcon } from "lucide-react";
import { RisingIcons } from "@/components/features/backdrops/RisingIcons";
import { cn } from "@/lib/cn";
import type { CanvasWidget } from "./AppWidgets";

const W = 880;
const MIN = 0.75;
const MAX = 1.45;

type Pos = { x: number; y: number; w: number; s: number; z: number };

/** Default arrangement comes from each widget's `place`; z order: large1, large2, small on top. */
const Z: Record<CanvasWidget["key"], number> = { large1: 2, large2: 1, small: 3 };
const defaultPos = (i: CanvasWidget): Pos => ({ ...i.place, z: Z[i.key] });

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const INTERACTIVE = "button, a, input, select, textarea, label, [role='radio'], [role='switch'], [role='tab']";

function CanvasItem({
  item,
  pos,
  base,
  bounds,
  scale,
  accent,
  onChange,
  onFront,
}: {
  item: CanvasWidget;
  pos: Pos;
  base: number;
  bounds: number;
  scale: number;
  accent: string;
  onChange: (p: Partial<Pos>) => void;
  onFront: () => void;
}) {
  const el = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; sx: number; sy: number; x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const posRef = useRef(pos);
  const changeRef = useRef(onChange);
  useEffect(() => {
    posRef.current = pos;
    changeRef.current = onChange;
  });

  // Wheel to resize (non-passive so the page doesn't scroll while resizing).
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      changeRef.current({ s: clamp(posRef.current.s * (1 - e.deltaY * 0.0012), MIN, MAX) });
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, []);

  const down = (e: RPointerEvent<HTMLDivElement>) => {
    onFront();
    // Buttons, inputs etc. keep working normally — only drag from the card body or the label.
    if ((e.target as HTMLElement).closest(INTERACTIVE)) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { id: e.pointerId, sx: e.clientX, sy: e.clientY, x: pos.x, y: pos.y };
    setDragging(true);
  };
  const move = (e: RPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    onChange({
      x: clamp(d.x + (e.clientX - d.sx) / scale, -pos.w * 0.5, W - pos.w * 0.5),
      y: clamp(d.y + (e.clientY - d.sy) / scale, -20, bounds - 80),
    });
  };
  const up = (e: RPointerEvent<HTMLDivElement>) => {
    if (drag.current?.id === e.pointerId) drag.current = null;
    setDragging(false);
  };
  const keys = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 40 : 12;
    const map: Record<string, Partial<Pos>> = {
      ArrowLeft: { x: pos.x - step },
      ArrowRight: { x: pos.x + step },
      ArrowUp: { y: pos.y - step },
      ArrowDown: { y: pos.y + step },
      "+": { s: clamp(pos.s + 0.08, MIN, MAX) },
      "=": { s: clamp(pos.s + 0.08, MIN, MAX) },
      "-": { s: clamp(pos.s - 0.08, MIN, MAX) },
    };
    if (map[e.key]) {
      e.preventDefault();
      onChange(map[e.key]);
    }
  };

  return (
    <div
      ref={el}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      className={cn("absolute top-0 left-0 origin-top-left touch-none select-none", dragging ? "cursor-grabbing" : "cursor-grab")}
      style={{ width: pos.w, zIndex: pos.z, transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.s})` } as CSSProperties}
    >
      <div
        data-handle=""
        tabIndex={0}
        role="group"
        aria-label={`${item.feature} widget — drag to move, arrow keys to nudge, + and − to resize`}
        onKeyDown={keys}
        className="mb-2 flex w-fit items-center gap-1.5 rounded-full bg-white py-1 pr-1 pl-2 text-[10.5px] font-semibold text-[#1B2437] shadow-[0_4px_12px_-6px_rgb(30_40_90/0.25)] ring-1 ring-[#E6E9F0] outline-none focus-visible:ring-2 focus-visible:ring-[#1A84F5]"
      >
        <GripVertical aria-hidden className="size-3 text-[#9AA1B0]" />
        <span className="size-1.5 rounded-full" style={{ background: accent }} />
        {item.feature}
        <span className="ml-1 flex items-center rounded-full bg-[#F4F5F9]" title="Resize widget">
          <button type="button" title="Smaller" aria-label={`Make ${item.feature} smaller`} disabled={pos.s <= MIN} onClick={() => onChange({ s: clamp(pos.s - 0.08, MIN, MAX) })} className="grid size-5 place-items-center rounded-full text-[#5B6478] hover:bg-white disabled:opacity-35">
            <Minus aria-hidden className="size-3" />
          </button>
          <span className="w-8 text-center text-[9.5px] font-medium text-[#6B7385] tabular-nums" aria-live="polite">
            {Math.round((pos.s / base) * 100)}%
          </span>
          <button type="button" title="Bigger" aria-label={`Make ${item.feature} bigger`} disabled={pos.s >= MAX} onClick={() => onChange({ s: clamp(pos.s + 0.08, MIN, MAX) })} className="grid size-5 place-items-center rounded-full text-[#5B6478] hover:bg-white disabled:opacity-35">
            <Plus aria-hidden className="size-3" />
          </button>
        </span>
      </div>
      <div className={cn("transition-shadow", dragging && "[&>*]:shadow-[0_30px_60px_-24px_rgb(30_40_90/0.45)]")}>{item.node}</div>
    </div>
  );
}

export function WidgetCanvas({ items, height: H, accent, tint, title, icons }: { items: CanvasWidget[]; height: number; accent: string; tint: string; title: string; icons: LucideIcon[] }) {
  const box = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const fresh = useCallback(() => Object.fromEntries(items.map((i) => [i.key, defaultPos(i)])) as Record<CanvasWidget["key"], Pos>, [items]);
  const [pos, setPos] = useState(fresh);
  const top = useRef(10);

  useEffect(() => {
    const node = box.current;
    if (!node) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / W));
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const moved = items.some((i) => {
    const a = pos[i.key];
    const b = i.place;
    return a && (a.x !== b.x || a.y !== b.y || a.s !== b.s);
  });

  return (
    <div className={cn("relative overflow-hidden rounded-[1.4rem]", tint)} style={{ "--rise": accent } as CSSProperties}>
      {/* grid */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${accent}1F 1px, transparent 1px), linear-gradient(to bottom, ${accent}1F 1px, transparent 1px), linear-gradient(to right, ${accent}0F 1px, transparent 1px), linear-gradient(to bottom, ${accent}0F 1px, transparent 1px)`,
          backgroundSize: "120px 120px, 120px 120px, 24px 24px, 24px 24px",
        }}
      />
      {/* icons floating upward behind the widgets */}
      <RisingIcons icons={icons} className="[&>span]:!text-[var(--rise)]" />
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 p-4 sm:p-5">
        <p className="inline-flex items-center gap-2 rounded-full bg-white px-2.5 py-1 text-[0.7rem] font-semibold text-ink-muted ring-1 ring-[#E6E9F0]">
          <span className="size-2 rounded-full bg-[#22C55E]" />
          Try it live · {title}
        </p>
        <div className="hidden items-center gap-2 lg:flex">
          <span className="text-[0.7rem] text-ink-subtle">Drag to move · scroll or −/+ to resize</span>
          <button
            type="button"
            onClick={() => setPos(fresh())}
            disabled={!moved}
            className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 text-[0.7rem] font-semibold text-[#1A84F5] ring-1 ring-[#E6E9F0] disabled:cursor-default disabled:text-ink-subtle disabled:opacity-60"
          >
            <RotateCcw aria-hidden className="size-3" /> Reset layout
          </button>
        </div>
      </div>

      {/* desktop: free canvas */}
      <div ref={box} className="relative -mt-14 hidden w-full lg:block" style={{ aspectRatio: `${W} / ${H}` }}>
        <div className="absolute top-0 left-0 origin-top-left" style={{ width: W, height: H, transform: `scale(${scale})` }}>
          {items.map((i) => (
            <CanvasItem
              key={i.key}
              item={i}
              pos={pos[i.key] ?? defaultPos(i)}
              base={i.place.s}
              bounds={H}
              scale={scale}
              accent={accent}
              onFront={() => setPos((p) => ({ ...p, [i.key]: { ...p[i.key], z: ++top.current } }))}
              onChange={(c) => setPos((p) => ({ ...p, [i.key]: { ...p[i.key], ...c } }))}
            />
          ))}
        </div>
      </div>

      {/* small screens: stacked */}
      <div className="relative grid gap-5 px-4 pb-5 lg:hidden">
        {items.map((i) => (
          <div key={i.key} className="mx-auto w-full max-w-[24rem]">
            <p className="mb-2 flex w-fit items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[10.5px] font-semibold text-[#1B2437] ring-1 ring-[#E6E9F0]">
              <span className="size-1.5 rounded-full" style={{ background: accent }} />
              {i.feature}
            </p>
            {i.node}
          </div>
        ))}
      </div>
    </div>
  );
}
