import React, { useEffect, useRef, useState } from 'react';
import type { Lang } from '../i18n/cookies';
import { getLangFromCookie, setLangCookie } from '../i18n/cookies';

const flags: Record<Lang, string> = {
  tr: '/Turkish-Flag.png',
  en: '/English-Flag.png',
  ru: '/Russian-Flag.png',
};

export default function LanguageSwitch() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('tr');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLang(getLangFromCookie());
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  function choose(l: Lang) {
    setLang(l);
    setLangCookie(l);
    setOpen(false);
    // Tercihen sayfayı yenilemeden i18n context güncellenebilir; şimdilik reload:
    location.reload();
  }

  return (
    <div className="relative" ref={ref}>
      <button className="flex items-center gap-2" onClick={() => setOpen(!open)}>
        <img src={flags[lang]} className="h-4 w-6 object-cover rounded-sm" alt={lang} />
        <span className="text-sm">Dil / Language</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg p-2 w-40">
          {(['tr','en','ru'] as Lang[]).map((l) => (
            <button key={l} onClick={() => choose(l)} className="w-full flex items-center gap-2 px-2 py-1 hover:bg-gray-100 rounded">
              <img src={flags[l]} className="h-4 w-6 object-cover rounded-sm" alt={l} />
              <span className="text-sm uppercase">{l}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}