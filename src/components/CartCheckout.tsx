import React, { useState } from 'react';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, CreditCard, Banknote, ShieldAlert, ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import { Language, t, translateItemName } from '../utils/translations';

interface CartCheckoutProps {
  cart: CartItem[];
  tableNumber: string;
  language: Language;
  onUpdateQuantity: (menuItemId: string, temp: 'panas' | 'sejuk' | null, change: number) => void;
  onRemoveItem: (menuItemId: string, temp: 'panas' | 'sejuk' | null) => void;
  onSubmitOrder: (paymentMethod: 'cash' | 'qr') => Promise<void>;
  onBackToMenu: () => void;
}

export default function CartCheckout({
  cart,
  tableNumber,
  language,
  onUpdateQuantity,
  onRemoveItem,
  onSubmitOrder,
  onBackToMenu
}: CartCheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qr'>('cash');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Calculate overall calculations
  const totalAmount = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleProcessCheckout = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await onSubmitOrder(paymentMethod);
    } catch (err: any) {
      setErrorMessage(err.message || (language === 'en' ? 'Failed to submit order. Please try again.' : 'Gagal menghantar pesanan. Sila cuba sekali lagi.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 pb-24 animate-fadeIn" id="cart-checkout-container">
      
      {/* Header Banner */}
      <div className="flex items-center space-x-3 border-b border-neutral-100 pb-3" id="cart-header-row">
        <button 
          onClick={onBackToMenu}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-xl transition-all cursor-pointer"
          id="cart-back-btn"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h2 className="font-sans font-black text-lg text-slate-800" id="cart-title">{t('your_cart', language)}</h2>
          <p className="text-[11px] text-neutral-400 font-mono mt-0.5 uppercase tracking-wide">
            {t('table', language)} #{tableNumber} • {totalItemsCount} {language === 'en' ? 'Items' : 'Item'}
          </p>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-16 px-6 bg-slate-50 rounded-3xl border border-dashed border-slate-200" id="cart-empty-state">
          <Trash2 className="mx-auto text-neutral-300 mb-4 animate-bounce" size={44} />
          <h3 className="font-sans font-bold text-slate-800 text-sm">{t('cart_empty', language)}</h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-[80%] mx-auto leading-relaxed">
            {t('cart_empty_desc', language)}
          </p>
          <button
            onClick={onBackToMenu}
            className="mt-6 bg-[#2E7D32] hover:bg-[#1B5E20] text-white active:scale-95 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs uppercase tracking-wider cursor-pointer"
            id="cart-browse-btn"
          >
            {t('btn_start_browsing', language)}
          </button>
        </div>
      ) : (
        <>
          {/* Cart Itemized List */}
          <div className="space-y-3" id="cart-items-list">
            {cart.map((item, idx) => (
              <div 
                key={`${item.menuItemId}-${item.selectedTemp || 'none'}`}
                className="bg-white border border-neutral-100 rounded-2xl p-4 flex items-center justify-between shadow-xs"
                id={`cart-row-${idx}`}
              >
                {/* Left Side Info */}
                <div className="space-y-1 pr-4 mr-auto flex-1">
                  <h4 className="font-sans font-bold text-[13px] text-[#1A237E] leading-tight animate-fadeIn">
                    {translateItemName(item.menuItemId, item.name, language)}
                  </h4>
                  {item.selectedTemp && (
                    <span 
                      className={`inline-flex items-center space-x-1 text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                        item.selectedTemp === 'panas' 
                          ? 'bg-orange-50 text-orange-600 border border-orange-100' 
                          : 'bg-blue-50 text-blue-600 border border-blue-100'
                      }`}
                    >
                      <span>{item.selectedTemp === 'panas' ? '🔥' : '❄️'}</span>
                      <span>{item.selectedTemp === 'panas' ? t('temp_panas_label', language) : t('temp_sejuk_label', language)}</span>
                    </span>
                  )}
                  <p className="text-[11px] text-neutral-400 font-mono font-bold">
                    RM {item.unitPrice.toFixed(2)} / unit
                  </p>
                </div>

                {/* Right Side Adjustment Row */}
                <div className="flex items-center space-x-3 select-none shrink-0" id={`cart-adjuster-${idx}`}>
                  {/* Quantity adjustment buttons */}
                  <div className="bg-slate-100/95 py-1.5 px-2.5 rounded-xl flex items-center space-x-3.5 border border-slate-205/60">
                    <button
                      onClick={() => onUpdateQuantity(item.menuItemId, item.selectedTemp, -1)}
                      className="text-slate-600 hover:text-black hover:bg-slate-200/80 p-1 rounded-md transition-all shrink-0 active:scale-80 cursor-pointer"
                      title="Minus"
                      id={`cart-decrease-${idx}`}
                    >
                      <Minus size={11} strokeWidth={3} />
                    </button>
                    <span className="font-mono text-xs font-extrabold text-slate-800" id={`cart-qty-text-${idx}`}>{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.menuItemId, item.selectedTemp, 1)}
                      className="text-slate-600 hover:text-black hover:bg-slate-200/80 p-1 rounded-md transition-all shrink-0 active:scale-80 cursor-pointer"
                      title="Add"
                      id={`cart-increase-${idx}`}
                    >
                      <Plus size={11} strokeWidth={3} />
                    </button>
                  </div>

                  {/* Individual subtotal cost */}
                  <span className="font-mono text-xs font-bold text-slate-800 min-w-[50px] text-right" id={`cart-subtotal-${idx}`}>
                    RM {item.subtotal.toFixed(2)}
                  </span>

                  {/* Remove bin button */}
                  <button
                    onClick={() => onRemoveItem(item.menuItemId, item.selectedTemp)}
                    className="p-1.5 text-red-100 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                    title="Remove"
                    id={`cart-remove-${idx}`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Table Verification Notification */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-start space-x-3" id="cart-table-info-bar">
            <span className="text-lg">📍</span>
            <div className="space-y-0.5 text-xs">
              <h5 className="font-bold text-slate-800 animate-fadeIn">{t('table_match_info', language)}{tableNumber}</h5>
              <p className="text-neutral-500 scale-95 origin-left leading-relaxed">
                {t('table_match_desc', language)}
              </p>
            </div>
          </div>

          {/* Payment Method Selector */}
          <div className="space-y-3" id="cart-payment-methods">
            <label className="font-sans font-black text-slate-800 text-sm block">{t('payment_mode_label', language)}</label>
            
            <div className="grid grid-cols-2 gap-3" id="cart-payment-grid">
              {/* CASH / TUNAI */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`py-4 rounded-2.5xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                  paymentMethod === 'cash'
                    ? 'bg-green-50 border-[#2E7D32] text-green-800'
                    : 'bg-white border-neutral-100 text-slate-600 hover:bg-slate-50'
                }`}
                id="cart-payment-cash-option"
              >
                <Banknote size={24} className={paymentMethod === 'cash' ? 'text-[#2E7D32]' : 'text-slate-400'} />
                <span className="text-xs font-bold mt-2">{t('pay_cash_label', language)}</span>
                <span className="text-[10px] text-neutral-400 scale-90 mt-0.5">{t('pay_cash_sub', language)}</span>
              </button>

              {/* CASHIER DUITNOW QR */}
              <button
                type="button"
                onClick={() => setPaymentMethod('qr')}
                className={`py-4 rounded-2.5xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                  paymentMethod === 'qr'
                    ? 'bg-green-50 border-[#2E7D32] text-green-800'
                    : 'bg-white border-neutral-100 text-slate-600 hover:bg-slate-50'
                }`}
                id="cart-payment-qr-option"
              >
                <CreditCard size={18} className={paymentMethod === 'qr' ? 'text-[#2E7D32]' : 'text-slate-400'} />
                <span className="text-xs font-bold mt-2">{t('pay_qr_label', language)}</span>
                <span className="text-[10px] text-neutral-400 scale-90 mt-0.5">{t('pay_qr_sub', language)}</span>
              </button>
            </div>
          </div>

          {/* Order Calculator Recap Summary */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 space-y-3.5" id="cart-calculations-summary">
            <div className="flex justify-between items-center text-xs text-neutral-500 font-sans" id="cart-sub-total-calc">
              <span>{t('items_label', language)} ({totalItemsCount} {language === 'en' ? 'units' : 'unit'})</span>
              <span className="font-mono font-semibold text-slate-800">
                RM {totalAmount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center text-xs text-neutral-500 font-sans" id="cart-tax-calc">
              <span>{t('tax_label', language)}</span>
              <span className="font-mono text-[#2E7D32] font-semibold">{t('included_label', language)}</span>
            </div>

            <div className="border-t border-dashed border-slate-200 pt-3.5 flex justify-between items-center" id="cart-total-calc">
              <span className="font-sans font-extrabold text-slate-800 text-sm">{t('total_price', language)}</span>
              <span className="font-mono text-base font-black text-[#2E7D32]">
                RM {totalAmount.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Database Operational Warnings or Errors */}
          {errorMessage && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 flex items-start space-x-2 text-[11px] text-red-600 animate-fadeIn" id="cart-error-banner">
              <ShieldAlert size={14} className="shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action trigger button */}
          <button
            type="button"
            disabled={isSubmitting}
            onClick={handleProcessCheckout}
            className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] disabled:bg-neutral-300 text-white font-sans font-black text-sm tracking-wide py-4.5 rounded-3xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center space-x-2.5 uppercase cursor-pointer"
            id="cart-submit-order-button"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>{t('sending_order', language)}</span>
              </>
            ) : (
              <>
                <Sparkles size={16} className="animate-pulse text-yellow-300" />
                <span>{t('btn_send_order', language)} RM {totalAmount.toFixed(2)}</span>
              </>
            )}
          </button>
        </>
      )}
    </div>
  );
}
