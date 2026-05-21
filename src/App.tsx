import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import MenuBrowsing from './components/MenuBrowsing';
import CartCheckout from './components/CartCheckout';
import Confirmation from './components/Confirmation';
import BottomCartBar from './components/BottomCartBar';
import { MenuItem, CartItem, Order, MenuCategory, MenuSubcategory } from './types';
import { seedDatabaseIfEmpty, fetchLiveMenu, createLiveOrder } from './supabase';
import { Loader2, MapPin, X, UtensilsCrossed } from 'lucide-react';
import { Language, t } from './utils/translations';

// Help generate a randomized Table Session Token according to prompt specifications
function generateRandomSessionId(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid ambiguous chars
  let rString = '';
  for (let i = 0; i < 4; i++) {
    rString += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `TBL-${rString}`;
}

export default function App() {
  // Navigation states
  const [currentView, setCurrentView] = useState<'home' | 'menu' | 'cart' | 'confirmation'>('home');
  const [menuCategoryId, setMenuCategoryId] = useState<string>('cat_makanan');

  // Bilingual Language State
  const [language, setLanguage] = useState<Language>('ms');

  // Database fetch states
  const [dbCategories, setDbCategories] = useState<MenuCategory[]>([]);
  const [dbSubcategories, setDbSubcategories] = useState<MenuSubcategory[]>([]);
  const [dbMenuItems, setDbMenuItems] = useState<MenuItem[]>([]);
  const [isDbLoading, setIsDbLoading] = useState<boolean>(true);

  // Cart operations state
  const [cart, setCart] = useState<CartItem[]>([]);
  
  // Table identifier state
  const [tableSession, setTableSession] = useState<string>('');
  const [tableNumber, setTableNumber] = useState<string>('05'); // default Mamak table number
  const [isEditingTableModal, setIsEditingTableModal] = useState<boolean>(false);
  const [inputTableNo, setInputTableNo] = useState<string>('05');

  // Post Checkout order confirmation state
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  // Initialize Session IDs, Languages and Seed database during lifecycle start
  useEffect(() => {
    // 0. Language tracker initializer
    const savedLang = localStorage.getItem('manisha_language') as Language;
    if (savedLang === 'en' || savedLang === 'ms') {
      setLanguage(savedLang);
    }

    // 1. Session state tracker
    let session = localStorage.getItem('tableSession');
    if (!session) {
      session = generateRandomSessionId();
      localStorage.setItem('tableSession', session);
    }
    setTableSession(session);

    // 2. Local Table Number tracker
    const storedTableNo = localStorage.getItem('tableNumber');
    if (storedTableNo) {
      setTableNumber(storedTableNo);
      setInputTableNo(storedTableNo);
    } else {
      localStorage.setItem('tableNumber', '05');
    }

    // 3. Cart persistence lookup
    const storedCart = localStorage.getItem('manisha_cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error("Failed to parse cart storage.");
      }
    }

    // 4. Seeding & Fetching Menu Records
    const mountDatabaseAndFetch = async () => {
      setIsDbLoading(true);
      try {
        // Run seed check first
        await seedDatabaseIfEmpty();
        // Retrieve full records
        const menuData = await fetchLiveMenu();
        setDbCategories(menuData.categories);
        setDbSubcategories(menuData.subcategories);
        setDbMenuItems(menuData.menuItems);
      } catch (error) {
        console.error("Database connection failure, local assets loaded.");
      } finally {
        setIsDbLoading(false);
      }
    };

    mountDatabaseAndFetch();
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('manisha_language', lang);
  };

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('manisha_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle direct item addition to cart
  const handleAddToCart = (item: MenuItem, temp: 'panas' | 'sejuk' | null) => {
    setCart((prevCart) => {
      // Find matches checking both ID and requested temperature toggle
      const existingIndex = prevCart.findIndex(
        (ci) => ci.menuItemId === item.id && ci.selectedTemp === temp
      );

      // Determine correct unit price based on temperature choice
      let unitPrice = item.basePrice;
      if (temp === 'panas' && item.pricePanas !== undefined) unitPrice = item.pricePanas;
      if (temp === 'sejuk' && item.priceSejuk !== undefined) unitPrice = item.priceSejuk;

      if (existingIndex > -1) {
        // Increment quantity of existing match
        const updatedCart = [...prevCart];
        const currentItem = updatedCart[existingIndex];
        const newQty = currentItem.quantity + 1;
        updatedCart[existingIndex] = {
          ...currentItem,
          quantity: newQty,
          subtotal: newQty * currentItem.unitPrice
        };
        return updatedCart;
      } else {
        // Append brand new selection
        return [
          ...prevCart,
          {
            menuItemId: item.id,
            name: item.name,
            quantity: 1,
            selectedTemp: temp,
            unitPrice: unitPrice,
            subtotal: unitPrice,
            categoryType: item.categoryType
          }
        ];
      }
    });
  };

  // Modify cart item quantity steppes
  const handleUpdateCartQuantity = (menuItemId: string, temp: 'panas' | 'sejuk' | null, change: number) => {
    setCart((prevCart) => {
      const targetIndex = prevCart.findIndex(
        (ci) => ci.menuItemId === menuItemId && ci.selectedTemp === temp
      );

      if (targetIndex === -1) return prevCart;

      const updatedCart = [...prevCart];
      const targetItem = updatedCart[targetIndex];
      const newQuantity = targetItem.quantity + change;

      if (newQuantity <= 0) {
        // Remove item if count hits bottom zero
        updatedCart.splice(targetIndex, 1);
      } else {
        updatedCart[targetIndex] = {
          ...targetItem,
          quantity: newQuantity,
          subtotal: newQuantity * targetItem.unitPrice
        };
      }
      return updatedCart;
    });
  };

  // Explicit item deletion from cart
  const handleRemoveCartItem = (menuItemId: string, temp: 'panas' | 'sejuk' | null) => {
    setCart((prevCart) => prevCart.filter(
      (ci) => !(ci.menuItemId === menuItemId && ci.selectedTemp === temp)
    ));
  };

  // Submit cart order payload to Firestore
  const handleOrderSubmission = async (paymentMethod: 'cash' | 'qr') => {
    if (cart.length === 0) return;

    const totalAmount = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const orderId = `MCH-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    const newOrder: Order = {
      id: orderId,
      tableSession: tableNumber, // Uses table number for ease of receipt tracking
      items: cart,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    try {
      // Try posting to Firestore
      await createLiveOrder(newOrder);
      
      // Update local states
      setLastOrder(newOrder);
      setCart([]); // Reset Cart
      setCurrentView('confirmation');
    } catch (err: any) {
      throw new Error(err.message || (language === 'en' ? 'Firestore connection issue. Sila hantar semula.' : 'Masalah sambungan Firestore. Sila hantar semula.'));
    }
  };

  const handleOpenEditTableModal = () => {
    setInputTableNo(tableNumber);
    setIsEditingTableModal(true);
  };

  const handleSaveTableNo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputTableNo.trim() !== '') {
      setTableNumber(inputTableNo);
      localStorage.setItem('tableNumber', inputTableNo);
      setIsEditingTableModal(false);
    }
  };

  // Completely wipe out active state according to prompt specifications
  const handleResetSession = () => {
    // Generate new Table Session ID
    const newSession = generateRandomSessionId();
    localStorage.setItem('tableSession', newSession);
    setTableSession(newSession);

    // Keep table number, but clear local states and return home
    setCart([]);
    setLastOrder(null);
    setCurrentView('home');
  };

  const selectedCategoryFeatured = React.useMemo(() => {
    // Return gorgeous popular suggestions: Briyani (nasi_bri_ayam), Roti canai (roti_kosong), Teh Tarik (tea_susu)
    return dbMenuItems.filter(item => 
      item.id === 'nasi_bri_ayam' || item.id === 'roti_kosong' || item.id === 'tea_susu'
    );
  }, [dbMenuItems]);

  // Helpers to fetch overall calculations
  const totalCartCount = cart.reduce((sum, ci) => sum + ci.quantity, 0);
  const totalCartSum = cart.reduce((sum, ci) => sum + ci.subtotal, 0);

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800" id="main-root-workspace">
      
      {/* Centered Mobile Layout Shell with desktop view wrapper framing */}
      <div className="w-full max-w-md mx-auto bg-white min-h-screen shadow-2xl relative flex flex-col justify-between" id="mobile-shell">
        
        {/* Render loading mask during initial database sync */}
        {isDbLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-4" id="global-db-connection-loading">
            <div className="w-16 h-16 bg-[#2E7D32]/10 rounded-full flex items-center justify-center text-[#2E7D32]" id="db-loading-spinner-wrap">
              <Loader2 className="animate-spin" size={32} />
            </div>
            <div className="text-center space-y-1 animate-fadeIn" id="db-loading-texts">
              <p className="font-extrabold text-[#2E7D32] tracking-wider uppercase text-[10px] bg-green-50 px-3 py-1 rounded-full inline-block">
                {language === 'en' ? 'Manisha Shop Connection' : 'Sambungan Kedai Manisha'}
              </p>
              <h3 className="font-sans font-black text-slate-800 text-base">
                {language === 'en' ? 'Downloading menu data...' : 'Memuat turun data menu...'}
              </h3>
              <p className="text-xs text-neutral-400">
                {language === 'en' ? 'Welcome to Digital Mamak QR' : 'Selamat datang ke QR Mamak Digital'}
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Header Component */}
            <Header 
              tableNumber={tableNumber} 
              language={language}
              setLanguage={handleSetLanguage}
              onEditTable={handleOpenEditTableModal}
              onGoHome={() => setCurrentView('home')}
            />

            {/* Core Views router switches */}
            <main className="flex-1 p-5 overflow-y-auto" id="main-view-outlet">
              {currentView === 'home' && (
                <HomeView 
                  categories={dbCategories}
                  featuredItems={selectedCategoryFeatured}
                  language={language}
                  onSelectCategory={(catId) => {
                    setMenuCategoryId(catId);
                    setCurrentView('menu');
                  }}
                  onAddToCartDirectly={handleAddToCart}
                  tableNumber={tableNumber}
                  onEditTable={handleOpenEditTableModal}
                  cart={cart}
                  onUpdateQuantity={handleUpdateCartQuantity}
                />
              )}

              {currentView === 'menu' && (
                <MenuBrowsing
                  categories={dbCategories}
                  subcategories={dbSubcategories}
                  menuItems={dbMenuItems}
                  initialCategoryId={menuCategoryId}
                  language={language}
                  onAddToCart={handleAddToCart}
                  onBackToHome={() => setCurrentView('home')}
                  cart={cart}
                  onUpdateQuantity={handleUpdateCartQuantity}
                />
              )}

              {currentView === 'cart' && (
                <CartCheckout
                  cart={cart}
                  tableNumber={tableNumber}
                  language={language}
                  onUpdateQuantity={handleUpdateCartQuantity}
                  onRemoveItem={handleRemoveCartItem}
                  onSubmitOrder={handleOrderSubmission}
                  onBackToMenu={() => setCurrentView('menu')}
                />
              )}

              {currentView === 'confirmation' && lastOrder && (
                <Confirmation
                  order={lastOrder}
                  language={language}
                  onResetSession={handleResetSession}
                />
              )}
            </main>

            {/* Sticky bottom float cart bar when actively browsing food or on home display */}
            {(currentView === 'menu' || currentView === 'home') && (
              <BottomCartBar
                totalItems={totalCartCount}
                totalPrice={totalCartSum}
                language={language}
                onViewCart={() => setCurrentView('cart')}
              />
            )}
          </>
        )}

        {/* CUSTOM TABLE EDITING FLOATING DIALOG */}
        {isEditingTableModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-55 p-4 animate-fadeIn" id="table-editing-modal-overlay">
            <div className="bg-white w-full max-w-xs rounded-3xl p-5 shadow-2xl space-y-4 animate-zoomIn border border-[#2E7D32]/10" id="table-editing-inner">
              
              <div className="flex justify-between items-center" id="table-editing-header">
                <h3 className="font-sans font-black text-slate-800 text-sm tracking-tight flex items-center space-x-1 uppercase">
                  <MapPin size={15} className="text-yellow-500 animate-bounce" />
                  <span>{t('set_table_title', language)}</span>
                </h3>
                <button 
                  onClick={() => setIsEditingTableModal(false)}
                  className="p-1 hover:bg-slate-100 rounded-lg text-neutral-400 hover:text-neutral-600 transition-colors cursor-pointer"
                  id="table-editing-close-btn"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSaveTableNo} className="space-y-4" id="table-editing-form">
                <div className="space-y-1" id="table-editing-input-group">
                  <label className="text-[10px] font-sans font-extrabold uppercase text-neutral-400 tracking-wider">
                    {t('table_input_label', language)}
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    value={inputTableNo}
                    onChange={(e) => setInputTableNo(e.target.value.replace(/[^a-zA-Z0-9 ]/g, ''))}
                    placeholder="Contoh: 12, A4, V1"
                    className="w-full bg-slate-100 hover:bg-slate-150 focus:bg-white text-slate-900 border border-slate-200 focus:border-[#2E7D32] rounded-xl py-2.5 px-3.5 text-center font-mono font-black text-lg focus:outline-none"
                    id="table-number-text-input"
                  />
                  <p className="text-[9px] text-neutral-400 text-center">
                    {t('table_input_desc', language)}
                  </p>
                </div>

                <div className="flex space-x-2 pt-1" id="table-editing-actions">
                  <button
                    type="button"
                    onClick={() => setIsEditingTableModal(false)}
                    className="flex-1 py-2 text-slate-500 text-xs font-bold bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                    id="table-editing-cancel-btn"
                  >
                    {t('btn_cancel', language)}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
                    id="table-editing-save-btn"
                  >
                    {t('btn_save', language)}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
