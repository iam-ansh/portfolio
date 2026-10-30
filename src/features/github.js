import { config } from "../config.js";
import { $, $$, el, setText } from "../utils/dom.js";
import { getGitHubProfile } from "../services/github.js";
import { watchCounter } from "./counters.js";
import { watchReveals } from "./reveal.js";
import { enableTilt } from "./tilt.js";

function renderRepo(repo) {
  const meta = el("div", { className: "meta" });
  if (repo.language) meta.append(el("span", { className: "tag", text: repo.language }));
  meta.append(
    el("span", { text: `${repo.stargazers_count} stars` }),
    el("span", { text: "Updated " + new Date(repo.pushed_at).toLocaleDateString() }),
  );
  const card = el("li", { className: "reveal" },
    el("h3", {}, el("a", { href: repo.html_url, target: "_blank", rel: "noopener", text: repo.name })),
    el("p", { text: repo.description || "No description yet." }),
    meta,
  );
  enableTilt(card);
  return card;
}

function showName(user) {
  const name = user.name || user.login;
  document.title = name + " – ML & Backend Portfolio";
  setText("#logo", name.split(" ")[0]);
  setText("#hello", "Hi, I'm " + name + ".");
  setText("#foot-name", name);
}

function showStats(user) {
  watchCounter($('[data-stat="repos"]'), user.public_repos);
  watchCounter($('[data-stat="followers"]'), user.followers);
}

function showFallback(list, status, err) {
  const template = $("#fallback");
  list.replaceChildren(...(template ? template.content.cloneNode(true).children : []));
  const reason = err.rateLimited ? "GitHub's request limit was reached." : "Could not load repositories right now.";
  status.replaceChildren(reason + " ", el("a", { href: "https://github.com/" + config.githubUser, text: "See them on GitHub" }), ".");
}

export async function loadGitHub() {
  const { githubUser, maxRepos } = config;
  const list = $("#repo-list"), status = $("#repo-status");
  if (!list || !status) return;
  if (!githubUser) {
    list.replaceChildren();
    status.textContent = "Set VITE_GITHUB_USER in your .env file to show your projects.";
    return;
  }

  $$("a[data-gh]").forEach((a) => {
    a.setAttribute("href", "https://github.com/" + githubUser);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });

  try {
    const { user, repos } = await getGitHubProfile(githubUser);
    showName(user);
    showStats(user);
    if (!repos.length) {
      list.replaceChildren();
      status.textContent = "No public repositories yet. Check back soon.";
      return;
    }
    list.replaceChildren(...repos.slice(0, maxRepos).map(renderRepo));
    status.textContent = "Latest public repositories, loaded live from GitHub.";
    watchReveals(list);
  } catch (err) {
    console.error("GitHub load failed:", err);
    showFallback(list, status, err);
  }
}
