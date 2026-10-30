export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Null-safe setters: a missing element never crashes the page.
export function setText(selector, text) {
  const node = $(selector);
  if (node) node.textContent = text;
}
export function setHref(selector, href) {
  const node = $(selector);
  if (node) node.setAttribute("href", href);
}

// Tiny element builder: el("a", { href: "/", text: "Home" }, ...children)
export function el(tag, { className, text, ...attrs } = {}, ...children) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  node.append(...children);
  return node;
}
