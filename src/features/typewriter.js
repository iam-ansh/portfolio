import { $ } from "../utils/dom.js";
import { reduceMotion } from "../utils/motion.js";

export function initTypewriter(phrases) {
  const target = $("#type");
  if (!target || reduceMotion) return;
  let index = 0, count = phrases[0].length, deleting = true;

  (function tick() {
    const word = phrases[index];
    count += deleting ? -1 : 1;
    target.textContent = word.slice(0, count);
    let wait = deleting ? 35 : 70;
    if (!deleting && count === word.length) { deleting = true; wait = 1600; }
    else if (deleting && count === 0) { deleting = false; index = (index + 1) % phrases.length; wait = 300; }
    setTimeout(tick, wait);
  })();
}
