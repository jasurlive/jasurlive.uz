import { FiMaximize, FiMinimize } from "react-icons/fi";
import Header from "../components/Header";
import ThemePicker from "../shared/ThemePicker";
import { useFullscreen } from "../hooks/LOCAL/useFullscreen";

export default function Settings() {
  const { fullscreen, toggleFullscreen, supported } = useFullscreen();

  return (
    <main className="page">
      <Header title="Settings" />

      <section className="section">
        <h2 className="section-title">Theme</h2>
        <ThemePicker />
        <p className="muted small">Tip: ctrl+j cycles themes, or type `theme sega` in the terminal.</p>
      </section>

      <section className="section">
        <h2 className="section-title">Display</h2>
        {supported ? (
          <div className="row">
            <button
              type="button"
              aria-pressed={fullscreen}
              className={`chip ${fullscreen ? "is-active" : ""}`}
              onClick={toggleFullscreen}
            >
              {fullscreen ? <FiMinimize /> : <FiMaximize />} {fullscreen ? "Exit fullscreen" : "Fullscreen"}
            </button>
          </div>
        ) : (
          <p className="muted small">Fullscreen isn't supported in this browser.</p>
        )}
        <p className="muted small">Tip: ` (backtick) collapses the sidebar.</p>
      </section>
    </main>
  );
}
