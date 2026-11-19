import { useEffect, useRef, useState, type MouseEvent, type ReactNode, type TouchEvent } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiUser,
  FiAward,
  FiTerminal,
  FiMapPin,
  FiPlay,
  FiSettings,
} from "react-icons/fi";
import blogsSVG from "./svg/blog.svg?raw";
import "../css/menu.css";
import { useTheme } from "../hooks/LOCAL/useTheme";
import { useShortcuts } from "../hooks/LOCAL/useShortcuts";
import { navigate, useRoute } from "../hooks/LOCAL/useRoute";

// plain .svg file inlined so currentColor and its <animate> tags work. Mounting it
// rewinds the animation to 0 (the menu remounts it each time it comes into view);
// `frozen` (its page is open) parks it on the finished drawing instead.
const SvgIcon = ({ src, frozen = false }: { src: string; frozen?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const svg = ref.current?.querySelector("svg");
    if (!svg) return;
    if (frozen) {
      // last moment of the first loop = the completed drawing
      const anims = svg.querySelectorAll<SVGAnimationElement>("animate, animateMotion");
      const end = Math.max(0, ...Array.from(anims, (a) => a.getSimpleDuration()));
      svg.pauseAnimations();
      svg.setCurrentTime(Math.max(0, end - 0.01));
    } else {
      svg.setCurrentTime(0);
      svg.unpauseAnimations();
    }
  }, [frozen]);

  return <span ref={ref} className="svg-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: src }} />;
};

export type MenuItem = {
  label: string;
  icon: ReactNode | ((active: boolean) => ReactNode); // function form: icon reacts to its page being open
  href: string;
  mobile?: boolean;
  shuffle?: boolean; // phones: one of these is picked at random per visit
  bottom?: boolean;
};

const ITEMS: MenuItem[] = [
  { label: "Home", icon: <FiHome />, href: "/", mobile: true },
  { label: "Resume", icon: <FiUser />, href: "/resume", mobile: true },
  { label: "Awards", icon: <FiAward />, href: "/awards", mobile: true },
  { label: "Terminal", icon: <FiTerminal />, href: "/terminal", mobile: false }, // phones: "playlist" in the terminal instead
  { label: "Blog", icon: (active) => <SvgIcon src={blogsSVG} frozen={active} />, href: "/blogs", shuffle: true },
  { label: "Travel map", icon: <FiMapPin />, href: "/map", shuffle: true },
  { label: "My playlist", icon: <FiPlay />, href: "/playlist", shuffle: true },
  // bottom: pinned to the bottom of the sidebar on desktop, keep these last
  { label: "Settings", icon: <FiSettings />, href: "/settings", mobile: true, bottom: true },
];

// phones: the shuffle items share one slot that rolls to the next one every few seconds
// (starts on a random one, or on the page you landed on)
const shuffled = ITEMS.filter((i) => i.shuffle).map((i) => i.href);
// keep below the blog.svg loop (5.5s) so a drawing never restarts before the slot flips
const FLIP_MS = 5000;
const PHONE = "(max-width: 768px)";
const firstSlot = () => {
  const landed = shuffled.indexOf(location.pathname);
  return landed >= 0 ? landed : Math.floor(Math.random() * shuffled.length);
};

export default function Menu({ items = ITEMS }: { items?: MenuItem[] }) {
  const { toggleTheme } = useTheme();
  const path = useRoute();
  const [slot, setSlot] = useState(firstSlot);
  const [dir, setDir] = useState<"up" | "down">("up");
  // page the user swiped on: lets them flip away from a held shuffled page
  const [swipedOn, setSwipedOn] = useState<string | null>(null);

  useEffect(() => setSwipedOn(null), [path]);

  // on a shuffled page already? hold that one so the active tab stays visible
  const held = shuffled.includes(path) && swipedOn !== path;

  // restarts on every flip, so a manual swipe gets the full FLIP_MS before the next roll
  useEffect(() => {
    if (held) return;
    const id = setInterval(() => {
      if (document.hidden || !matchMedia(PHONE).matches) return;
      setDir("up");
      setSlot((n) => (n + 1) % shuffled.length);
    }, FLIP_MS);
    return () => clearInterval(id);
  }, [held, slot]);

  const showing = held ? path : shuffled[slot];

  // phones: swipe up on the rotating slot for the next item, down for the previous one
  const touch = useRef<{ x: number; y: number } | null>(null);
  const onTouchStart = (e: TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchCancel = () => {
    touch.current = null;
  };
  const onTouchEnd = (e: TouchEvent, href: string) => {
    const start = touch.current;
    touch.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    // a tap: navigate right here instead of waiting for the synthetic click, which
    // phones drop when the slot flips under the finger (preventDefault skips that click)
    if (Math.abs(dx) < 12 && Math.abs(dy) < 12) {
      e.preventDefault();
      navigate(href);
      return;
    }
    if (Math.abs(dy) < 24 || Math.abs(dy) < Math.abs(dx)) return; // a sideways drag
    e.preventDefault(); // swallow the click so a swipe never navigates
    const step = dy < 0 ? 1 : -1;
    const from = shuffled.indexOf(showing);
    setDir(dy < 0 ? "up" : "down");
    setSlot((from + step + shuffled.length) % shuffled.length);
    setSwipedOn(path);
  };

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
        const mobile = item.shuffle ? item.href === showing : item.mobile;
        const active = item.href === path;
        const className = `menu-item ${
          mobile ? "menu-mobile-visible" : "menu-desktop-only"
        } ${item.shuffle ? `menu-flip menu-flip-${dir}` : ""} ${item.bottom ? "menu-bottom" : ""} ${active ? "active" : ""}`;

        return (
          <a
            key={item.href}
            href={item.href}
            className={className}
            title={item.label}
            onClick={(e) => go(e, item.href)}
            {...(item.shuffle && {
              onTouchStart,
              onTouchCancel,
              onTouchEnd: (e: TouchEvent) => onTouchEnd(e, item.href),
            })}
          >
            {/* key flips when a shuffle item comes into view, remounting the icon so
                animated svgs start drawing from the beginning */}
            <span className="menu-icon" key={mobile ? "shown" : "hidden"}>
              {typeof item.icon === "function" ? item.icon(active) : item.icon}
            </span>
            <span className="menu-label">{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
