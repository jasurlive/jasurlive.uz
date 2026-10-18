import type { CSSProperties, ReactNode } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSwiper } from "../hooks/LOCAL/useSwiper";
import "../css/swiper.css";

type Props<T> = {
  items: T[];
  render: (item: T, active: boolean) => ReactNode;
  autoplay?: number; // ms, 0 = off
  className?: string;
  label?: string;
};

// infinite carousel: drag with mouse or finger, trackpad swipe, arrows, dots, keys, autoplay.
// every slide sits in the same grid cell and is moved with translateX (see useSwiper).
export default function Swiper<T>({ items, render, autoplay = 3000, className = "", label = "carousel" }: Props<T>) {
  const n = items.length;
  const { pos, active, visible, itemAt, next, prev, goTo, moveBy, rootProps } = useSwiper({ count: n, autoplay });

  if (!n) return null;

  return (
    <div className={`swiper ${className}`} role="region" aria-roledescription="carousel" aria-label={label} {...rootProps}>
      <div className="swiper-viewport">
        <div className="swiper-track">
          {visible.map((k) => (
            <div
              key={k}
              className={`swiper-slide ${k === pos ? "is-active" : ""}`}
              style={{ "--off": k - pos } as CSSProperties}
              onClick={() => k !== pos && moveBy(k - pos)}
              aria-hidden={k !== pos || undefined}
            >
              {render(items[itemAt(k)], k === pos)}
            </div>
          ))}
        </div>
      </div>

      {n > 1 && (
        <>
          <button className="swiper-arrow swiper-prev" onClick={prev} aria-label="Previous">
            <FiChevronLeft />
          </button>
          <button className="swiper-arrow swiper-next" onClick={next} aria-label="Next">
            <FiChevronRight />
          </button>

          <div className="swiper-dots">
            {items.map((_, i) => (
              <button
                key={i}
                className={i === active ? "is-active" : ""}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
