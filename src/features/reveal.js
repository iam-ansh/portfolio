import { $$ } from "../utils/dom.js";

const observer = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      entry.target.classList.add("in");
      observer.unobserve(entry.target);
    }
  }
}, { threshold: 0.15 });

// Fade elements in as they scroll into view (call again after adding new ones).
export function watchReveals(root = document) {
  $$(".reveal:not(.in)", root).forEach((node, i) => {
    node.style.setProperty("--d", (i % 4) * 90 + "ms");
    observer.observe(node);
  });
}
