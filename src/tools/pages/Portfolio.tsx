import Gallery from "../components/Gallery";
import Header from "../components/Header";
import { portfolio } from "../data/content";

export default function Portfolio() {
  return (
    <main className="page">
      <Header title="Portfolio" sub="Things I designed, built and simulated" />
      <Gallery
        items={portfolio.map((p) => ({ title: p.title, text: p.description, image: p.image, link: p.link }))}
      />
    </main>
  );
}
