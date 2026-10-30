import { config } from "./config.js";
import { initTheme } from "./features/theme.js";
import { initProgress } from "./features/progress.js";
import { initTypewriter } from "./features/typewriter.js";
import { watchReveals } from "./features/reveal.js";
import { initCounters } from "./features/counters.js";
import { initNetwork } from "./features/network.js";
import { loadContact } from "./features/contact.js";
import { loadGitHub } from "./features/github.js";
import { loadLinkedin } from "./features/linkedin.js";

// Each step runs on its own, so one failing never stops the others.
const steps = [
  initTheme,
  initProgress,
  () => initTypewriter(config.phrases),
  watchReveals,
  initCounters,
  initNetwork,
  loadContact,
  loadLinkedin,
  loadGitHub,
];

for (const step of steps) {
  try {
    const result = step();
    if (result instanceof Promise) result.catch((err) => console.error(err));
  } catch (err) {
    console.error("Startup step failed:", err);
  }
}
