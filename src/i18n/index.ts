import tr from './tr.json';
import en from './en.json';
import ru from './ru.json';

export type Lang = 'tr' | 'en' | 'ru';

const dicts: Record<Lang, any> = { tr, en, ru };
const COOKIE_NAME = 'lang';

const DEFAULTS = {
  hero: {
    title: 'WellDrive',
    subtitle: '',
    desc: '',
    cta: { quote: '', details: '' }
  }
} as const;

// Shallow/Deep merge helper so that t.hero.* is always defined
function deepMerge<T extends Record<string, any>, U extends Record<string, any>>(a: T, b: U): T & U {
  const out: any = Array.isArray(a) ? [...a] : { ...a };
  for (const [k, v] of Object.entries(b)) {
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      out[k] = deepMerge((out[k] ?? {}) as any, v as any);
    } else {
      out[k] = v;
    }
  }
  return out;
}

export function getDefaultLang(): Lang {
  return 'tr';
}

// Safer cookie reader (no RegExp to avoid SSR quirks)
function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const list = (document.cookie || '').split('; ').filter(Boolean);
  for (const item of list) {
    const idx = item.indexOf('=');
    if (idx === -1) continue;
    const key = item.slice(0, idx);
    const val = item.slice(idx + 1);
    if (key === name) return decodeURIComponent(val);
  }
  return null;
}

export function getLangFromCookie(): Lang {
  const v = readCookie(COOKIE_NAME);
  if (v === 'tr' || v === 'en' || v === 'ru') return v;
  return getDefaultLang();
}

export function setLangCookie(lang: Lang) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${COOKIE_NAME}=${lang}; Path=/; Expires=${expires}; SameSite=Lax`;
}

export function getDict(lang: Lang) {
  const base = dicts[lang] ?? dicts[getDefaultLang()];
  return deepMerge(DEFAULTS as any, (base || {}) as any) as typeof tr;
}

// Optional helper: dotted-path reader
export function t(lang: Lang, path: string): string {
  const dict = getDict(lang);
  const val = path.split('.').reduce<any>((acc, k) => (acc && typeof acc === 'object' ? acc[k] : undefined), dict);
  if (typeof val === 'string') return val;
  const fallback = path.split('.').reduce<any>((acc, k) => (acc && typeof acc === 'object' ? acc[k] : undefined), dicts.tr);
  return typeof fallback === 'string' ? fallback : path;
}

export const availableLangs: Lang[] = ['tr', 'en', 'ru'];