import { config } from "../config.js";
import { setHref, setText } from "../utils/dom.js";

export function loadContact() {
  if (config.email) {
    const href = "mailto:" + config.email;
    setHref("#mail", href);
    setHref("#mail-icon", href);
    setText("#mail", config.email);
  }
  setText("#year", new Date().getFullYear());
}