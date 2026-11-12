import { useEffect, useRef } from "react";

// falling green characters behind the page (matrix theme only), ~20 fps
export default function MatrixRain() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const size = 16;
    const chars = "01"; //アカサタナハマヤラワ add these if you want
    let drops: number[] = [];

    const resize = () => {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
      drops = Array.from({ length: Math.ceil(innerWidth / size) }, () => Math.random() * -50);
    };
    resize();
    addEventListener("resize", resize);

    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setInterval(() => {
      ctx.fillStyle = "rgb(0 0 0 / 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#00ff66";
      ctx.font = `${size}px monospace`;
      drops.forEach((y, i) => {
        ctx.fillText(chars[(Math.random() * chars.length) | 0], i * size, y * size);
        drops[i] = y * size > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    }, still ? 1e9 : 50);

    return () => {
      clearInterval(timer);
      removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="matrix-rain" aria-hidden="true" />;
}
