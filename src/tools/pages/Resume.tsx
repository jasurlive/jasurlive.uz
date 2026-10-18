import Header from "../components/Header";
import { experience, profile } from "../data/site"; //u can add skills later if u want

export default function Resume() {
  return (
    <main className="page">
      <Header title="Resume" sub={profile.role} />

      <section className="section">
        <h2>About me</h2>
        <p>{profile.about}</p>
      </section>

      <section className="section">
        <h2>Work & education</h2>
        <ul className="list">
          {experience.map((e) => (
            <li key={e.title}>
              <span>{e.icon} {e.title}</span>
              <span className="muted">{e.date}</span>
            </li>
          ))}
        </ul>
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
