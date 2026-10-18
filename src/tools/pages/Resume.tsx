import { useState } from "react";
import Header from "../components/Header";
import { experience, profile } from "../data/site"; //u can add skills later if u want
import "../css/resume.css";

type Kind = "work" | "edu";
const FILTERS = [
  { key: "all", label: "All" },
  { key: "work", label: "🚄 Work" },
  { key: "edu", label: "🎓 Education" },
] as const;

const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

// "Sep 2024" -> Date, "now" -> today
const parse = (s: string) => {
  const [m, y] = s.trim().toLowerCase().split(/\s+/);
  return m === "now" ? new Date() : new Date(Number(y), Math.max(0, MONTHS.indexOf(m.slice(0, 3))));
};

// whole months between two dates -> "2 yrs 3 mos"
const duration = (from: Date, to: Date) => {
  const total = (to.getFullYear() - from.getFullYear()) * 12 + to.getMonth() - from.getMonth() + 1;
  const y = Math.floor(total / 12);
  const m = total % 12;
  return [y && `${y} yr${y > 1 ? "s" : ""}`, m && `${m} mo${m > 1 ? "s" : ""}`].filter(Boolean).join(" ");
};

// site.ts stays the source of truth: 🎓 = education, anything else = work.
// "Role, Organization" is split on the first comma.
const timeline = experience
  .map((e) => {
    const [startStr, endStr = "now"] = e.date.split(/\s*[–-]\s*/);
    const start = parse(startStr);
    const comma = e.title.indexOf(",");
    return {
      ...e,
      kind: (e.icon === "🎓" ? "edu" : "work") as Kind,
      role: comma === -1 ? e.title : e.title.slice(0, comma),
      org: comma === -1 ? "" : e.title.slice(comma + 1).trim(),
      current: endStr.trim().toLowerCase() === "now",
      start,
      length: duration(start, parse(endStr)),
    };
  })
  .sort((a, b) => b.start.getTime() - a.start.getTime());

export default function Resume() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const items = timeline.filter((t) => filter === "all" || t.kind === filter);

  return (
    <main className="page">
      <Header title="Resume" sub={profile.role} />

      <section className="section">
        <h2>About me</h2>
        <p>{profile.about}</p>
      </section>

      <section className="section">
        <h2 className="section-title">Work & education</h2>

        <div className="tl-filter" role="tablist" aria-label="Filter timeline">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              className={`chip ${filter === f.key ? "is-active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="tl-legend" aria-hidden="true">
          <span>🚄 Work</span>
          <span>🎓 Education</span>
        </div>

        <ol className={`tl ${filter !== "all" ? "tl-single" : ""}`}>
          {items.map((t) => (
            <li key={t.title} className={`tl-item tl-${t.kind} ${t.current ? "is-current" : ""}`}>
              <span className="tl-dot" aria-hidden="true">{t.icon}</span>
              <article className="tl-card">
                <div className="tl-top">
                  <span className="tl-date">{t.date}</span>
                  {t.current ? <span className="tl-badge">now</span> : <span className="tl-length">{t.length}</span>}
                </div>
                <b className="tl-role">{t.role}</b>
                {t.org && <span className="tl-org">{t.org}</span>}
                {t.current && <span className="tl-length">{t.length} so far</span>}
              </article>
            </li>
          ))}
        </ol>
      </section>

      {/* <section className="section">
        <h2>Skills & tools</h2>
        <div className="row">
          {skills.map((s) => (
            <span key={s} className="chip">{s}</span>
          ))}
        </div>
      </section> */}
    </main>
  );
}
