// Cloudflare Pages Function: GET /api/instagram
// Returns the latest Instagram posts as JSON for the homepage strip.
//
// Setup (Cloudflare dashboard > Workers & Pages > this project > Settings):
//   - Variables and Secrets: IG_ACCESS_TOKEN = long-lived token from the
//     Instagram API with Instagram Login (account must be Business or Creator).
//   - Optional KV binding IG_KV: lets this function refresh the token itself
//     so it never hits the 60-day expiry. Without it, renew the token by hand.
// If no token is set, it returns { posts: [] } and the homepage shows the
// gallery photos instead.

const FIELDS = 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp';
const CACHE_SECONDS = 3600;
const REFRESH_AFTER_MS = 7 * 24 * 3600 * 1000;

async function getToken(env) {
  if (!env.IG_KV) return env.IG_ACCESS_TOKEN;
  const stored = await env.IG_KV.get('token', 'json');
  const token = stored?.token || env.IG_ACCESS_TOKEN;
  if (!token) return null;
  if (!stored || Date.now() - stored.refreshedAt > REFRESH_AFTER_MS) {
    try {
      const r = await fetch(`https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${encodeURIComponent(token)}`);
      if (r.ok) {
        const j = await r.json();
        if (j.access_token) {
          await env.IG_KV.put('token', JSON.stringify({ token: j.access_token, refreshedAt: Date.now() }));
          return j.access_token;
        }
      }
    } catch {}
  }
  return token;
}

function json(body, maxAge) {
  return new Response(JSON.stringify(body), {
    headers: { 'content-type': 'application/json', 'cache-control': `public, max-age=${maxAge}` },
  });
}

export async function onRequestGet({ request, env, waitUntil }) {
  const cache = caches.default;
  const cacheKey = new Request(new URL('/api/instagram', request.url).toString());
  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const token = await getToken(env);
  if (!token) return json({ posts: [], reason: 'not-configured' }, 300);

  try {
    const r = await fetch(`https://graph.instagram.com/me/media?fields=${FIELDS}&limit=12&access_token=${encodeURIComponent(token)}`);
    if (!r.ok) return json({ posts: [], reason: 'instagram-error' }, 300);
    const { data = [] } = await r.json();
    const posts = data
      .map((p) => ({
        image: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
        url: p.permalink,
        caption: (p.caption || '').split('\n')[0].slice(0, 120),
      }))
      .filter((p) => p.image && p.url)
      .slice(0, 6);
    const res = json({ posts }, CACHE_SECONDS);
    waitUntil(cache.put(cacheKey, res.clone()));
    return res;
  } catch {
    return json({ posts: [], reason: 'fetch-failed' }, 300);
  }
}
