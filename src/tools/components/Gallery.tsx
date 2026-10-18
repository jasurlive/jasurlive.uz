import { useState } from "react";
import Lightbox from "./Lightbox";
import Swiper from "./Swiper";

export type GalleryItem = {
  title: string;
  text: string;
  image: string;
  meta?: string;
  link?: string;
};

// image cards in a swiper; drag/swipe to browse, tap the centered picture to see it big
export default function Gallery({ items, label }: { items: GalleryItem[]; label?: string }) {
  const [open, setOpen] = useState<GalleryItem | null>(null);

  return (
    <>
      <Swiper
        className="swiper-cards"
        items={items}
        autoplay={5000}
        label={label}
        render={(item, active) => (
          <article className="gallery-card">
            {item.image && (
              <button
                className="gallery-img"
                onClick={() => active && setOpen(item)}
                aria-label={`View ${item.title}`}
                tabIndex={active ? 0 : -1}
              >
                <img src={item.image} alt={item.title} loading="lazy" decoding="async" draggable={false} />
              </button>
            )}
            <div className="gallery-body">
              {item.meta && <span className="gallery-meta">{item.meta}</span>}
              <b>{item.title}</b>
              <p className="muted">{item.text}</p>
              {item.link && (
                <a className="link" href={item.link} target="_blank" rel="noreferrer" tabIndex={active ? 0 : -1}>
                  Open →
                </a>
              )}
            </div>
          </article>
        )}
      />

      {open && <Lightbox src={open.image} alt={open.title} onClose={() => setOpen(null)} />}
    </>
  );
}
