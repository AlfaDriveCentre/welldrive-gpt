import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useHotkey() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const metaK = (e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k';
      if (metaK) { e.preventDefault(); setOpen(true); }
      if (e.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return { open, setOpen };
}

export default function SearchOverlay() {
  const { open, setOpen } = useHotkey();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { if (open) setTimeout(() => inputRef.current?.focus(), 10); }, [open]);

  function go() {
    if (!query.trim()) return;
    window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
  }

  return (
    <div className="relative">
      <button aria-label="Ara" className="focus-ring" onClick={() => setOpen(true)}>
        {/* Magnifying glass icon (SVG) */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 21l-4.3-4.3" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="11" cy="11" r="7" stroke="#666" strokeWidth="2"/>
        </svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div className="container-x" onClick={(e) => e.stopPropagation()}>
            <div className="mt-24 rounded-2xl border border-gray-200 bg-white shadow-lg p-3 md:p-4 transition-all duration-250 ease-out translate-y-0">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && go()}
                placeholder="Sitede ara..."
                className="w-full text-base md:text-lg p-3 md:p-4 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-0 outline-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}