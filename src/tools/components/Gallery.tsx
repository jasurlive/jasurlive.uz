import { useState } from "react";
import Lightbox from "./Lightbox";

export type GalleryItem = {
  title: string;
  text: string;
  image: string;
  meta?: string;
  link?: string;
};

// image cards; tap the picture to see it big
export default function Gallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="gallery">
        {items.map((item) => (
          <article key={item.title + item.image} className="gallery-card">
            {item.image && (
              <button className="gallery-img" onClick={() => setOpen(item)} aria-label={`View ${item.title}`}>
                <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
              </button>
            )}
            <div className="gallery-body">
              {item.meta && <span className="gallery-meta">{item.meta}</span>}
              <b>{item.title}</b>
              <p className="muted">{item.text}</p>
              {item.link && (
                <a className="link" href={item.link} target="_blank" rel="noreferrer">
                  Open →
                </a>
              )}
            </div>
          </article>
        ))}
      </div>

      {open && <Lightbox src={open.image} alt={open.title} onClose={() => setOpen(null)} />}
    </>
  );
}
