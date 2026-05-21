import React from 'react';
import { Utensils, Clock, MapPin } from 'lucide-react';
import { Language, t } from '../utils/translations';

interface HeaderProps {
  tableNumber: string;
  language: Language;
  setLanguage: (lang: Language) => void;
  onEditTable: () => void;
  onGoHome: () => void;
}

export default function Header({ tableNumber, language, setLanguage, onEditTable, onGoHome }: HeaderProps) {
  return (
    <header className="bg-[#2E7D32] text-white py-4 px-5 shadow-md flex items-center justify-between sticky top-0 z-40 rounded-b-2xl">
      <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={onGoHome} id="header-logo-container">
        <div className="bg-white text-[#2E7D32] p-2 rounded-xl shadow-inner flex items-center justify-center" id="header-logo-inner">
          <Utensils size={20} className="animate-pulse" />
        </div>
        <div>
          <h1 className="font-sans font-extrabold text-base tracking-tight leading-tight" id="header-title">
            Manisha Curry House
          </h1>
          <div className="flex items-center space-x-2 text-[10px] text-green-100 font-mono mt-0.5" id="header-meta-info">
            <span className="flex items-center bg-green-950/40 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-semibold">
              <Clock size={10} className="mr-0.5 inline" /> {t('24_hours_open', language)}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end space-y-1.5">
        <button 
          onClick={onEditTable}
          className="flex items-center space-x-1 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white font-mono text-[11px] px-2.5 py-1 rounded-full transition-all border border-white/20"
          id="header-table-badge"
        >
          <MapPin size={11} className="text-yellow-300" />
          <span>{t('table', language)} #{tableNumber}</span>
        </button>

        {/* Tactile language toggle */}
        <div className="flex items-center bg-green-950/40 p-0.5 rounded-lg border border-white/15 select-none text-[9px] font-bold" id="language-switcher">
          <button
            onClick={() => setLanguage('ms')}
            className={`px-2 py-0.5 rounded-md transition-all duration-200 cursor-pointer ${
              language === 'ms'
                ? 'bg-white text-green-900 font-black shadow-xs'
                : 'text-green-150 hover:text-white'
            }`}
            id="lang-switch-bm"
            title="Bahasa Melayu"
          >
            BM
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-0.5 rounded-md transition-all duration-200 cursor-pointer ${
              language === 'en'
                ? 'bg-white text-green-900 font-black shadow-xs'
                : 'text-green-150 hover:text-white'
            }`}
            id="lang-switch-en"
            title="English"
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
