import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import "../css/terminal.css";
import { experience, profile, projects, quotes, skills, social } from "../data/site";
import { awards, portfolio, talks } from "../data/content";
import { navigate } from "../hooks/LOCAL/useRoute";
import { setTheme, THEMES, type Theme } from "../hooks/LOCAL/useTheme";

type Line = { text: string; href?: string; kind?: "cmd" | "err" | "ok" };

const PROMPT = "guest@jasurlive:~$";
const PAGES = ["home", "resume", "portfolio", "awards", "blogs"];
const LINKS = [...projects, ...social];

const out = (...rows: string[]): Line[] => rows.map((text) => ({ text }));
const link = (text: string, href: string): Line => ({ text, href });

type Command = { desc: string; run: (args: string[]) => Line[] | void };

const commands: Record<string, Command> = {
  help: {
    desc: "list commands",
    run: () =>
      Object.entries(commands).map(([name, c]) => ({
        text: `  ${name.padEnd(10)} ${c.desc}`,
      })),
  },
  whoami: { desc: "who is Jasur", run: () => out(profile.name, profile.role, "", profile.about) },
  resume: {
    desc: "work & education",
    run: () => experience.map((e) => ({ text: `${e.icon} ${e.date.padEnd(20)} ${e.title}` })),
  },
  skills: { desc: "tools I use", run: () => out(skills.join(" · ")) },
  projects: {
    desc: "web projects",
    run: () => [
      ...projects.map((p) => link(`  ${p.name.padEnd(12)} ${p.title}`, p.url)),
      { text: "tip: open <name>", kind: "ok" },
    ],
  },
  portfolio: {
    desc: "design & engineering work",
    run: () => portfolio.map((p) => (p.link ? link(`• ${p.title}`, p.link) : { text: `• ${p.title}` })),
  },
  awards: { desc: "certificates", run: () => awards.map((a) => ({ text: `🏅 ${a.date.padEnd(9)} ${a.title}` })) },
  talks: { desc: "speeches & interviews", run: () => talks.map((t) => link(`🎤 ${t.date.padEnd(9)} ${t.title}`, t.url)) },
  social: {
    desc: "find me online",
    run: () => social.map((s) => link(`  ${s.name.padEnd(10)} ${s.url}`, s.url)),
  },
  open: {
    desc: "open <project|social>",
    run: ([name]) => {
      const item = LINKS.find((l) => l.name === name?.toLowerCase());
      if (!item) return [{ text: `open: '${name ?? ""}' not found. try 'projects' or 'social'`, kind: "err" }];
      window.open(item.url, "_blank", "noopener");
      return [{ text: `opening ${item.url} ...`, kind: "ok" }];
    },
  },
  cd: {
    desc: `go to page: ${PAGES.join(" | ")}`,
    run: ([page = "home"]) => {
      const p = page.replace(/^\/|\/$/g, "").toLowerCase();
      if (p === "~" || p === "home" || p === "") return navigate("/");
      if (!PAGES.includes(p)) return [{ text: `cd: no such page: ${page}`, kind: "err" }];
      navigate(`/${p}`);
    },
  },
  ls: { desc: "list pages", run: () => out(PAGES.map((p) => p + "/").join("  ")) },
  wisdom: { desc: "random wisdom (typed out)", run: () => [] },
  theme: {
    desc: `switch theme: ${THEMES.join(" | ")}`,
    run: ([name]) => {
      const current = document.documentElement.dataset.theme as Theme;
      const next = (name ?? THEMES[(THEMES.indexOf(current) + 1) % THEMES.length]) as Theme;
      if (!THEMES.includes(next)) return [{ text: `theme: unknown '${name}'. try ${THEMES.join(", ")}`, kind: "err" }];
      setTheme(next);
      return [{ text: `theme: ${next}`, kind: "ok" }];
    },
  },
  neofetch: {
    desc: "system info",
    run: () =>
      out(
        "   /\\      guest@jasurlive.uz",
        "  /  \\     ------------------",
        " /\\   \\    OS: jasurOS (React + Vite)",
        "/  __  \\   Host: Tashkent, Uzbekistan 🇺🇿",
        "/  (  )  \\  Shell: jsh 1.0",
        "/__|  |__\\  Uptime: since 2015, still compiling",
        `            Browser: ${navigator.userAgent.split(" ").pop()}`,
      ),
  },
  date: { desc: "current date", run: () => out(new Date().toString()) },
  echo: { desc: "print text", run: (args) => out(args.join(" ")) },
  history: { desc: "command history", run: () => [] },
  sudo: { desc: "try it", run: () => [{ text: "nice try 😏 guest is not in the sudoers file.", kind: "err" }] },
  clear: { desc: "clear screen (ctrl+l)", run: () => [] },
  exit: { desc: "back to home", run: () => navigate("/") },
};

const NAMES = Object.keys(commands);
const randomQuote = () => quotes[Math.floor(Math.random() * quotes.length)];
const WELCOME: Line[] = [
  { text: "jsh 1.0 — jasurlive.uz terminal", kind: "ok" },
  { text: "type 'help' to see commands. tab completes, ↑/↓ for history." },
  { text: "fullscreen mode — 'exit' or the red dot takes you back." },
  { text: "" },
];

