import { useEffect, useRef } from "react";

type OrbitDot = {
  angle: number;
  radius: number;
  speed: number;
  size: number;
  hue: number;
};

const OrbitDotsLoader: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    const dots: OrbitDot[] = Array.from({ length: 18 }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      radius: 26 + Math.random() * 22,
      speed: 0.015 + Math.random() * 0.02,
      size: 3 + Math.random() * 3,
      hue: Math.random() * 360,
    }));

    const renderFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const dot of dots) {
        const x = centerX + Math.cos(dot.angle) * dot.radius;
        const y = centerY + Math.sin(dot.angle) * dot.radius;

        ctx.beginPath();
        ctx.arc(x, y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${dot.hue}, 100%, 60%)`;
        ctx.fill();

        dot.angle += dot.speed;
        dot.radius += Math.sin(dot.angle * 3) * 0.3;
      }

      frameRef.current = requestAnimationFrame(renderFrame);
    };

    renderFrame();

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="orbit-loader">
      <canvas ref={canvasRef} width={150} height={150} />
    </div>
  );
};

export default OrbitDotsLoader;
