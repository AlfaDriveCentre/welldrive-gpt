import React, { useEffect, useState, useRef } from 'react';
import { getLangFromCookie, setLangCookie, type Lang } from '../i18n/index';

const flags: Record<Lang, string> = {
  tr: '/assets/flag-tr.png',
  en: '/assets/flag-en.png',
  ru: '/assets/flag-ru.png',
};

export default function LanguageSwitch() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>('tr');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => { setLang(getLangFromCookie()); }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  function choose(l: Lang) {
    setLang(l);
    setLangCookie(l);
    // redirect to same path (no i18n routing yet; placeholder)
    setOpen(false);
  }

  return (
    <div className="relative" ref={ref}>
      <button className="flex items-center gap-2 text-[15px] text-brand-text hover:opacity-80 focus-ring" onClick={() => setOpen(v => !v)} aria-haspopup="menu" aria-expanded={open}>
        <span>Dil / Language</span>
        <img src={flags[lang]} alt="" className="h-5 w-5 rounded-full" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl border border-gray-200 bg-white shadow-md p-2 z-50">
          {(['tr','en','ru'] as Lang[]).map((l) => (
            <button key={l} onClick={() => choose(l)} className="w-full flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-gray-50 text-sm text-brand-text">
              <img src={flags[l]} alt="" className="h-5 w-5 rounded-full" />
              <span className="capitalize">{l === 'tr' ? 'Türkçe' : l === 'en' ? 'English' : 'Русский'}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}