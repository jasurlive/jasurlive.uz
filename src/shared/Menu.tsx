import { useState, type MouseEvent, type ReactNode } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiUser,
  FiBriefcase,
  FiAward,
  FiTerminal,
  FiBookOpen,
  FiMapPin,
  FiPlay,
  FiSettings,
} from "react-icons/fi";
import "../css/menu.css";
import { useTheme } from "../hooks/LOCAL/useTheme";
import { useShortcuts } from "../hooks/LOCAL/useShortcuts";
import { navigate, useRoute } from "../hooks/LOCAL/useRoute";

export type MenuItem = {
  label: string;
  icon: ReactNode;
  href: string;
  mobile?: boolean;
  bottom?: boolean;
};

const ITEMS: MenuItem[] = [
  { label: "Home", icon: <FiHome />, href: "/", mobile: true },
  { label: "Resume", icon: <FiUser />, href: "/resume", mobile: true },
  { label: "Portfolio", icon: <FiBriefcase />, href: "/portfolio", mobile: false },
  { label: "Awards", icon: <FiAward />, href: "/awards", mobile: true },
  { label: "Terminal", icon: <FiTerminal />, href: "/terminal", mobile: false }, // phones: "playlist" in the terminal instead
  { label: "Blog", icon: <FiBookOpen />, href: "/blogs", mobile: false },
  { label: "Travel map", icon: <FiMapPin />, href: "/map", mobile: false },
  { label: "My playlist", icon: <FiPlay />, href: "/playlist", mobile: true },
  // bottom: pinned to the bottom of the sidebar on desktop, keep these last
  { label: "Settings", icon: <FiSettings />, href: "/settings", mobile: true, bottom: true },
];

export default function Menu({ items = ITEMS }: { items?: MenuItem[] }) {
  const { toggleTheme } = useTheme();
  const path = useRoute();

  const [collapsed, setCollapsed] = useState(
    () => localStorage.getItem("menu-collapsed") !== "false"
  );
  
  const toggleMenu = () => {
    setCollapsed((value) => {
      localStorage.setItem("menu-collapsed", String(!value));
      return !value;
    });
  };

  // global shortcuts: ctrl+j cycles themes, ` (backtick) collapses the sidebar
  useShortcuts({ "ctrl+j": toggleTheme, "`": toggleMenu });

  // internal links go through the router, external ones open normally
  const go = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/") || e.ctrlKey || e.metaKey) return;
    e.preventDefault();
    navigate(href);
  };

  return (
    <nav className={`menu ${collapsed ? "menu-collapsed" : ""}`}>
      <button
        type="button"
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle sidebar (`)"
        title="Toggle sidebar (`)"
      >
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>

      {items.map((item) => {
        const className = `menu-item ${
          item.mobile ? "menu-mobile-visible" : "menu-desktop-only"
        } ${item.bottom ? "menu-bottom" : ""} ${item.href === path ? "active" : ""}`;

        return (
          <a
            key={item.href}
            href={item.href}
            className={className}
            title={item.label}
            onClick={(e) => go(e, item.href)}
          >
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
