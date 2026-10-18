import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import "../css/swiper.css";

type Props<T> = {
  items: T[];
  render: (item: T, active: boolean) => ReactNode;
  autoplay?: number; // ms, 0 = off
  className?: string;
};

// native scroll-snap carousel: swipe on touch, arrows, dots, autoplay.
// infinite loop: a clone of the last slide sits before the first and vice versa;
// when we land on a clone we silently jump to the real slide.
export default function Swiper<T>({ items, render, autoplay = 3000, className = "" }: Props<T>) {
  const n = items.length;
  const looped = [items[n - 1], ...items, items[0]];
  const track = useRef<HTMLDivElement>(null);
  const pos = useRef(1); // position in looped (clones included)
  const settle = useRef(0);
  const [current, setCurrent] = useState(1);
  const [paused, setPaused] = useState(false);

  const goTo = (k: number, smooth = true) => {
    const el = track.current;
    const slide = el?.children[k] as HTMLElement | undefined;
    if (!el || !slide) return;
    el.scrollTo({
      left: slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2,
      behavior: smooth ? "smooth" : "instant",
    });
  };

  // start on the first real slide and stay centered on resize
  useLayoutEffect(() => {
    goTo(1, false);
    const onResize = () => goTo(pos.current, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const dist = (c: Element) => {
      const s = c as HTMLElement;
      return Math.abs(s.offsetLeft + s.clientWidth / 2 - center);
    };
    const kids = Array.from(el.children);
    const k = kids.reduce((best, c, i) => (dist(c) < dist(kids[best]) ? i : best), 0);
    pos.current = k;
    setCurrent(k);

    clearTimeout(settle.current);
    settle.current = window.setTimeout(() => {
      if (k === 0) goTo(n, false);
      if (k === n + 1) goTo(1, false);
    }, 150);
  };

  useEffect(() => {
    if (!autoplay || paused || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => goTo(pos.current + 1), autoplay);
    return () => clearTimeout(t);
  });

  if (!n) return null;
  const active = (current - 1 + n) % n;

  return (
    <div
      className={`swiper ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <div className="swiper-track" ref={track} onScroll={onScroll}>
        {looped.map((item, k) => (
          <div
            key={k}
            className={`swiper-slide ${k === current ? "is-active" : ""}`}
            onClick={() => k !== current && goTo(k)}
            aria-hidden={k === 0 || k === n + 1 || undefined}
          >
            {render(item, k === current)}
          </div>
        ))}
      </div>

      <button className="swiper-arrow swiper-prev" onClick={() => goTo(pos.current - 1)} aria-label="Previous">
        <FiChevronLeft />
      </button>
      <button className="swiper-arrow swiper-next" onClick={() => goTo(pos.current + 1)} aria-label="Next">
        <FiChevronRight />
      </button>

      <div className="swiper-dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={i === active ? "is-active" : ""}
            onClick={() => goTo(i + 1)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
