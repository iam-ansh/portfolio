import { cachedJson } from "../utils/http.js";

const API = "https://api.github.com/users/";

export async function getGitHubProfile(username) {
  const [user, repos] = await Promise.all([
    cachedJson(API + username),
    cachedJson(API + username + "/repos?sort=pushed&per_page=30"),
  ]);
  return { user, repos: repos.filter((repo) => !repo.fork) };
}
