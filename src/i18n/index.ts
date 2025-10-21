// src/i18n/index.ts
import tr from './tr.json';
import en from './en.json';
import ru from './ru.json';

export type Lang = 'tr' | 'en' | 'ru';

const dicts: Record<Lang, any> = { tr, en, ru };
const COOKIE_NAME = 'lang';

export function getDefaultLang(): Lang {
  return 'tr';
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
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
  return dicts[lang] ?? dicts[getDefaultLang()];
}

// Basit bir dotted-path resolver: t(lang, 'hero.subtitle')
export function t(lang: Lang, path: string): string {
  const dict = getDict(lang);
  const val = path.split('.').reduce<any>((acc, k) => (acc && typeof acc === 'object' ? acc[k] : undefined), dict);
  if (typeof val === 'string') return val;
  // Fallback TR
  const fallback = path.split('.').reduce<any>((acc, k) => (acc && typeof acc === 'object' ? acc[k] : undefined), dicts.tr);
  return typeof fallback === 'string' ? fallback : path;
}

export const availableLangs: Lang[] = ['tr', 'en', 'ru'];
