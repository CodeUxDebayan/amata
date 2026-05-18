import { useEffect, useRef } from 'react';
import styles from './Cursor.module.css';

export default function Cursor() {
  const canvasRef = useRef(null);
  const dotRef    = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canvas = canvasRef.current;
    const dot    = dotRef.current;
    if (!canvas || !dot) return;

    const ctx = canvas.getContext('2d');
    let mx = -200, my = -200, dx = -200, dy = -200;
    const trails = [];

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;
      trails.push({ x: mx, y: my, r: Math.random() * 3.5 + 1.5, life: 1 });
    }
    window.addEventListener('mousemove', onMove);

    let rafId;
    (function loop() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dx += (mx - dx) * 0.14;
      dy += (my - dy) * 0.14;
      dot.style.left = dx + 'px';
      dot.style.top  = dy + 'px';
      for (let i = trails.length - 1; i >= 0; i--) {
        const t = trails[i];
        t.life -= 0.045;
        t.r    *= 0.96;
        if (t.life <= 0) { trails.splice(i, 1); continue; }
        ctx.beginPath();
        ctx.arc(t.x, t.y, t.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(10,45,51,${t.life * 0.22})`;
        ctx.fill();
      }
      rafId = requestAnimationFrame(loop);
    })();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} id="cursor-canvas" className={styles.canvas} />
      <div ref={dotRef} className={`amata-cursor-dot ${styles.dot}`} />
    </>
  );
}
