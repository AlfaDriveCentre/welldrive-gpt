
import tr from './tr.json';
import en from './en.json';
import ru from './ru.json';

export type Lang = 'tr' | 'en' | 'ru';

const dicts = { tr, en, ru } as const;

export function getT(lang: Lang = 'tr') {
  return (dicts[lang] || dicts.tr) as typeof tr;
}
