import { config } from "../config.js";
import { $, setHref } from "../utils/dom.js";
import { watchCounter } from "./counters.js";


function showStat(key, value) {
  const node = $(`[data-li="${key}"]`);
  if (!node || !value) return;
  node.parentElement.hidden = false;
  watchCounter(node, value);
}

export function loadLinkedin() {
  const { linkedinHandle, linkedinConnections, linkedinFollowers } = config;
  if (linkedinHandle) {
    setHref("#linkedin", "https://www.linkedin.com/in/" + linkedinHandle);
  }
  showStat("connections", linkedinConnections);
}
