export type Lang = 'tr' | 'en' | 'ru';

const modules = import.meta.glob('./*.json', { eager: true });
const cache: Record<string, any> = {};

export async function loadLang(lang: Lang = 'tr') {
  if (cache[lang]) return cache[lang];
  const key = `./${lang}.json`;
  const mod: any = (modules as any)[key];
  if (!mod || !mod.default) {
    return (modules as any)['./tr.json'].default;
  }
  cache[lang] = mod.default;
  return cache[lang];
}

export function getLangFromCookie(): Lang {
  if (typeof document === 'undefined') return 'tr';
  const m = document.cookie.match(/(?:^|; )lang=([^;]+)/);
  const v = m ? decodeURIComponent(m[1]) : '';
  if (v === 'en' || v === 'ru' || v === 'tr') return v as Lang;
  const nav = navigator?.language?.toLowerCase() || '';
  if (nav.startsWith('tr')) return 'tr';
  if (nav.startsWith('ru')) return 'ru';
  return 'en';
}

export function setLangCookie(lang: Lang) {
  document.cookie = `lang=${lang}; Max-Age=31536000; Path=/; SameSite=Lax`;
}
