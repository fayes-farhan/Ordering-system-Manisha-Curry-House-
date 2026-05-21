import React from 'react';
import { Order } from '../types';
import { BadgeCheck, Receipt, Copy, RefreshCw, Landmark } from 'lucide-react';
import { Language, t, translateItemName } from '../utils/translations';

interface ConfirmationProps {
  order: Order;
  language: Language;
  onResetSession: () => void;
}

export default function Confirmation({ order, language, onResetSession }: ConfirmationProps) {
  
  // Transform full/long database document ID into a clean 6-digit cashier slip code
  const slipCode = order.id.slice(0, 7).toUpperCase();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`MCH-${slipCode}`);
    alert(t('copied_toast', language).replace('{code}', `MCH-${slipCode}`));
  };

  return (
    <div className="space-y-6 pb-20 animate-fadeIn" id="confirmation-view-container">
      
      {/* Visual Success Accent */}
      <div className="text-center space-y-3 pt-6" id="confirmation-header-hero">
        <div className="w-18 h-18 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-xs border border-green-100" id="confirmation-icon-bullet">
          <BadgeCheck size={42} className="animate-pulse" />
        </div>
        <div id="confirmation-headings">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#2E7D32] bg-green-50 px-3 py-1 rounded-full uppercase" id="confirmation-ok-badge">
            {t('confirmed_badge_db', language)}
          </span>
          <h2 className="text-2xl font-black text-slate-800 mt-2 font-sans tracking-tight" id="confirmation-ok-title">
            {t('thank_you', language)}
          </h2>
          <p className="text-xs text-neutral-400 max-w-[85%] mx-auto leading-relaxed animate-fadeIn" id="confirmation-ok-sub">
            {t('guide_cashier', language)}
          </p>
        </div>
      </div>

      {/* POS Receipt Card Outline */}
      <div className="bg-white border border-neutral-100 rounded-3xl shadow-md overflow-hidden relative" id="confirmation-slip-card">
        {/* Top jagged element mockup decorative */}
        <div className="bg-[#2E7D32] h-2.5 w-full" />
        
        <div className="p-5 space-y-5" id="confirmation-slip-inner">
          {/* Slip Reference Code block */}
          <div className="text-center py-2.5 bg-slate-50 rounded-2.5xl space-y-1 relative" id="confirmation-slip-ref-box">
            <span className="text-[10px] text-neutral-400 font-sans tracking-wider uppercase font-semibold">{t('cashier_ref_code', language)}</span>
            
            <div className="flex items-center justify-center space-x-2" id="confirmation-slip-code-wrapper">
              <span className="text-2xl font-mono font-black text-[#1A237E] tracking-wider" id="confirmation-slip-code">
                MCH-{slipCode}
              </span>
              <button 
                onClick={handleCopyCode}
                className="p-1 px-2 text-[10px] bg-slate-200/60 hover:bg-slate-200 text-slate-600 rounded-md transition-all active:scale-90 cursor-pointer"
                title="Copy Key"
                id="confirmation-copy-btn"
              >
                <Copy size={11} className="inline mr-1" />
                <span>{t('btn_copy', language)}</span>
              </button>
            </div>
            <p className="text-[10px] text-neutral-400">{t('pay_at_counter_tag', language)}</p>
          </div>

          {/* Slip breakdown attributes */}
          <div className="space-y-2.5 text-xs text-slate-600 border-b border-dashed border-neutral-100 pb-4" id="confirmation-slip-details">
            <div className="flex justify-between" id="confirmation-slip-meja">
              <span className="text-neutral-400">{language === 'en' ? 'Table Number:' : 'Nombor Meja:'}</span>
              <span className="font-extrabold text-slate-800 font-mono">{t('table', language)} #{order.tableSession}</span>
            </div>

            <div className="flex justify-between" id="confirmation-slip-kaedah">
              <span className="text-neutral-400">{language === 'en' ? 'Payment Method:' : 'Kaedah Pembayaran:'}</span>
              <span className="font-bold text-[#2E7D32] uppercase bg-green-50 px-2 py-0.5 rounded-md font-mono text-[10px]">
                {order.paymentMethod === 'cash' 
                  ? (language === 'en' ? '💵 Pay Cash' : '💵 Bayar Tunai') 
                  : (language === 'en' ? '📱 Pay QR' : '📱 Bayar QR')}
              </span>
            </div>

            <div className="flex justify-between" id="confirmation-slip-[#]">
              <span className="text-neutral-400">{t('order_time', language)}</span>
              <span className="font-mono text-slate-800 font-semibold text-[11px]">
                {new Date(order.createdAt).toLocaleTimeString(language === 'en' ? 'en-US' : 'ms-MY', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>

            <div className="flex justify-between" id="confirmation-slip-rawid">
              <span className="text-neutral-400">{t('db_doc_id', language)}</span>
              <span className="font-mono text-neutral-400 text-[9px] select-all truncate max-w-[150px]">{order.id}</span>
            </div>
          </div>

          {/* Itemized shopping list outline */}
          <div className="space-y-2.5" id="confirmation-slip-items-container">
            <h4 className="font-sans font-extrabold text-[11px] text-[#1A237E] uppercase tracking-wider flex items-center space-x-1">
              <Receipt size={12} />
              <span>{t('dish_summary', language)}</span>
            </h4>

            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1" id="confirmation-slip-items-list">
              {order.items.map((item, id) => (
                <div key={id} className="flex justify-between items-center text-xs text-slate-700 font-sans" id={`confirmation-item-${id}`}>
                  <div className="flex flex-col min-w-0" id={`confirmation-item-left-${id}`}>
                    <span className="font-semibold text-slate-800 truncate" id={`confirmation-item-name-${id}`}>
                      {translateItemName(item.menuItemId, item.name, language)}
                    </span>
                    {item.selectedTemp && (
                      <span className="text-[9px] text-[#2E7D32] uppercase font-mono font-medium" id={`confirmation-item-temp-${id}`}>
                        {item.selectedTemp === 'panas' ? t('temp_panas_label', language) : t('temp_sejuk_label', language)}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 ml-3 flex-shrink-0" id={`confirmation-item-right-${id}`}>
                    <span className="font-mono font-bold text-neutral-400">x{item.quantity}</span>
                    <span className="font-mono font-semibold text-slate-800 min-w-[50px] text-right">
                      RM {item.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-solid border-slate-100 pt-3 flex justify-between items-center" id="confirmation-grandtotal-row">
              <span className="font-sans font-black text-slate-800 text-xs">{language === 'en' ? 'Grand Total' : 'Jumlah Keseluruhan'}</span>
              <span className="font-mono text-base font-extrabold text-[#2E7D32]" id="confirmation-grandtotal-val">
                RM {order.totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Barcode Mock segment */}
          <div className="pt-3 flex flex-col items-center justify-center space-y-2 border-t border-dashed border-neutral-100" id="confirmation-barcode-segment">
            {/* Custom high-contrast barcode vector representation */}
            <div className="flex h-11 items-center space-x-0.5 justify-center opacity-85 select-none w-full" id="confirmation-barcode" title="Bar code for invoice verification">
              <div className="w-1.5 h-full bg-slate-900" />
              <div className="w-0.5 h-full bg-slate-900" />
              <div className="w-1 h-full bg-slate-900" />
              <div className="w-0.5 h-full bg-slate-900" />
              <div className="w-2 h-full bg-slate-900" />
              <div className="w-1 h-full bg-slate-900" />
              <div className="w-0.5 h-full bg-slate-900" />
              <div className="w-1.5 h-full bg-slate-900" />
              <div className="w-1 h-full bg-slate-900" />
              <div className="w-2 h-full bg-slate-900" />
              <div className="w-0.5 h-full bg-slate-900" />
              <div className="w-1 h-full bg-slate-900" />
              <div className="w-1.5 h-full bg-slate-900" />
              <div className="w-2 h-full bg-slate-900" />
              <div className="w-0.5 h-full bg-slate-900" />
            </div>
            <span className="font-mono text-[9px] tracking-widest text-[#1A237E]/70 text-center font-bold" id="confirmation-barcode-text">
              {t('barcode_tag', language)}
            </span>
          </div>
        </div>
      </div>

      {/* Guide details boxes */}
      <div className="bg-blue-50/70 border border-blue-100 rounded-2.5xl p-4 space-y-2 text-xs flex items-start space-x-3 text-blue-800" id="confirmation-checkout-instructions-box">
        <Landmark size={18} className="shrink-0 mt-0.5 text-blue-500 animate-bounce" />
        <div className="space-y-1">
          <p className="font-bold leading-tight">{t('queue_desc_label', language)}</p>
          <p className="text-[11px] leading-relaxed text-blue-900 animate-fadeIn">
            {language === 'en' ? (
              <>Provide reference code <span className="font-mono font-bold text-slate-850 bg-blue-100 px-1 rounded">MCH-{slipCode}</span> to the Manisha Curry House cashier to settle your bill in Cash or scan their DuitNow QR code.</>
            ) : (
              <>Katakan rujukan <span className="font-mono font-bold text-slate-850 bg-blue-100 px-1 rounded">MCH-{slipCode}</span> atau tunjukkan skrin rujukan ini kepada Juruwang Manisha Curry House untuk membayar secara tunai atau mengimbas kod QR DuitNow restoran.</>
            )}
          </p>
        </div>
      </div>

      {/* Reset/New Order Button */}
      <button
        onClick={onResetSession}
        className="w-full bg-[#1A237E] hover:bg-navy-900 text-white font-sans font-bold text-xs tracking-wider py-4 rounded-3xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center space-x-2 uppercase cursor-pointer"
        id="confirmation-restart-order-btn"
      >
        <RefreshCw size={14} className="animate-spin" style={{ animationDuration: '6s' }} />
        <span>{t('btn_new_order', language)}</span>
      </button>
    </div>
  );
}
