import { useEffect, useRef } from "react";

// native <dialog>: esc / tap outside closes it
export default function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
    <dialog ref={ref} className="lightbox" onClose={onClose} onClick={() => ref.current?.close()}>
      <img src={src} alt={alt} />
      <p>{alt}</p>
    </dialog>
  );
}
