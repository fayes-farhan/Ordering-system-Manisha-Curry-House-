import React from 'react';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { Language, t } from '../utils/translations';

interface BottomCartBarProps {
  totalItems: number;
  totalPrice: number;
  language: Language;
  onViewCart: () => void;
}

export default function BottomCartBar({ totalItems, totalPrice, language, onViewCart }: BottomCartBarProps) {
  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-sm bg-[#1A237E] text-white p-3.5 rounded-2.5xl shadow-2xl flex items-center justify-between z-50 border border-white/10 animate-slideUp select-none" id="bottom-cart-bar">
      <div className="flex items-center space-x-3" id="bottom-cart-info">
        <div className="bg-white/10 p-2.5 rounded-xl text-yellow-300 relative" id="bottom-cart-icon-wrapper">
          <ShoppingCart size={18} />
          <span 
            className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-bold font-mono w-4.5 h-4.5 rounded-full flex items-center justify-center border border-[#1A237E]"
            id="bottom-cart-counter"
          >
            {totalItems}
          </span>
        </div>
        <div id="bottom-cart-price-labels">
          <p className="text-[10px] text-neutral-400 font-sans tracking-tight uppercase animate-fadeIn">{t('cart_title_qty', language)}</p>
          <p className="font-mono text-sm font-black text-yellow-300" id="bottom-cart-price">RM {totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <button
        onClick={onViewCart}
        className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-sans font-extrabold text-[11px] uppercase tracking-wider px-4 py-2.5 rounded-xl shadow-xs active:scale-95 transition-all flex items-center space-x-1 cursor-pointer"
        id="bottom-cart-view-btn"
      >
        <span>{t('view_order', language)}</span>
        <ArrowRight size={12} className="text-white" />
      </button>
    </div>
  );
}
