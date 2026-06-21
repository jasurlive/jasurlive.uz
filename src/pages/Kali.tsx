
import { useState, useEffect, useRef, KeyboardEvent } from "react";
import "../add/css/kali.css";

interface KaliProps {
  onUnlock: () => void;
}

interface Command {
  name: string;
  description: string;
  action: (
    lines: string[],
    setLines: React.Dispatch<React.SetStateAction<string[]>>,
    onUnlock: () => void,
    setLoading?: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
}

const TEXT = {
  welcome: "GNU v0.1",
  prompt: "root@kali:~#",
  commandNotFound: "Command not found. Type '--help' to list commands.",
  decrypt: "Decrypting access",
};

export default function Kali({ onUnlock }: KaliProps) {
  const [lines, setLines] = useState<string[]>([TEXT.welcome]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const historyIndex = useRef<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const commands: Command[] = [
    {
      name: "clear",
      description: "Clear the terminal screen",
      action: (_, set) => set([]),
    },
    {
      name: "--help",
      description: "Show all available commands",
      action: (_, set) =>
        set((prev) => [
          ...prev,
          "",
          ...commands.map(
            (cmd) => `▶ ${cmd.name.padEnd(15)} - ${cmd.description}`,
          ),
          "",
        ]),
    },
    {
      name: "unlock --page",
      description: "Unlock the specific page",
      action: (prev, set, _, setLoading) => {
        set([...prev, "Access granted."]);
        setLoading?.(true);
      },
    },
    {
      name: "sudo apt update",
      description: "Update packages",
      action: (prev, set) => {
        const max = 20;

        set([
          ...prev,
          "Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease",
          "Reading package lists...",
          `Downloading: [${"░".repeat(max)}]`,
        ]);

        let progress = 0;

        const interval = setInterval(() => {
          progress++;

          set((lines) => {
            const copy = [...lines];
            copy[copy.length - 1] =
              `Downloading: [${"█".repeat(progress)}${"░".repeat(max - progress)}]`;
            return copy;
          });

          if (progress === max) {
            clearInterval(interval);

            setTimeout(() => {
              set((lines) => [
                ...lines.slice(0, -1),
                "Reading package lists... Done!",
                "Building dependency tree... Done!",
                "All packages are up to date.",
              ]);
            }, 200);
          }
        }, 100);
      },
    },
  ];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const focus = () => inputRef.current?.focus();

    window.addEventListener("focus", focus);
    return () => window.removeEventListener("focus", focus);
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  useEffect(() => {
    if (!loading) return;

    const max = 30;
    let progress = 0;

    setLines((prev) => [
      ...prev,
      `${TEXT.decrypt}: [${"░".repeat(max)}]`,
    ]);

    const interval = setInterval(() => {
      progress++;

      setLines((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] =
          `${TEXT.decrypt}: [${"█".repeat(progress)}${"░".repeat(max - progress)}]`;
        return copy;
      });

      if (progress === max) {
        clearInterval(interval);

        setTimeout(() => {
          onUnlock();
          setLoading(false);
        }, 500);
      }
    }, 200);

    return () => clearInterval(interval);
  }, [loading, onUnlock]);

  const handleCommand = () => {
    const cmd = input.trim();

    if (!cmd) return;

    const updated = [...lines, `${TEXT.prompt} ${cmd}`];
    const command = commands.find((c) => c.name === cmd);

    command
      ? command.action(updated, setLines, onUnlock, setLoading)
      : setLines([...updated, TEXT.commandNotFound]);

    setHistory((prev) => [...prev, cmd]);
    historyIndex.current = null;
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand();
      return;
    }

    if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setLines([]);
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      if (!history.length) return;

      historyIndex.current =
        historyIndex.current === null
          ? history.length - 1
          : Math.max(historyIndex.current - 1, 0);

      setInput(history[historyIndex.current]);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      if (!history.length || historyIndex.current === null) return;

      historyIndex.current++;

      if (historyIndex.current >= history.length) {
        historyIndex.current = null;
        setInput("");
        return;
      }

      setInput(history[historyIndex.current]);
    }
  };

  return (
    <div
      ref={containerRef}
      className="terminal-container"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, i) => (
        <div key={i} className="terminal-line">
          {line}
        </div>
      ))}

      {!loading && (
        <div className="terminal-input">
          <span>{TEXT.prompt}</span>

          <input
            ref={inputRef}
            value={input}
            autoComplete="off"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      )}
    </div>
  );
}