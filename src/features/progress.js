import { $ } from "../utils/dom.js";

export function initProgress() {
  const bar = $("#progress");
  if (!bar) return;
  addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  }, { passive: true });
}
