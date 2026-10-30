import { $$ } from "../utils/dom.js";
import { reduceMotion } from "../utils/motion.js";

function animate(node, to) {
  if (reduceMotion || to === 0) { node.textContent = to; return; }
  const start = performance.now(), duration = 1200;
  (function step(now) {
    const k = Math.min((now - start) / duration, 1);
    node.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(step);
  })(start);
}

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      animate(entry.target, Number(entry.target.dataset.to));
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.6 });

// Count up to `value` when visible. Non-numbers like "500+" are shown as text.
export function watchCounter(node, value) {
  if (!node || value === undefined || value === null) return;
  const number = Number(value);
  if (!Number.isFinite(number)) { node.textContent = value; return; }
  node.dataset.to = number;
  node.textContent = "0";
  observer.observe(node);
}

export function initCounters() {
  $$("[data-count]").forEach((node) => watchCounter(node, node.dataset.count));
}
