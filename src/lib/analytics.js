/**
 * Cookieless, privacy-friendly analytics wrapper (no consent banner needed).
 *
 * Nothing loads or tracks until you configure ONE provider via env vars.
 * Create a `.env` (or set them in your host's dashboard) with one of:
 *
 *   # Plausible (hosted or self-hosted)
 *   VITE_PLAUSIBLE_DOMAIN=axellapierre.dev
 *   # optional, if self-hosted:
 *   VITE_PLAUSIBLE_SRC=https://plausible.example.com/js/script.js
 *
 *   # — or — Umami (cloud or self-hosted)
 *   VITE_UMAMI_WEBSITE_ID=xxxxxxxx-xxxx-xxxx
 *   VITE_UMAMI_SRC=https://cloud.umami.is/script.js
 *
 * Both are GDPR-friendly and don't use cookies. If neither is set, every
 * function below is a safe no-op — the site works exactly the same.
 */

const env = import.meta.env;
let provider = null;

function injectScript(src, attrs) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement('script');
  s.src = src;
  Object.entries(attrs).forEach(([k, v]) => {
    if (v === true) s.setAttribute(k, '');
    else s.setAttribute(k, String(v));
  });
  document.head.appendChild(s);
}

export function initAnalytics() {
  if (typeof document === 'undefined' || provider) return;

  const plausibleDomain = env.VITE_PLAUSIBLE_DOMAIN;
  const umamiId = env.VITE_UMAMI_WEBSITE_ID;

  if (plausibleDomain) {
    provider = 'plausible';
    // Queue stub so events fired before the script loads are not lost.
    window.plausible =
      window.plausible ||
      function () {
        (window.plausible.q = window.plausible.q || []).push(arguments);
      };
    injectScript(env.VITE_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js', {
      'data-domain': plausibleDomain,
      defer: true,
    });
  } else if (umamiId) {
    provider = 'umami';
    injectScript(env.VITE_UMAMI_SRC || 'https://cloud.umami.is/script.js', {
      'data-website-id': umamiId,
      defer: true,
    });
  }
}

/**
 * Track a custom event. Safe to call anywhere — no-ops if no provider is set.
 * @param {string} name  Human-readable event name, e.g. 'Project View'.
 * @param {object} props Optional key/value metadata, e.g. { slug: 'domainradar' }.
 */
export function trackEvent(name, props = {}) {
  try {
    if (provider === 'plausible' && typeof window.plausible === 'function') {
      window.plausible(name, { props });
    } else if (provider === 'umami' && window.umami) {
      window.umami.track(name, props);
    }
  } catch {
    /* analytics must never break the app */
  }
}
