import { useTypewriter } from "../hooks/LOCAL/useTypewriter";

export default function Typewriter({ words }: { words: string[] }) {
  const text = useTypewriter(words);

  return (
    <p className="typewriter" aria-live="polite">
      <span className="typewriter-prompt">&gt;</span> {text}
      <span className="typewriter-cursor" aria-hidden="true" />
    </p>
  );
}
