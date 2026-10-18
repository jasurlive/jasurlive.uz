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
  FiSun,
  FiMoon,
  FiCpu,
} from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import "../css/menu.css";
import { useTheme } from "../hooks/LOCAL/useTheme";
import { useShortcuts } from "../hooks/LOCAL/useShortcuts";
import { navigate, useRoute } from "../hooks/LOCAL/useRoute";

export type MenuItem = {
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  mobile?: boolean;
};

const ITEMS: MenuItem[] = [
  { label: "Home", icon: <FiHome />, href: "/", mobile: true },
  { label: "Resume", icon: <FiUser />, href: "/resume", mobile: true },
  { label: "Portfolio", icon: <FiBriefcase />, href: "/portfolio", mobile: false },
  { label: "Awards", icon: <FiAward />, href: "/awards", mobile: true },
  { label: "Terminal", icon: <FiTerminal />, href: "/terminal", mobile: true },
  { label: "Blog", icon: <FiBookOpen />, href: "/blogs", mobile: false },
];

// the button shows the theme you'll switch to
const THEME_ICON = { light: <FiSun />, dark: <FiMoon />, matrix: <FiCpu />, sega: <IoGameControllerOutline /> };

export default function Menu({ items = ITEMS }: { items?: MenuItem[] }) {
  const [collapsed, setCollapsed] = useState(true);
  const { nextTheme, toggleTheme } = useTheme();
  const path = useRoute();

  useShortcuts({ "ctrl+j": toggleTheme });

  const menuItems: MenuItem[] = [
    ...items,
    {
      label: `${nextTheme[0].toUpperCase() + nextTheme.slice(1)} theme`,
      icon: THEME_ICON[nextTheme],
      onClick: toggleTheme,
      mobile: true,
    },
  ];

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
        onClick={() => setCollapsed((value) => !value)}
        aria-label="Toggle sidebar"
      >
        {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
      </button>

      {menuItems.map((item) => {
        const className = `menu-item ${
          item.mobile ? "menu-mobile-visible" : "menu-desktop-only"
        } ${item.href === path ? "menu-active" : ""}`;

        const content = (
          <>
            <span className="menu-icon">{item.icon}</span>
            <span className="menu-label">{item.label}</span>
          </>
        );

        return item.onClick ? (
          <button
            key={item.label}
            type="button"
            className={className}
            onClick={item.onClick}
            title={item.label}
          >
            {content}
          </button>
        ) : item.href ? (
          <a
            key={item.href}
            href={item.href}
            className={className}
            title={item.label}
            onClick={(e) => go(e, item.href!)}
          >
            {content}
          </a>
        ) : null;
      })}
    </nav>
  );
}
