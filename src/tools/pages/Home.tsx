import type { MouseEvent } from "react";
import { FiTerminal } from "react-icons/fi";
import Swiper from "../components/Swiper";
import Speeches from "../components/Speeches";
import Typewriter from "../components/Typewriter";
import { profile, projects, quotes, social } from "../data/site";
import { awards, slides } from "../data/content";
import { navigate } from "../hooks/LOCAL/useRoute";

const YEAR = new Date().getFullYear();

const stats = [
  { value: `${YEAR - 2019}+`, label: "years in railways" },
  { value: "3", label: "degrees" },
  { value: String(projects.length), label: "stupid projects" },
  { value: String(awards.length), label: "meh awards" },
];

const internal = (href: string) => (e: MouseEvent) => {
  e.preventDefault();
  navigate(href);
};

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <p className="hero-hi">👋 Hi, welcome!</p>
        <h1 className="hero-name">{profile.name}</h1>
        <p className="status-home">small town boy in a big arcade</p>

        <Typewriter words={quotes} />

        <div className="row">
          <a className="btn btn-mono" href="/terminal" onClick={internal("/terminal")}>
            <FiTerminal /> open terminal
          </a>
        </div>
      </section>

      <Swiper
        items={slides}
        render={(src) => <img src={src} alt="" width={1000} height={1000} decoding="async" />}
      />

      <section className="stats">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <b>{s.value}</b>
            <span>{s.label}</span>
          </div>
        ))}
      </section>

      <section className="section">
        <h2 className="section-title">Talks & interviews</h2>
        <Speeches />
      </section>

      <section className="section">
        <h2 className="section-title">Projects</h2>
        <div className="grid">
          {projects.map((p) => (
            <a key={p.url} className="card card-row" href={p.url} target="_blank" rel="noreferrer">
              <span className="card-icon">{p.icon}</span>
              <span className="card-body">
                <b>{p.title}</b>
                <span className="muted small">{new URL(p.url).host}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="row">
          {social.map((s) => (
            <a key={s.url} className="chip" href={s.url} target="_blank" rel="noreferrer">
              {s.name}
            </a>
          ))}
        </div>
        <p className="muted small">© 2019-{YEAR} jasurlive.uz</p>
      </footer>
    </main>
  );
}