export default function Terminal() {
  const [lines, setLines] = useState<Line[]>(WELCOME);
  const [input, setInput] = useState("");
  const [past, setPast] = useState<string[]>([]);
  const [pos, setPos] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLElement>(null);
  const [isFull, setIsFull] = useState(false);

  // real browser fullscreen while you're here (works when you came by a click; esc leaves it).
  // phones without the fullscreen api (iphone) still get the full-window layout from css.
  useEffect(() => {
    const sync = () => setIsFull(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", sync);
    document.documentElement.requestFullscreen?.({ navigationUI: "hide" }).catch(() => {});
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    };
  }, []);

  // keep the input above the on-screen keyboard on phones
  useEffect(() => {
    const vv = window.visualViewport;
    if (!vv) return;
    const fit = () => {
      rootRef.current?.style.setProperty("--term-h", `${vv.height}px`);
      endRef.current?.scrollIntoView({ block: "end" });
    };
    fit();
    vv.addEventListener("resize", fit);
    return () => vv.removeEventListener("resize", fit);
  }, []);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    else document.documentElement.requestFullscreen?.().catch(() => {});
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const run = (raw: string) => {
    const cmd = raw.trim();
    const [name = "", ...args] = cmd.split(/\s+/);
    const echo: Line = { text: `${PROMPT} ${cmd}`, kind: "cmd" };

    if (cmd) setPast((p) => [...p, cmd]);
    setPos(-1);
    setInput("");

    if (name === "clear") return setLines([]);
    if (name === "wisdom") return typeOut(echo, randomQuote());
    if (name === "history") {
      return setLines((l) => [...l, echo, ...past.map((h, i) => ({ text: `${String(i + 1).padStart(4)}  ${h}` }))]);
    }

    const command = commands[name.toLowerCase()];
    const result: Line[] = !cmd
      ? []
      : command
        ? (command.run(args) ?? [])
        : [{ text: `${name}: command not found. type 'help'`, kind: "err" }];

    setLines((l) => [...l, echo, ...result]);
  };

  // prints text letter by letter
  const typeOut = (echo: Line, text: string) => {
    setLines((l) => [...l, echo, { text: "", kind: "ok" }]);
    let n = 0;
    const t = setInterval(() => {
      n++;
      setLines((l) => [...l.slice(0, -1), { text: text.slice(0, n), kind: "ok" }]);
      if (n >= text.length) clearInterval(t);
    }, 35);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") return run(input);

    if (e.key === "Tab") {
      e.preventDefault();
      const [first, second] = input.split(" ");
      const pool = second === undefined ? NAMES : first === "cd" ? PAGES : first === "open" ? LINKS.map((l) => l.name) : first === "theme" ? [...THEMES] : [];
      const word = second ?? first;
      const hits = pool.filter((n) => n.startsWith(word));
      if (hits.length === 1) setInput(second === undefined ? hits[0] + " " : `${first} ${hits[0]}`);
      else if (hits.length > 1) setLines((l) => [...l, { text: `${PROMPT} ${input}`, kind: "cmd" }, { text: hits.join("  ") }]);
      return;
    }

    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      e.preventDefault();
      if (!past.length) return;
      const next =
        e.key === "ArrowUp"
          ? pos === -1 ? past.length - 1 : Math.max(0, pos - 1)
          : pos === -1 ? -1 : pos + 1 >= past.length ? -1 : pos + 1;
      setPos(next);
      setInput(next === -1 ? "" : past[next]);
      return;
    }

    if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  return (
    <main className="term" ref={rootRef} onClick={() => window.getSelection()?.isCollapsed && inputRef.current?.focus()}>
      <div className="term-window">
        <div className="term-bar">
          <button className="dot red" onClick={() => navigate("/")} title="Exit terminal" aria-label="Exit terminal" />
          <span className="dot yellow" />
          {!document.fullscreenEnabled ? (
            <span className="dot green" />
          ) : (
            <button
              className="dot green"
              onClick={toggleFullscreen}
              title={isFull ? "Exit fullscreen" : "Fullscreen"}
              aria-label={isFull ? "Exit fullscreen" : "Fullscreen"}
            />
          )}
          <span className="term-name">jsh — {PROMPT}</span>
        </div>

        <div className="term-body">
          {lines.map((l, i) =>
            l.href ? (
              <a key={i} className="term-line term-link" href={l.href} target="_blank" rel="noreferrer">
                {l.text}
              </a>
            ) : (
              <div key={i} className={`term-line ${l.kind ? `term-${l.kind}` : ""}`}>
                {l.text || " "}
              </div>
            ),
          )}

          <div className="term-input" ref={endRef}>
            <span className="term-prompt">{PROMPT}</span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              autoFocus
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="send"
              aria-label="terminal input"
            />
          </div>
        </div>
      </div>

      <div className="term-keys">
        {["help", "whoami", "wisdom", "projects", "resume", "social", "theme", "clear", "exit"].map((k) => (
          <button key={k} onClick={() => run(k)}>{k}</button>
        ))}
      </div>
    </main>
  );
}
