import { useTheme } from "../hooks/LOCAL/useTheme";
import { THEME_LABELS } from "../lib/themes";
import { THEME_ICONS } from "./ThemeIcons";

// every theme as a chip; the menu button / ctrl+j cycle through the same list
export default function ThemePicker() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="row theme-picker" role="radiogroup" aria-label="Theme">
      {themes.map((t) => (
        <button
          key={t}
          type="button"
          role="radio"
          aria-checked={t === theme}
          className={`chip ${t === theme ? "is-active" : ""}`}
          onClick={() => setTheme(t)}
        >
          {THEME_ICONS[t]} {THEME_LABELS[t]}
        </button>
      ))}
    </div>
  );
}
