import { FiMaximize, FiMinimize } from "react-icons/fi";
import Header from "../components/Header";
import ThemePicker from "../shared/ThemePicker";
import { useFullscreen } from "../hooks/LOCAL/useFullscreen";

const SHORTCUTS = [
  { keys: ["Ctrl", "J"], label: "Next theme" },
  { keys: ["`"], label: "Collapse the sidebar" },
  { keys: ["Esc"], label: "Leave fullscreen" },
];

export default function Settings() {
  const { fullscreen, toggleFullscreen, supported } = useFullscreen();

  return (
    <main className="page settings">
      <Header title="Settings" />

      <section className="section">
        <h2 className="section-title">Theme</h2>
        <ThemePicker />
        <p className="settings-note muted small">
          Or type <code>theme sega</code> in the terminal.
        </p>
      </section>

      <section className="section">
        <h2 className="section-title">Display</h2>
        {supported ? (
          <button
            type="button"
            role="switch"
            aria-checked={fullscreen}
            className="settings-switch"
            onClick={toggleFullscreen}
          >
            <span className="settings-switch-icon">{fullscreen ? <FiMinimize /> : <FiMaximize />}</span>
            <span className="settings-switch-text">
              <span className="settings-switch-label">Fullscreen</span>
              <span className="muted small">Hide the browser bars for a cleaner view</span>
            </span>
            <span className="settings-knob" aria-hidden="true" />
          </button>
        ) : (
          <p className="muted small">Fullscreen isn't supported in this browser.</p>
        )}
      </section>

      <section className="section">
        <h2 className="section-title">Shortcuts</h2>
        <ul className="settings-keys">
          {SHORTCUTS.map(({ keys, label }) => (
            <li key={label}>
              <span>{label}</span>
              <span className="settings-combo">
                {keys.map((k) => (
                  <kbd key={k}>{k}</kbd>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
