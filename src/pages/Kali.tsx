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
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const commands: Command[] = [
    {
      name: "clear",
      description: "Clear the terminal screen",
      action: (_, set) => set([]),
    },
    {
      name: "--help",
      description: "Show all available commands",
      action: (_, set) => {
        const helpLines = commands.map(
          (cmd) => `\u25B6 ${cmd.name.padEnd(15)} - ${cmd.description}`,
        );
        set((prev) => [...prev, "", ...helpLines, ""]);
      },
    },
    {
      name: "unlock --page",
      description: "Unlock the specific page",
      action: (prev, set, unlock, setLoad) => {
        set([...prev, "Access granted."]);
        setLoad?.(true); // triggers decrypt progress + onUnlock
      },
    },
    {
      name: "sudo apt update",
      description: "Let it start updating packages",
      action: (prev, set) => {
        set([
          ...prev,
          "Hit:1 http://archive.ubuntu.com/ubuntu focal InRelease",
          "Reading package lists...",
        ]);

        let progress = 0;
        const maxBlocks = 20;
        set((prevLines) => [
          ...prevLines,
          `Downloading: [${"░".repeat(maxBlocks)}]`,
        ]);

        const interval = setInterval(() => {
          progress = Math.min(progress + 1, maxBlocks);
          set((prevLines) => {
            const copy = [...prevLines];
            copy[copy.length - 1] =
              `Downloading: [${"█".repeat(progress)}${"░".repeat(maxBlocks - progress)}]`;
            return copy;
          });
        }, 100);

        setTimeout(
          () => {
            clearInterval(interval);
            set((prevLines) => [
              ...prevLines.slice(0, -1),
              "Reading package lists... Done!",
              "Building dependency tree... Done!",
              "All packages are up to date.",
            ]);
          },
          maxBlocks * 100 + 200,
        );
      },
    },
  ];

  useEffect(() => inputRef.current?.focus(), []);

  useEffect(() => {
    const handleFocus = () => inputRef.current?.focus();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [lines]);

  useEffect(() => {
    if (!loading) return;

    let progress = 0;
    const maxBlocks = 30;
    setLines((prev) => [
      ...prev,
      `${TEXT.decrypt}: [${"░".repeat(maxBlocks)}]`,
    ]);

    const interval = setInterval(() => {
      progress = Math.min(progress + 1, maxBlocks);
      setLines((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] =
          `${TEXT.decrypt}: [${"█".repeat(progress)}${"░".repeat(maxBlocks - progress)}]`;
        return copy;
      });
    }, 200);

    const timeout = setTimeout(
      () => {
        clearInterval(interval);
        setLines((prev) => [...prev]);
        onUnlock();
        setLoading(false);
      },
      maxBlocks * 200 + 500,
    );

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [loading, onUnlock]);

  const handleCommand = () => {
    const cmd = input.trim();
    if (!cmd) return;

    const updated = [...lines, `${TEXT.prompt} ${cmd}`];
    const command = commands.find((c) => c.name === cmd);

    if (command) command.action(updated, setLines, onUnlock, setLoading);
    else setLines([...updated, TEXT.commandNotFound]);

    setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(null);
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleCommand();
    else if (e.ctrlKey && e.key.toLowerCase() === "l") {
      e.preventDefault();
      setLines([]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.length) return;
      setHistoryIndex((prev) => {
        const newIndex =
          prev === null ? history.length - 1 : Math.max(prev - 1, 0);
        setInput(history[newIndex]);
        return newIndex;
      });
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!history.length) return;
      setHistoryIndex((prev) => {
        if (prev === null) return null;
        const newIndex = Math.min(prev + 1, history.length - 1);
        setInput(history[newIndex]);
        return newIndex === history.length - 1 ? null : newIndex;
      });
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
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
        </div>
      )}
    </div>
  );
}
