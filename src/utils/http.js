const TTL = 10 * 60 * 1000;

function readCache(key) {
  try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
}


export async function cachedJson(url, ttl = TTL) {
  const key = "cache:" + url;
  const hit = readCache(key);
  if (hit && Date.now() - hit.time < ttl) return hit.data;

  try {
    const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
    if (!res.ok) {
      const err = new Error("HTTP " + res.status + " for " + url);
      err.rateLimited = res.status === 403 && res.headers.get("x-ratelimit-remaining") === "0";
      throw err;
    }
    const data = await res.json();
    try { localStorage.setItem(key, JSON.stringify({ time: Date.now(), data })); } catch {}
    return data;
  } catch (err) {
    if (hit) return hit.data;
    throw err;
  }
}
