import React from 'react';
import { MenuCategory, MenuItem, CartItem } from '../types';
import { UtensilsCrossed, Coffee, ArrowRight, TableProperties, Flame, Snowflake, ShoppingBag, X } from 'lucide-react';
import { Language, t, translateItemName, translateItemDesc } from '../utils/translations';

interface HomeViewProps {
  categories: MenuCategory[];
  featuredItems: MenuItem[];
  language: Language;
  onSelectCategory: (catId: string) => void;
  onAddToCartDirectly: (item: MenuItem, temp: 'panas' | 'sejuk' | null) => void;
  tableNumber: string;
  onEditTable: () => void;
  cart: CartItem[];
  onUpdateQuantity: (menuItemId: string, temp: 'panas' | 'sejuk' | null, change: number) => void;
}

export default function HomeView({ 
  categories, 
  featuredItems, 
  language,
  onSelectCategory, 
  onAddToCartDirectly,
  tableNumber,
  onEditTable,
  cart,
  onUpdateQuantity
}: HomeViewProps) {
  // Selected Item for temperature chooser dialog/drawer (copied pattern from weaved menu browser for consistency)
  const [tempModalItem, setTempModalItem] = React.useState<MenuItem | null>(null);
  const [selectedTempOption, setSelectedTempOption] = React.useState<'panas' | 'sejuk'>('panas');

  const getCartItemQty = (itemId: string) => {
    return cart
      .filter((ci) => ci.menuItemId === itemId)
      .reduce((sum, ci) => sum + ci.quantity, 0);
  };

  const handleAddItemClick = (item: MenuItem) => {
    if (item.hasTempOption) {
      setTempModalItem(item);
      setSelectedTempOption('panas'); // default choice
    } else {
      onAddToCartDirectly(item, null);
    }
  };

  const handleConfirmTempChoice = () => {
    if (tempModalItem) {
      onAddToCartDirectly(tempModalItem, selectedTempOption);
      setTempModalItem(null);
    }
  };

  const getItemPrice = (item: MenuItem, temp: 'panas' | 'sejuk' | null) => {
    if (temp === 'panas' && item.pricePanas !== undefined) return item.pricePanas;
    if (temp === 'sejuk' && item.priceSejuk !== undefined) return item.priceSejuk;
    return item.basePrice;
  };

  return (
    <div className="space-y-6 pb-20 animate-fadeIn" id="home-view-container">
      {/* Interactive Hero Intro Card */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-[#1B5E20] to-[#2E7D32] text-white p-6 shadow-lg" id="home-hero-card">
        <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4" id="home-hero-watermark">
          <UtensilsCrossed size={160} />
        </div>
        
        <div className="relative z-10" id="home-hero-content">
          <div className="inline-flex items-center space-x-1.5 bg-yellow-400 text-green-950 font-bold font-mono text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-900 animate-ping inline-block mr-1"></span>
            {t('digital_order_title', language)}{tableNumber}
          </div>
          
          <h2 className="text-2xl font-black tracking-tight" id="home-hero-greeting">
            {t('hero_title', language)} <span className="text-yellow-300">Manisha!</span>
          </h2>
          <p className="text-xs text-green-50/90 mt-1 max-w-[90%] leading-relaxed animate-fadeIn" id="home-hero-sub">
            {t('hero_sub', language)}
          </p>

          <div className="mt-5 flex items-center space-x-3" id="home-hero-action-buttons">
            <button 
              onClick={onEditTable}
              className="bg-white/10 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-all border border-white/20 active:scale-95 flex items-center space-x-1.5 hover:bg-white/25 cursor-pointer"
              id="home-change-table-btn"
            >
              <TableProperties size={13} />
              <span>{t('btn_change_table', language)}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Choice Segments: Makanan / Minuman */}
      <div className="grid grid-cols-2 gap-4" id="home-category-buttons-grid">
        {categories.map((cat) => {
          const isMakanan = cat.type === 'makanan';
          const categoryDisplayName = isMakanan 
            ? (language === 'en' ? 'FOOD' : 'MAKANAN') 
            : (language === 'en' ? 'DRINKS' : 'MINUMAN');

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="bg-white hover:bg-neutral-50 border border-neutral-100 rounded-3xl p-5 text-left shadow-xs transition-all active:scale-[0.98] group relative overflow-hidden cursor-pointer"
              id={`home-select-${cat.type}-card`}
            >
              <div 
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl mb-4 shadow-sm transition-transform group-hover:scale-110 ${
                  isMakanan ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-blue-600'
                }`}
              >
                {cat.type === 'makanan' ? <UtensilsCrossed size={22} className="text-orange-600" /> : <Coffee size={22} className="text-blue-500" />}
              </div>
              <h3 className="font-sans font-bold text-lg text-slate-800 uppercase tracking-tight" id={`home-label-${cat.type}`}>
                {categoryDisplayName}
              </h3>
              <p className="text-xs text-neutral-400 mt-1 leading-snug min-h-[36px]" id={`home-desc-${cat.type}`}>
                {isMakanan ? t('makanan_sub', language) : t('minuman_sub', language)}
              </p>
              <div className="mt-4 flex items-center text-xs font-bold text-[#2E7D32] group-hover:translate-x-1 transition-transform" id={`home-action-${cat.type}`}>
                <span>{t('learn_more', language)}</span>
                <ArrowRight size={12} className="ml-1" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Easy Guide Workflow */}
      <div className="bg-slate-50 rounded-3xl p-5 border border-slate-100" id="home-ordering-guide-card">
        <h3 className="font-sans font-bold text-sm text-[#1A237E] uppercase tracking-wider mb-4 flex items-center space-x-1.5" id="home-guide-title">
          <span>{t('guide_title', language)}</span>
        </h3>
        
        <div className="space-y-4" id="home-guide-steps">
          <div className="flex space-x-3 items-start" id="home-step-1">
            <div className="bg-green-100 text-[#2E7D32] font-mono font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              1
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">{t('guide_step_1_title', language)}</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">{t('guide_step_1_desc', language)}</p>
            </div>
          </div>

          <div className="flex space-x-3 items-start" id="home-step-2">
            <div className="bg-green-100 text-[#2E7D32] font-mono font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              2
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">{t('guide_step_2_title', language)}</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">{t('guide_step_2_desc', language)}</p>
            </div>
          </div>

          <div className="flex space-x-3 items-start" id="home-step-3">
            <div className="bg-green-100 text-[#2E7D32] font-mono font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5">
              3
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">{t('guide_step_3_title', language)}</h4>
              <p className="text-[11px] text-neutral-500 mt-0.5">{t('guide_step_3_desc', language)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Suggestions Items */}
      <div className="space-y-3" id="home-featured-list-container">
        <h3 className="font-sans font-black text-slate-800 text-base" id="home-featured-header">
          {t('featured_title', language)}
        </h3>
        
        <div className="grid grid-cols-1 gap-3.5" id="home-featured-grid">
          {featuredItems.map((item) => {
            const cartQty = getCartItemQty(item.id);

            return (
              <div 
                key={item.id} 
                className="bg-white border border-neutral-100 rounded-2xl p-3.5 flex space-x-4 shadow-sm hover:shadow-md transition-shadow relative"
                id={`home-featured-${item.id}`}
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-50 relative" id={`home-featured-img-wrap-${item.id}`}>
                  {item.hasTempOption && (
                    <div className="absolute top-1 right-1 bg-yellow-400 text-green-950 font-bold text-[8px] uppercase px-1.5 py-0.5 rounded-full tracking-wide z-10 font-mono shadow-xs">
                      {t('temp_hot_cold', language)}
                    </div>
                  )}
                  <img 
                    src={item.imageUrl} 
                    alt={translateItemName(item.id, item.name, language)} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    referrerPolicy="no-referrer"
                    id={`home-featured-img-${item.id}`}
                  />
                </div>
                
                <div className="flex flex-col justify-between flex-1 py-0.5" id={`home-featured-text-${item.id}`}>
                  <div>
                    <h4 className="font-sans font-bold text-[14px] text-[#1A237E] leading-tight" id={`home-featured-name-${item.id}`}>
                      {translateItemName(item.id, item.name, language)}
                    </h4>
                    <p className="text-[11px] text-neutral-500 mt-0.5 line-clamp-2" id={`home-featured-desc-${item.id}`}>
                      {translateItemDesc(item.id, item.description || '', language)}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-2" id={`home-featured-footer-${item.id}`}>
                    <span className="font-mono text-sm font-bold text-[#2E7D32]" id={`home-featured-price-${item.id}`}>
                      RM {item.basePrice.toFixed(2)}
                    </span>
                    
                    {item.id === 'nasi_campur' ? (
                      <span className="text-[10px] font-sans font-extrabold text-[#E65100] bg-orange-50 px-2.5 py-1.5 rounded-xl border border-orange-100 uppercase tracking-wider animate-fadeIn">
                        {language === 'en' ? 'Select at Counter' : 'Pilih di Kaunter'}
                      </span>
                    ) : !item.hasTempOption ? (
                      (() => {
                        const matchingItem = cart.find(ci => ci.menuItemId === item.id);
                        if (matchingItem) {
                          return (
                            <div className="bg-slate-100 py-1 px-2 rounded-lg flex items-center space-x-2.5 border border-slate-200 animate-fadeIn" id={`home-featured-qty-stepper-${item.id}`}>
                              <button
                                onClick={() => onUpdateQuantity(item.id, null, -1)}
                                className="text-slate-650 hover:text-black hover:bg-slate-200/85 p-0.5 text-[10px] font-black w-4.5 h-4.5 flex items-center justify-center bg-white border border-slate-200 shadow-xs rounded-md cursor-pointer transition-all active:scale-75"
                                title="Minus"
                                id={`home-featured-decrease-${item.id}`}
                              >
                                -
                              </button>
                              <span className="font-mono text-[11px] font-black text-slate-800 min-w-[12px] text-center" id={`home-featured-qty-text-${item.id}`}>{matchingItem.quantity}</span>
                              <button
                                onClick={() => onAddToCartDirectly(item, null)}
                                className="text-slate-650 hover:text-black hover:bg-slate-200/85 p-0.5 text-[10px] font-black w-4.5 h-4.5 flex items-center justify-center bg-white border border-slate-200 shadow-xs rounded-md cursor-pointer transition-all active:scale-75 animate-pulse"
                                title="Add"
                                id={`home-featured-increase-${item.id}`}
                              >
                                +
                              </button>
                            </div>
                          );
                        } else {
                          return (
                            <button
                              onClick={() => handleAddItemClick(item)}
                              className="bg-[#2E7D32]/10 text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white font-bold text-xs px-3 py-1 rounded-lg transition-all active:scale-90 flex items-center space-x-1 cursor-pointer"
                              id={`home-featured-addbtn-${item.id}`}
                            >
                              <span>{t('btn_add', language)}</span>
                              <span className="font-semibold text-xs ml-0.5">+</span>
                            </button>
                          );
                        }
                      })()
                    ) : (
                      <button
                        onClick={() => handleAddItemClick(item)}
                        className="bg-[#2E7D32]/10 text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white font-bold text-xs px-3 py-1 rounded-lg transition-all active:scale-90 flex items-center space-x-1 cursor-pointer"
                        id={`home-featured-addbtn-${item.id}`}
                      >
                        <span>{t('btn_add', language)}</span>
                        <span className="font-semibold text-xs ml-0.5">+</span>
                      </button>
                    )}
                  </div>

                  {/* Multi-variant nested steppers displayed under the item for perfect clarity */}
                  {item.hasTempOption && (() => {
                    const matchingItems = cart.filter(ci => ci.menuItemId === item.id);
                    if (matchingItems.length === 0) return null;
                    return (
                      <div className="mt-2 pt-1.5 border-t border-slate-100 space-y-1.5" id={`home-featured-variants-stepper-${item.id}`}>
                        {matchingItems.map((variant, vIdx) => (
                          <div 
                            key={vIdx} 
                            className="flex items-center justify-between text-[11px] bg-slate-50 hover:bg-slate-100/90 py-1 px-2.5 rounded-lg border border-slate-200/50 animate-fadeIn"
                            id={`home-featured-variant-row-${item.id}-${variant.selectedTemp}`}
                          >
                            <span className="font-bold flex items-center space-x-1 text-slate-700">
                              <span>{variant.selectedTemp === 'panas' ? '🔥' : '❄️'}</span>
                              <span className="capitalize text-[10px]">{variant.selectedTemp === 'panas' ? t('temp_panas_label', language) : t('temp_sejuk_label', language)}</span>
                            </span>
                            
                            <div className="flex items-center space-x-2">
                              <span className="text-neutral-500 font-mono text-[9px]">RM {variant.unitPrice.toFixed(2)}</span>
                              <div className="flex items-center bg-white border border-slate-200 rounded-md px-1.5 py-0.5 space-x-2">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, variant.selectedTemp, -1)}
                                  className="text-slate-500 hover:text-black hover:bg-slate-100 p-0.5 rounded transition-all active:scale-75 cursor-pointer font-bold w-4 h-4 flex items-center justify-center border border-slate-100 text-[10px]"
                                  aria-label="Decrease quantity"
                                  id={`home-featured-decrease-${item.id}-${variant.selectedTemp}`}
                                >
                                  -
                                </button>
                                <span className="font-mono text-[10px] font-black text-slate-850 min-w-2.5 text-center">{variant.quantity}</span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, variant.selectedTemp, 1)}
                                  className="text-slate-500 hover:text-black hover:bg-slate-100 p-0.5 rounded transition-all active:scale-75 cursor-pointer font-bold w-4 h-4 flex items-center justify-center border border-slate-100 text-[10px]"
                                  aria-label="Increase quantity"
                                  id={`home-featured-increase-${item.id}-${variant.selectedTemp}`}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CUSTOM TEMPERATURE POPUP DRAWER for HomeView (Panas/Sejuk Modal Option) */}
      {tempModalItem && (
        <div className="fixed inset-0 bg-black/65 flex items-end justify-center z-55 p-4 animate-fadeIn" id="home-temp-selection-overlay">
          <div className="bg-white w-full max-w-sm rounded-[32px] p-6 shadow-2xl space-y-5 animate-slideUp relative" id="home-temp-selection-box">
            
            {/* Top Close indicator */}
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto" />

            <div className="text-center space-y-2" id="home-temp-selection-header">
              <h3 className="font-sans font-black text-slate-800 text-lg leading-snug">
                {t('temp_choice_title', language)}
              </h3>
              <p className="text-xs text-[#1A237E] font-bold animate-fadeIn">
                {translateItemName(tempModalItem.id, tempModalItem.name, language)}
              </p>
              <p className="text-[11px] text-neutral-400">
                {t('temp_choice_desc', language)}
              </p>
            </div>

            {/* Selection Toggles */}
            <div className="grid grid-cols-2 gap-3" id="home-temp-selection-button-group">
              {/* PANAS */}
              <button
                type="button"
                onClick={() => setSelectedTempOption('panas')}
                className={`py-4 rounded-2xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                  selectedTempOption === 'panas'
                    ? 'bg-orange-50/70 border-orange-400 text-orange-700 shadow-xs'
                    : 'bg-slate-50 border-neutral-100 text-slate-600 hover:bg-slate-100'
                }`}
                id="home-temp-select-panas-btn"
              >
                <Flame size={26} className={selectedTempOption === 'panas' ? 'animate-bounce text-orange-500' : 'text-slate-400'} />
                <span className="text-xs font-bold mt-2">{t('hot_option', language)}</span>
                <span className="text-[11px] font-mono font-bold text-neutral-400 mt-1">
                  RM {tempModalItem.pricePanas?.toFixed(2) || tempModalItem.basePrice.toFixed(2)}
                </span>
              </button>

              {/* SEJUK */}
              <button
                type="button"
                onClick={() => setSelectedTempOption('sejuk')}
                className={`py-4 rounded-2xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                  selectedTempOption === 'sejuk'
                    ? 'bg-blue-50/70 border-blue-400 text-blue-700 shadow-xs'
                    : 'bg-slate-50 border-neutral-100 text-slate-600 hover:bg-slate-100'
                }`}
                id="home-temp-select-sejuk-btn"
              >
                <Snowflake size={26} className={selectedTempOption === 'sejuk' ? 'animate-pulse text-blue-400' : 'text-slate-400'} />
                <span className="text-xs font-bold mt-2">{t('cold_option', language)}</span>
                <span className="text-[11px] font-mono font-bold text-neutral-400 mt-1">
                  RM {tempModalItem.priceSejuk?.toFixed(2) || tempModalItem.basePrice.toFixed(2)}
                </span>
              </button>
            </div>

            {/* Total Price Display */}
            <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center text-sm border border-slate-100" id="home-temp-selection-checkout-preview-panel">
              <span className="text-xs font-semibold text-neutral-400">{t('price_per_unit', language)}</span>
              <span className="font-mono text-base font-black text-[#2E7D32]">
                RM {getItemPrice(tempModalItem, selectedTempOption).toFixed(2)}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-3 pt-1" id="home-temp-selection-actions">
              <button
                type="button"
                onClick={() => setTempModalItem(null)}
                className="flex-1 py-3 text-slate-500 text-xs font-bold bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-2xl transition-all uppercase tracking-wide cursor-pointer"
                id="home-temp-selection-cancel-btn"
              >
                {t('cancel', language)}
              </button>
              
              <button
                type="button"
                onClick={handleConfirmTempChoice}
                className="flex-2 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold active:scale-95 rounded-2xl transition-all shadow-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 cursor-pointer"
                id="home-temp-selection-confirm-btn"
              >
                <ShoppingBag size={14} />
                <span>{t('confirm_add', language)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

