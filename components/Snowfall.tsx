import React, { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  drift: number;
}

const Snowfall: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevWidthRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let flakes: Snowflake[] = [];

    const initFlakes = (width: number, height: number) => {
      const flakeCount = Math.floor((width * height) / 12000); 
      flakes = [];
      for (let i = 0; i < flakeCount; i++) {
        flakes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.5,
          speed: Math.random() * 1 + 0.2,
          opacity: Math.random() * 0.5 + 0.1,
          drift: Math.random() * 1 - 0.5,
        });
      }
    };

    const handleResize = () => {
      if (canvas && ctx) {
        const currentWidth = window.innerWidth;
        const currentHeight = window.innerHeight;

        if (currentWidth === prevWidthRef.current && prevWidthRef.current !== 0) {
             canvas.height = currentHeight * (window.devicePixelRatio || 1);
             canvas.style.height = `${currentHeight}px`;
             ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
             return;
        }

        prevWidthRef.current = currentWidth;

        const dpr = window.devicePixelRatio || 1;
        
        canvas.width = currentWidth * dpr;
        canvas.height = currentHeight * dpr;

        canvas.style.width = `${currentWidth}px`;
        canvas.style.height = `${currentHeight}px`;

        ctx.scale(dpr, dpr);

        initFlakes(currentWidth, currentHeight);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      flakes.forEach((flake) => {
        flake.y += flake.speed;
        flake.x += flake.drift;

        if (flake.y > window.innerHeight) {
          flake.y = -5;
          flake.x = Math.random() * window.innerWidth;
        }
        if (flake.x > window.innerWidth) {
          flake.x = 0;
        } else if (flake.x < 0) {
          flake.x = window.innerWidth;
        }

        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full bg-black pointer-events-none z-0"
    />
  );
};

export default Snowfall;
