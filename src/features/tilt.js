import { reduceMotion } from "../utils/motion.js";

export function enableTilt(node) {
  if (reduceMotion || matchMedia("(hover: none)").matches) return;
  node.addEventListener("mousemove", (e) => {
    const r = node.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    node.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg) translateY(-3px)`;
  });
  node.addEventListener("mouseleave", () => { node.style.transform = ""; });
}
