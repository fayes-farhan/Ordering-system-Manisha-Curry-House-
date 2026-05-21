import React, { useState, useMemo } from 'react';
import { MenuCategory, MenuSubcategory, MenuItem, CartItem } from '../types';
import { Search, Flame, Snowflake, AlertCircle, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Language, t, translateSubcategory, translateItemName, translateItemDesc } from '../utils/translations';

interface MenuBrowsingProps {
  categories: MenuCategory[];
  subcategories: MenuSubcategory[];
  menuItems: MenuItem[];
  initialCategoryId: string;
  language: Language;
  onAddToCart: (item: MenuItem, temp: 'panas' | 'sejuk' | null) => void;
  onBackToHome: () => void;
  cart: CartItem[];
  onUpdateQuantity: (menuItemId: string, temp: 'panas' | 'sejuk' | null, change: number) => void;
}

export default function MenuBrowsing({
  categories,
  subcategories,
  menuItems,
  initialCategoryId,
  language,
  onAddToCart,
  onBackToHome,
  cart,
  onUpdateQuantity
}: MenuBrowsingProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(initialCategoryId);
  const [activeSubcategoryId, setActiveSubcategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected Item for temperature chooser dialog/drawer
  const [tempModalItem, setTempModalItem] = useState<MenuItem | null>(null);
  const [selectedTempOption, setSelectedTempOption] = useState<'panas' | 'sejuk'>('panas');

  // Filter subcategories that belong to the current category type
  const activeCategory = useMemo(() => {
    return categories.find(c => c.id === activeCategoryId) || categories[0];
  }, [categories, activeCategoryId]);

  const filteredSubcategories = useMemo(() => {
    return subcategories.filter(sub => sub.categoryId === activeCategoryId);
  }, [subcategories, activeCategoryId]);

  // Adjust subcategory selection when switching top-level Makanan/Minuman
  const handleCategorySwitch = (catId: string) => {
    setActiveCategoryId(catId);
    setActiveSubcategoryId(null); // Reset subcategory filter
  };

  // Filter items based on active subcategory and search query
  const filteredItems = useMemo(() => {
    return menuItems.filter(item => {
      // Must match search query if provided
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const localizedName = translateItemName(item.id, item.name, language).toLowerCase();
        const localizedDesc = translateItemDesc(item.id, item.description || '', language).toLowerCase();
        const matchesName = localizedName.includes(query) || item.name.toLowerCase().includes(query);
        const matchesDesc = localizedDesc.includes(query) || (item.description?.toLowerCase().includes(query) || false);
        if (!matchesName && !matchesDesc) return false;
      }

      // Must match category type
      if (item.categoryType !== activeCategory.type) {
        return false;
      }

      // Must match subcategory if one is active
      if (activeSubcategoryId !== null && item.subcategoryId !== activeSubcategoryId) {
        return false;
      }

      return true;
    });
  }, [menuItems, activeCategory, activeSubcategoryId, searchQuery, language]);

  // Group items by subcategory for better visual structure when browsing "All"
  const groupedItems = useMemo(() => {
    const groups: { [subId: string]: MenuItem[] } = {};
    filteredItems.forEach(item => {
      if (!groups[item.subcategoryId]) {
        groups[item.subcategoryId] = [];
      }
      groups[item.subcategoryId].push(item);
    });
    return groups;
  }, [filteredItems]);

  const openTempChooserModal = (item: MenuItem) => {
    setTempModalItem(item);
    setSelectedTempOption('panas'); // default choice
  };

  const closeTempChooserModal = () => {
    setTempModalItem(null);
  };

  const handleConfirmTempChoice = () => {
    if (tempModalItem) {
      onAddToCart(tempModalItem, selectedTempOption);
      closeTempChooserModal();
    }
  };

  const triggerAddToCart = (item: MenuItem) => {
    if (item.hasTempOption) {
      openTempChooserModal(item);
    } else {
      onAddToCart(item, null);
    }
  };

  // Safe method to calculate custom temperature pricing
  const getItemPrice = (item: MenuItem, temp: 'panas' | 'sejuk' | null) => {
    if (temp === 'panas' && item.pricePanas !== undefined) return item.pricePanas;
    if (temp === 'sejuk' && item.priceSejuk !== undefined) return item.priceSejuk;
    return item.basePrice;
  };

  return (
    <div className="space-y-5 pb-24 animate-fadeIn" id="menu-browsing-container">
      
      {/* Back to Home & Search Container */}
      <div className="flex items-center space-x-3" id="menu-search-row">
        <button 
          onClick={onBackToHome}
          className="p-3 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-2xl transition-all text-slate-800 cursor-pointer"
          title={t('btn_home', language)}
          id="menu-back-btn"
        >
          <ArrowLeft size={18} />
        </button>
        
        <div className="relative flex-1" id="menu-search-wrapper">
          <input
            type="text"
            placeholder={t('search_placeholder', language)}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-100 hover:bg-slate-100/90 focus:bg-white text-slate-900 border border-transparent focus:border-slate-300 rounded-2xl py-3 pl-11 pr-5 text-sm transition-all focus:outline-none"
            id="menu-text-search"
          />
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
        </div>
      </div>

      {/* Top Level Makanan / Minuman Toggle Tabs */}
      <div className="flex space-x-2.5 p-1 bg-slate-100/80 rounded-2xl border border-neutral-100" id="menu-cat-toggles">
        {categories.map((cat) => {
          const isActive = activeCategoryId === cat.id;
          const categoryDisplayName = cat.type === 'makanan' 
            ? (language === 'en' ? 'FOOD' : 'MAKANAN') 
            : (language === 'en' ? 'DRINKS' : 'MINUMAN');

          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySwitch(cat.id)}
              className={`flex-1 py-3 px-4 rounded-xl font-sans font-extrabold text-sm tracking-wide transition-all uppercase flex items-center justify-center space-x-2 cursor-pointer ${
                isActive 
                  ? 'bg-white text-[#2E7D32] shadow-sm font-black' 
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
              id={`menu-toggle-tab-${cat.type}`}
            >
              <span>{cat.icon}</span>
              <span>{categoryDisplayName}</span>
            </button>
          );
        })}
      </div>

      {/* Horizontal Subcategories Slider Bar */}
      <div className="overflow-x-auto -mx-5 px-5 scrollbar-none flex space-x-2 pr-10" id="menu-subcat-slider">
        <button
          onClick={() => setActiveSubcategoryId(null)}
          className={`py-2 px-4.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
            activeSubcategoryId === null
              ? 'bg-[#2E7D32] text-white shadow-xs'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          id="menu-subcat-all-pill"
        >
          {activeCategory.type === 'makanan' ? t('all_makanan', language) : t('all_minuman', language)}
        </button>

        {filteredSubcategories.map((sub) => {
          const isSelected = activeSubcategoryId === sub.id;
          return (
            <button
              key={sub.id}
              onClick={() => setActiveSubcategoryId(sub.id)}
              className={`py-2 px-4.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center space-x-1.5 ${
                isSelected
                  ? 'bg-[#2E7D32] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              id={`menu-subcat-pill-${sub.id}`}
            >
              <span>{sub.icon}</span>
              <span>{translateSubcategory(sub.id, sub.name, language)}</span>
            </button>
          );
        })}
      </div>

      {/* Main Filtered Item Display Grid/List */}
      <div className="space-y-6" id="menu-catalog-list">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 px-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200" id="menu-empty-state">
            <AlertCircle className="mx-auto text-neutral-400 mb-3" size={32} />
            <h4 className="font-bold text-slate-800 text-sm">{t('no_dishes_found', language)}</h4>
            <p className="text-xs text-neutral-400 mt-1">{t('try_new_search', language)}</p>
          </div>
        ) : (
          // Look up each subcategory list to separate items
          subcategories
            .filter(sub => sub.categoryId === activeCategoryId && (activeSubcategoryId === null || activeSubcategoryId === sub.id))
            .map(sub => {
              const subItems = groupedItems[sub.id] || [];
              if (subItems.length === 0) return null;

              return (
                <div key={sub.id} className="space-y-3" id={`menu-subcat-section-${sub.id}`}>
                  {/* Subcategory Label Headings */}
                  <h3 className="font-sans font-extrabold text-sm text-[#1A237E] uppercase tracking-wider flex items-center space-x-1.5 border-b border-neutral-100 pb-1.5">
                    <span>{sub.icon}</span>
                    <span>{translateSubcategory(sub.id, sub.name, language)}</span>
                    <span className="font-mono text-[10px] text-neutral-400 font-semibold bg-neutral-100 px-1.5 py-0.5 rounded-full">
                      {subItems.length}
                    </span>
                  </h3>

                  {/* List of individual items in subcategory */}
                  <div className="grid grid-cols-1 gap-3.5" id={`menu-subitems-grid-${sub.id}`}>
                    {subItems.map((item) => {
                      const displayPrice = item.basePrice;

                      return (
                        <div 
                          key={item.id}
                          className={`bg-white border rounded-2.5xl p-3 flex space-x-3.5 shadow-xs transition-shadow relative ${
                            item.isAvailable ? 'border-neutral-100 hover:shadow-md' : 'border-neutral-105 opacity-65'
                          }`}
                          id={`menu-item-row-${item.id}`}
                        >
                          {/* Image Box */}
                          <div className="w-22 h-22 rounded-2xl overflow-hidden shrink-0 bg-slate-50 relative" id={`menu-item-img-wrap-${item.id}`}>
                            {item.hasTempOption && (
                              <div className="absolute top-1 right-1 bg-yellow-405 bg-yellow-400 text-green-950 font-bold text-[8px] uppercase px-1.5 py-0.5 rounded-full tracking-wide z-10 font-mono shadow-xs">
                                {t('temp_hot_cold', language)}
                              </div>
                            )}
                            <img 
                              src={item.imageUrl} 
                              alt={translateItemName(item.id, item.name, language)} 
                              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                              referrerPolicy="no-referrer"
                              id={`menu-item-img-${item.id}`}
                            />
                            {!item.isAvailable && (
                              <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-sans font-bold text-[10px] uppercase tracking-wider" id={`menu-item-soldout-${item.id}`}>
                                {t('sold_out', language)}
                              </div>
                            )}
                          </div>

                          {/* Data Details */}
                          <div className="flex flex-col justify-between flex-1 py-0.5" id={`menu-item-data-${item.id}`}>
                            <div>
                              <h4 className="font-sans font-bold text-[14px] text-[#1A237E] leading-tight flex items-start justify-between animate-fadeIn" id={`menu-item-title-${item.id}`}>
                                <span>{translateItemName(item.id, item.name, language)}</span>
                              </h4>
                              
                              <p className="text-[11px] text-neutral-400 mt-1 line-clamp-2 leading-relaxed" id={`menu-item-desc-${item.id}`}>
                                {translateItemDesc(item.id, item.description || '', language)}
                              </p>
                            </div>

                            <div className="flex flex-col mt-2 space-y-2" id={`menu-item-actions-${item.id}`}>
                              <div className="flex items-center justify-between">
                                {/* Price Label */}
                                <div className="flex flex-col" id={`menu-item-pricing-${item.id}`}>
                                  <span className="font-mono text-[14px] font-extrabold text-[#2E7D32]">
                                    {displayPrice === 0 ? 'Ikut Pilihan' : `RM ${displayPrice.toFixed(2)}`}
                                  </span>
                                  {item.hasTempOption && item.pricePanas !== undefined && item.priceSejuk !== undefined && (
                                    <span className="text-[9px] text-neutral-400 font-mono">
                                      P: RM{item.pricePanas.toFixed(2)} / S: RM{item.priceSejuk.toFixed(2)}
                                    </span>
                                  )}
                                </div>

                                {/* Add Button / Stepper Controls */}
                                {item.isAvailable ? (
                                  <>
                                    {item.id === 'nasi_campur' ? (
                                      <span className="text-[10px] font-sans font-extrabold text-[#E65100] bg-orange-50 px-2.5 py-1.5 rounded-xl border border-orange-100 uppercase tracking-wider animate-fadeIn">
                                        {language === 'en' ? 'Select at Counter' : 'Pilih di Kaunter'}
                                      </span>
                                    ) : !item.hasTempOption ? (
                                      // Simple Food / Non-variant Item Quantities
                                      (() => {
                                        const matchingItem = cart.find(ci => ci.menuItemId === item.id);
                                        if (matchingItem) {
                                          return (
                                            <div className="bg-slate-100 py-1.5 px-2.5 rounded-xl flex items-center space-x-3.5 border border-slate-200 animate-fadeIn" id={`menu-qty-stepper-${item.id}`}>
                                              <button
                                                onClick={() => onUpdateQuantity(item.id, null, -1)}
                                                className="text-slate-650 hover:text-black hover:bg-slate-200/85 p-0.5 text-xs font-black w-5 h-5 flex items-center justify-center bg-white border border-slate-200 shadow-xs rounded-md cursor-pointer transition-all active:scale-75"
                                                title="Minus"
                                                id={`menu-decrease-${item.id}`}
                                              >
                                                -
                                              </button>
                                              <span className="font-mono text-xs font-black text-slate-800 min-w-[15px] text-center" id={`menu-qty-text-${item.id}`}>{matchingItem.quantity}</span>
                                              <button
                                                onClick={() => onAddToCart(item, null)}
                                                className="text-slate-650 hover:text-black hover:bg-slate-200/85 p-0.5 text-xs font-black w-5 h-5 flex items-center justify-center bg-white border border-slate-200 shadow-xs rounded-md cursor-pointer transition-all active:scale-75 animate-pulse"
                                                title="Add"
                                                id={`menu-increase-${item.id}`}
                                              >
                                                +
                                              </button>
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <button
                                              onClick={() => triggerAddToCart(item)}
                                              className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white active:scale-90 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1 uppercase tracking-wider cursor-pointer font-sans"
                                              id={`menu-item-add-btn-${item.id}`}
                                            >
                                              <span>{t('btn_add', language)}</span>
                                              <span className="font-semibold text-xs ml-0.5">+</span>
                                            </button>
                                          );
                                        }
                                      })()
                                    ) : (
                                      // Drinks / Variant Items (Hot vs. Cold option triggers pop-up)
                                      <button
                                        onClick={() => triggerAddToCart(item)}
                                        className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white active:scale-90 font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs flex items-center space-x-1 uppercase tracking-wider cursor-pointer font-sans"
                                        id={`menu-item-add-btn-${item.id}`}
                                      >
                                        <span>{t('btn_add', language)}</span>
                                        <span className="font-semibold text-xs ml-0.5">+</span>
                                      </button>
                                    )}
                                  </>
                                ) : (
                                  <span className="text-[10px] font-mono font-bold text-red-500 uppercase px-2 py-1 bg-red-50 rounded-lg">
                                    {t('not_available', language)}
                                  </span>
                                )}
                              </div>

                              {/* Multi-variant nested steppers displayed under the item for perfect clarity */}
                              {item.hasTempOption && (() => {
                                const matchingItems = cart.filter(ci => ci.menuItemId === item.id);
                                if (matchingItems.length === 0) return null;
                                return (
                                  <div className="mt-1 pt-1.5 border-t border-slate-100 space-y-1.5" id={`menu-item-variants-stepper-${item.id}`}>
                                    {matchingItems.map((variant, vIdx) => (
                                      <div 
                                        key={vIdx} 
                                        className="flex items-center justify-between text-[11px] bg-slate-50 hover:bg-slate-100/90 py-1 px-2.5 rounded-lg border border-slate-200/50 animate-fadeIn"
                                        id={`menu-variant-row-${item.id}-${variant.selectedTemp}`}
                                      >
                                        <span className="font-bold flex items-center space-x-1 text-slate-700">
                                          <span>{variant.selectedTemp === 'panas' ? '🔥' : '❄️'}</span>
                                          <span className="capitalize">{variant.selectedTemp === 'panas' ? t('temp_panas_label', language) : t('temp_sejuk_label', language)}</span>
                                        </span>
                                        
                                        <div className="flex items-center space-x-2">
                                          <span className="text-neutral-500 font-mono text-[10px]">RM {variant.unitPrice.toFixed(2)}</span>
                                          <div className="flex items-center bg-white border border-slate-200 rounded-md px-1.5 py-0.5 space-x-2">
                                            <button
                                              onClick={() => onUpdateQuantity(item.id, variant.selectedTemp, -1)}
                                              className="text-slate-500 hover:text-black hover:bg-slate-100 p-0.5 rounded transition-all active:scale-75 cursor-pointer font-bold w-4 h-4 flex items-center justify-center border border-slate-100"
                                              aria-label="Decrease quantity"
                                              id={`menu-decrease-${item.id}-${variant.selectedTemp}`}
                                            >
                                              -
                                            </button>
                                            <span className="font-mono text-xs font-black text-slate-850 min-w-3 text-center">{variant.quantity}</span>
                                            <button
                                              onClick={() => onUpdateQuantity(item.id, variant.selectedTemp, 1)}
                                              className="text-slate-500 hover:text-black hover:bg-slate-100 p-0.5 rounded transition-all active:scale-75 cursor-pointer font-bold w-4 h-4 flex items-center justify-center border border-slate-100"
                                              aria-label="Increase quantity"
                                              id={`menu-increase-${item.id}-${variant.selectedTemp}`}
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
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
        )}
      </div>

      {/* CUSTOM TEMPERATURE POPUP DRAWER (Panas/Sejuk Modal Option) */}
      {tempModalItem && (
        <div className="fixed inset-0 bg-black/65 flex items-end justify-center z-55 p-4 animate-fadeIn" id="temp-selection-overlay">
          <div className="bg-white w-full max-w-sm rounded-[32px] p-6 shadow-2xl space-y-5 animate-slideUp relative" id="temp-selection-box">
            
            {/* Top Close indicator */}
            <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto" />

            <div className="text-center space-y-2" id="temp-selection-header">
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
            <div className="grid grid-cols-2 gap-3" id="temp-selection-button-group">
              {/* PANAS */}
              <button
                type="button"
                onClick={() => setSelectedTempOption('panas')}
                className={`py-4 rounded-2xl flex flex-col items-center justify-center border transition-all cursor-pointer ${
                  selectedTempOption === 'panas'
                    ? 'bg-orange-50/70 border-orange-400 text-orange-700 shadow-xs'
                    : 'bg-slate-50 border-neutral-100 text-slate-600 hover:bg-slate-100'
                }`}
                id="temp-select-panas-btn"
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
                id="temp-select-sejuk-btn"
              >
                <Snowflake size={26} className={selectedTempOption === 'sejuk' ? 'animate-pulse text-blue-400' : 'text-slate-400'} />
                <span className="text-xs font-bold mt-2">{t('cold_option', language)}</span>
                <span className="text-[11px] font-mono font-bold text-neutral-400 mt-1">
                  RM {tempModalItem.priceSejuk?.toFixed(2) || tempModalItem.basePrice.toFixed(2)}
                </span>
              </button>
            </div>

            {/* Total Price Display */}
            <div className="bg-slate-50 p-4 rounded-2xl flex justify-between items-center text-sm border border-slate-100" id="temp-selection-checkout-preview-panel">
              <span className="text-xs font-semibold text-neutral-400">{t('price_per_unit', language)}</span>
              <span className="font-mono text-base font-black text-[#2E7D32]">
                RM {getItemPrice(tempModalItem, selectedTempOption).toFixed(2)}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-3 pt-1" id="temp-selection-actions">
              <button
                type="button"
                onClick={closeTempChooserModal}
                className="flex-1 py-3 text-slate-500 text-xs font-bold bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-2xl transition-all uppercase tracking-wide cursor-pointer"
                id="temp-selection-cancel-btn"
              >
                {t('cancel', language)}
              </button>
              
              <button
                type="button"
                onClick={handleConfirmTempChoice}
                className="flex-2 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold active:scale-95 rounded-2xl transition-all shadow-xs uppercase tracking-wider flex items-center justify-center space-x-1.5 cursor-pointer"
                id="temp-selection-confirm-btn"
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
