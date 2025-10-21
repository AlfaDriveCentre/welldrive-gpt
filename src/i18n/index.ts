import tr from './tr.json';
import en from './en.json';
import ru from './ru.json';

export type Lang = 'tr' | 'en' | 'ru';

const dicts: Record<Lang, any> = { tr, en, ru };

const DEFAULTS = {
  hero: {
    title: 'WellDrive',
    subtitle: '',
    desc: '',
    cta: { quote: '', details: '' }
  }
} as const;

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

// Server-safe: no document/window here
export function getDict(lang: Lang) {
  const base = dicts[lang] ?? dicts['tr'];
  return deepMerge(DEFAULTS as any, (base || {}) as any) as typeof tr;
}

export function t(lang: Lang, path: string): string {
  const dict = getDict(lang);
  const val = path.split('.').reduce<any>((acc, k) => (acc && typeof acc === 'object' ? acc[k] : undefined), dict);
  if (typeof val === 'string') return val;
  const fallback = path.split('.').reduce<any>((acc, k) => (acc && typeof acc === 'object' ? acc[k] : undefined), dicts.tr);
  return typeof fallback === 'string' ? fallback : path;
}

export const availableLangs: Lang[] = ['tr', 'en', 'ru'];