import { useTheme } from "../hooks/LOCAL/useTheme";
import { THEME_LABELS, isDarkTheme } from "../lib/themes";
import { THEME_ICONS } from "./ThemeIcons";

// light themes on the left, dark on the right; the menu button / ctrl+j cycle through the same list
export default function ThemePicker() {
  const { theme, setTheme, themes } = useTheme();
  const columns = [
    { label: "Light", list: themes.filter((t) => !isDarkTheme(t)) },
    { label: "Dark", list: themes.filter(isDarkTheme) },
  ];

  return (
    <div className="theme-columns" role="radiogroup" aria-label="Theme">
      {columns.map((col) => (
        <div key={col.label} className="theme-picker">
          <span className="theme-column-label">{col.label}</span>
          {col.list.map((t) => (
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
      ))}
    </div>
  );
}
