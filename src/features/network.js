import { $ } from "../utils/dom.js";
import { reduceMotion } from "../utils/motion.js";

const LINK_DISTANCE = 130;

// Hero background: drifting nodes that link up and reach toward the cursor.
export function initNetwork() {
  const canvas = $("#net");
  if (!canvas) return;
  const ctx = canvas.getContext("2d"), hero = canvas.parentElement;
  const mouse = { x: -999, y: -999 };
  let W, H, nodes = [], visible = true;

  function resize() {
    const dpr = devicePixelRatio || 1;
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    nodes = Array.from({ length: Math.min(70, Math.floor(W / 18)) }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
    }));
  }

  function draw() {
    const css = getComputedStyle(document.documentElement);
    const lineColor = css.getPropertyValue("--accent").trim();
    const dotColor = css.getPropertyValue("--hot").trim();
    ctx.clearRect(0, 0, W, H);
    ctx.lineWidth = 1;
    for (const a of nodes) {
      if (!reduceMotion) {
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
      }
      for (const b of [...nodes, mouse]) {
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (a !== b && d < LINK_DISTANCE) {
          ctx.globalAlpha = (1 - d / LINK_DISTANCE) * 0.5;
          ctx.strokeStyle = lineColor;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      ctx.globalAlpha = 0.9; ctx.fillStyle = dotColor;
      ctx.beginPath(); ctx.arc(a.x, a.y, 2, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function loop() {
    if (visible && !document.hidden) draw();
    requestAnimationFrame(loop);
  }

  resize();
  addEventListener("resize", resize);
  hero.addEventListener("mousemove", (e) => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  hero.addEventListener("mouseleave", () => { mouse.x = mouse.y = -999; });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }).observe(hero);
  reduceMotion ? draw() : loop();
}
