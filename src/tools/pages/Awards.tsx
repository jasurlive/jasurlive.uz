import Gallery from "../components/Gallery";
import Header from "../components/Header";
import { awards } from "../data/content";

export default function Awards() {
  return (
    <main className="page">
      <Header title="Awards & certificates" sub={`${awards.length} pcs — swipe or drag, tap a picture to zoom`} />
      <Gallery
        label="Awards"
        items={awards.map((a) => ({ title: a.title, text: a.description, image: a.image, meta: a.date }))}
      />
    </main>
  );
}
