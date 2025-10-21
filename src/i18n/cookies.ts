// Browser-only helpers. Import these from client components (e.g., LanguageSwitch).
// Do NOT import from .astro server files.
export type Lang = 'tr' | 'en' | 'ru';
const COOKIE_NAME = 'lang';

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const list = (document.cookie || '').split('; ').filter(Boolean);
  for (const item of list) {
    const index = item.indexOf('=');
    if (index === -1) continue;
    const key = item.slice(0, index);
    const val = item.slice(index + 1);
    if (key === name) return decodeURIComponent(val);
  }
  return null;
}

export function getLangFromCookie(): Lang {
  const v = readCookie(COOKIE_NAME);
  if (v === 'tr' || v === 'en' || v === 'ru') return v;
  return 'tr';
}

export function setLangCookie(lang: Lang) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${lang}; Path=/; Expires=${expires}; SameSite=Lax`;
}