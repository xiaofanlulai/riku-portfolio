"use client";

import { useEffect, useRef } from "react";

interface Bubble {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  driftOffset: number;
  opacity: number;
}

function createBubble(canvasWidth: number, canvasHeight: number, randomY = false): Bubble {
  return {
    x: Math.random() * canvasWidth,
    y: randomY ? Math.random() * canvasHeight : canvasHeight + Math.random() * 200,
    r: Math.random() * 10 + 3,
    speed: Math.random() * 0.5 + 0.2,
    drift: Math.random() * 0.4 - 0.2,
    driftOffset: Math.random() * Math.PI * 2,
    opacity: Math.random() * 0.06 + 0.02,
  };
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let bubbles: Bubble[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      resize();
      bubbles = Array.from({ length: 60 }, () =>
        createBubble(canvas.width, canvas.height, true)
      );
    };

    let tick = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;

      bubbles.forEach((b) => {
        // 上昇 + sin波の横揺れ
        b.y -= b.speed;
        b.x += Math.sin(tick * 0.01 + b.driftOffset) * b.drift;

        // 画面外に出たらリセット
        if (b.y + b.r < 0) {
          Object.assign(b, createBubble(canvas.width, canvas.height, false));
        }

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${b.opacity * 1.5})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.fillStyle = `rgba(255,255,255,${b.opacity})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();

    window.addEventListener("resize", () => {
      resize();
    });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
