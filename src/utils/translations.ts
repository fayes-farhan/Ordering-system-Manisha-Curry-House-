export type Language = 'en' | 'ms';

export const uiTranslations: Record<string, { en: string; ms: string }> = {
  // Header
  '24_hours_open': { en: 'Open 24 Hours', ms: 'Buka 24 Jam' },
  'table': { en: 'Table', ms: 'Meja' },
  'btn_home': { en: 'Home', ms: 'Laman Utama' },
  
  // Hero intro
  'digital_order_title': { en: 'Digital Table Order #', ms: 'Pesanan Digital Meja #' },
  'hero_title': { en: 'Welcome to', ms: 'Selamat Datang Ke' },
  'hero_sub': { en: 'Enjoy authentic 24-hour Mamak flavours directly of your device. Select from our menu, submit your order, and pay at the counter.', ms: 'Nikmati citarasa mamak 24 jam tulen secara terus dari peranti anda. Pilih menu, hantar pesanan, dan bayar di kaunter.' },
  'btn_change_table': { en: 'Change Table No', ms: 'Tukar No Meja' },

  // Categories
  'makanan_sub': { en: 'Roti Canai, Briyani, Fried Rice, Soup & Noodles', ms: 'Roti Canai, Briyani, Mee, Sup & Masakan Panas' },
  'minuman_sub': { en: 'Teh Tarik, Fresh Juice, Milo, Local Specialty Drinks', ms: 'Teh Tarik, Jus Segar, Milo, Minuman Istimewa' },
  'learn_more': { en: 'Browse Menu', ms: 'Lebih lanjut' },

  // Self Service Guide
  'guide_title': { en: 'How Self-Service Ordering Works', ms: 'Cara Pesanan Layanan Diri' },
  'guide_step_1_title': { en: '1. Select Foods & Drinks', ms: '1. Pilih Makanan & Minuman' },
  'guide_step_1_desc': { en: 'Explore our digital menu categories and add your selections to the cart.', ms: 'Imbas menu digital kegemaran anda dan tambah terus ke dalam troli.' },
  'guide_step_2_title': { en: '2. Confirm Order (No Online Payment)', ms: '2. Sahkan Pesanan (Tiada Bayaran Atas Talian)' },
  'guide_step_2_desc': { en: 'Review items in your cart and submit the order to retrieve a visual checkout slip code.', ms: 'Tapis item dan hantar pesanan untuk mendapatkan kod rujukan visual.' },
  'guide_step_3_title': { en: '3. Pay at Manisha Counter', ms: '3. Bayar di Kaunter Manisha' },
  'guide_step_3_desc': { en: 'Show your confirmation screen to the cashier to pay by cash or scan DuitNow QR!', ms: 'Tunjuk skrin rujukan kepada juruwang untuk bayar secara Tunai atau QR!' },

  // Featured Dishes
  'featured_title': { en: 'Chef Featured Recommendations 🔥', ms: 'Cadangan Hidangan Istimewa 🔥' },
  'btn_add': { en: 'Add', ms: 'Tambah' },

  // Menu view
  'search_placeholder': { en: 'Search your favourite food and drinks...', ms: 'Cari makanan & minuman kegemaran anda...' },
  'all_makanan': { en: 'All Food', ms: 'Semua Makanan' },
  'all_minuman': { en: 'All Drinks', ms: 'Semua Minuman' },
  'no_dishes_found': { en: 'No dishes found', ms: 'Tiada hidangan dijumpai' },
  'try_new_search': { en: 'Please try another search keyword.', ms: 'Sila cuba kata kunci carian yang lain.' },
  'temp_hot_cold': { en: 'Hot/Cold Option', ms: 'Panas/Sejuk' },
  'sold_out': { en: 'Sold Out', ms: 'Habis' },
  'not_available': { en: 'Not Available', ms: 'Tidak Tersedia' },
  'view_order': { en: 'View Order', ms: 'Lihat Pesanan' },
  'cart_title_qty': { en: 'Cart', ms: 'Troli Pesanan' },

  // Temp Chooser Dialog
  'temp_choice_title': { en: 'Drink Temperature Option 🥤', ms: 'Pilihan Suhu Minuman 🥤' },
  'temp_choice_desc': { en: 'Please select hot or cold option according to your preference.', ms: 'Sila pilih hidangan panas atau sejuk mengikut selera anda.' },
  'hot_option': { en: '🔥 HOT', ms: '🔥 PANAS' },
  'cold_option': { en: '❄️ COLD', ms: '❄️ SEJUK' },
  'price_per_unit': { en: 'Price per unit:', ms: 'Harga Seunit:' },
  'cancel': { en: 'Cancel', ms: 'Batal' },
  'confirm_add': { en: 'Confirm & Add', ms: 'Sah & Tambah' },

  // CartCheckout
  'your_cart': { en: 'Your Cart Order', ms: 'Troli Pesanan Anda' },
  'cart_empty': { en: 'Your cart is still empty', ms: 'Troli anda masih kosong' },
  'cart_empty_desc': { en: 'Please browse our delicious menu and add food or beverage items of your choice.', ms: 'Sila telusuri menu kegemaran anda dan tambah makanan atau minuman pilihan.' },
  'btn_start_browsing': { en: 'Start Selecting Menu', ms: 'Mula Memilih Menu' },
  'table_match_info': { en: 'Sending to Table #', ms: 'Menghantar Ke Meja #' },
  'table_match_desc': { en: 'Your order will be posted to Firestore with this table number. Please ensure it is accurate!', ms: 'Pesanan anda akan dimuat naik ke Firestore dengan rujukan meja ini. Sila pastikan no meja adalah tepat!' },
  'payment_mode_label': { en: 'Cashier Payment Option 💳', ms: 'Pilihan Pembayaran Kaunter 💳' },
  'pay_cash_label': { en: 'Pay Cash', ms: 'Bayar Tunai' },
  'pay_cash_sub': { en: 'Prepare Cash at Counter', ms: 'Sedia Tunai di Kaunter' },
  'pay_qr_label': { en: 'Pay with QR', ms: 'Bayar QR' },
  'pay_qr_sub': { en: 'Scan Cashier DuitNow', ms: 'Scan DuitNow Kaunter' },
  'items_label': { en: 'Total Items', ms: 'Jumlah Item' },
  'tax_label': { en: 'SST / Service Fee (0%)', ms: 'SST / Caj Perkhidmatan (0%)' },
  'included_label': { en: 'Included', ms: 'Tercakup' },
  'total_price': { en: 'Total Price', ms: 'Jumlah Harga' },
  'sending_order': { en: 'Submitting Order...', ms: 'Menghantar Pesanan...' },
  'btn_send_order': { en: 'Submit Order • ', ms: 'Hantar Pesanan • ' },

  // Confirmation view
  'confirmed_badge_db': { en: 'Order Sent To Firestore', ms: 'Pesanan Dihantar Ke Firestore' },
  'thank_you': { en: 'Thank You!', ms: 'Terima Kasih!' },
  'guide_cashier': { en: 'Please verify & pay for your order at the Manisha Curry House counter.', ms: 'Sila sahkan & bayar pesanan anda di kaunter Manisha Curry House.' },
  'cashier_ref_code': { en: 'Cashier Reference Code', ms: 'Kod Rujukan Juruwang' },
  'copied_toast': { en: 'Reference code copied!', ms: 'Kod rujukan telah disalin!' },
  'btn_copy': { en: 'Copy', ms: 'Salin' },
  'pay_at_counter_tag': { en: 'Use this code when paying at the counter.', ms: 'Gunakan kod ini semasa membuat bayaran.' },
  'order_time': { en: 'Order Time:', ms: 'Masa Pesanan:' },
  'db_doc_id': { en: 'DB Document ID:', ms: 'ID Dokumen DB:' },
  'dish_summary': { en: 'Dishes Summary', ms: 'Ringkasan Hidangan' },
  'temp_panas_label': { en: 'Hot 🔥', ms: 'Panas 🔥' },
  'temp_sejuk_label': { en: 'Cold ❄️', ms: 'Sejuk ❄️' },
  'barcode_tag': { en: '*MCH-POS-STORE-VERIFY*', ms: '*MCH-POS-STORE-VERIFY*' },
  'queue_desc_label': { en: 'Please Proceed to the Payment Counter', ms: 'Sila Beratur di Kaunter Bayaran' },
  'queue_desc_sub': { en: 'Provide reference code to the Manisha Curry House cashier to settle your bill in Cash or scan their DuitNow QR code.', ms: 'Katakan kod rujukan kepada Juruwang Manisha Curry House untuk membayar secara tunai atau mengimbas kod QR DuitNow restoran.' },
  'btn_new_order': { en: 'Create New Order', ms: 'Buat Pesanan Baru' },

  // Edit Table Modal
  'set_table_title': { en: 'Set Table Number', ms: 'Set Nombor Meja' },
  'table_input_label': { en: 'Current Table No', ms: 'No Meja Semasa' },
  'table_input_desc': { en: 'Input the physical table number pasted with the QR code.', ms: 'Masukkan nombor meja fizikal yang ditampal kod QR.' },
  'btn_cancel': { en: 'Cancel', ms: 'Batal' },
  'btn_save': { en: 'Save', ms: 'Simpan' }
};

export const subcategoryTranslations: Record<string, { en: string; ms: string }> = {
  'sub_nasi': { en: 'Rice', ms: 'Nasi' },
  'sub_roti': { en: 'Roti/Murtabak', ms: 'Roti/Murtabak' },
  'sub_mee': { en: 'Mee / Yellow Noodles', ms: 'Mee' },
  'sub_maggi': { en: 'Maggi / Instant Noodles', ms: 'Maggi' },
  'sub_wantan': { en: 'Wantan Ho', ms: 'Wantan Ho' },
  'sub_kueh': { en: 'Kuey Teow', ms: 'Kueh Teow' },
  'sub_soto': { en: 'Soto & Bakso Soups', ms: 'Soto/Bakso' },
  'sub_tomyam': { en: 'Tom Yam Hot & Sour', ms: 'Tom Yam' },
  'sub_rojak': { en: 'Rojak Salad', ms: 'Rojak' },
  'sub_minuman': { en: 'Mamak Specialty Drinks', ms: 'Minuman' },
  'sub_jus': { en: 'Fresh Fruit Juices', ms: 'Jus Segar' },
  'sub_mineral': { en: 'Mineral & Soda Drinks', ms: 'Air Mineral' },
  'sub_abc': { en: 'ABC Shaved Ice', ms: 'ABC' }
};

export const itemTranslations: Record<string, { en: { name: string; desc: string }; ms: { name: string; desc: string } }> = {
  'nasi_bri_ayam': {
    ms: { name: 'Nasi Briyani Ayam', desc: 'Nasi basmati aromatik dihidangkan dengan ayam berempah masakan istimewa dan salad timun segar.' },
    en: { name: 'Chicken Biryani Rice', desc: 'Fragrant basmati rice served with special spiced chicken and fresh cucumber salad.' }
  },
  'nasi_bri_kambing': {
    ms: { name: 'Nasi Briyani Kambing', desc: 'Nasi basmati aromatik penuh herba dwi-masak dengan kambing yang lembut manis berkuah kental.' },
    en: { name: 'Mutton Biryani Rice', desc: 'Aromatic herb-infused basmati rice double-cooked with tender succulent pieces of mutton gravy.' }
  },
  'nasi_ayam': {
    ms: { name: 'Nasi Ayam', desc: 'Nasi berperisa dimasak stok ayam dihidangkan dengan ayam panggang madu garing, kuah sup dan sambal cilinya.' },
    en: { name: 'Roast Chicken Rice', desc: 'Flavourful chicken rice served with honey roast crispy chicken, clear soup and homemade chili sauce.' }
  },
  'nasi_campur': {
    ms: { name: 'Nasi Campur (Ikut Pilihan)', desc: 'Set sajian nasi campur bersama dengan lauk-pauk kaunter pilihan anda, harga akan dilaraskan di kaunter.' },
    en: { name: 'Bento Mixed Rice (Self Selection)', desc: 'Standard white rice served with side dishes of your choice from the counter, priced at checkout.' }
  },
  'nasi_putih': {
    ms: { name: 'Nasi Putih', desc: 'Sajian sepinggan nasi putih kukus biasa panas.' },
    en: { name: 'Steamed White Rice', desc: 'A single plating of hot steamed white jasmine rice.' }
  },
  'nasi_gor_kosong': {
    ms: { name: 'Nasi Goreng Kosong', desc: 'Nasi goreng mamak ringkas digoreng bersama bawang merah, telur dan kicap berperisa.' },
    en: { name: 'Plain Fried Rice', desc: 'Simple Mamak-style fried rice tossed with red shallots, egg, and light soy sauce.' }
  },
  'nasi_gor_ayam': {
    ms: { name: 'Nasi Goreng Ayam', desc: 'Nasi goreng harum diisi sekata dengan telur hancur dan potongan isi ayam empuk berempah.' },
    en: { name: 'Chicken Fried Rice', desc: 'Fragrant fried rice loaded evenly with scrambled egg and tender spiced chicken pieces.' }
  },
  'nasi_gor_daging': {
    ms: { name: 'Nasi Goreng Daging', desc: 'Nasi goreng kicap ala mamak bersama herba garing, hirisan daging lembu dan sayuran campur.' },
    en: { name: 'Beef Fried Rice', desc: 'Savouty Mamak-style black-soy fried rice with crispy herbs, beef slices, and mixed vegetables.' }
  },
  'nasi_gor_seafood': {
    ms: { name: 'Nasi Goreng Seafood', desc: 'Nasi goreng yang dibakar dengan udang laut segar, sotong segar dan perasa laut bermutu tinggi.' },
    en: { name: 'Seafood Fried Rice', desc: 'High-heat wok fried rice packed with sea prawns, squid, and premium seafood seasonings.' }
  },
  'nasi_gor_pataya': {
    ms: { name: 'Nasi Goreng Pattaya', desc: 'Nasi goreng lazat kegemaran ramai yang dibalut kemas dalam dadar telur nipis garing dengan sos sos cili.' },
    en: { name: 'Pattaya Fried Rice', desc: 'Savoury fried rice neatly wrapped in a thin egg omelette shell and drizzled with chili sauce.' }
  },
  'nasi_gor_mamak': {
    ms: { name: 'Nasi Goreng Mamak', desc: 'Nasi goreng pedas menyengat dibakar kuali laju bersalut tauhu, cili herba mamak asli.' },
    en: { name: 'Authentic Mamak Fried Rice', desc: 'Fiery spicy pan-fried rice tossed with tofu, eggs, and our signature Mamak dry chili spice paste.' }
  },
  'nasi_gor_kampung': {
    ms: { name: 'Nasi Goreng Kampung', desc: 'Nasi goreng citarasa kampung diserikan dengan bilis garing rangup, kangkung segar dan bumbu cili padi pedas.' },
    en: { name: 'Village Style Fried Rice', desc: 'Traditional kampung-style fried rice with crispy anchovies, water spinach, and spicy bird\'s eye chilies.' }
  },
  'nasi_gor_usa': {
    ms: { name: 'Nasi Goreng USA', desc: 'Nasi goreng bergaya disajikan dengan ayam masak merah pedas manis, udang keping pasir dan telur mata lembu.' },
    en: { name: 'USA Fried Rice', desc: 'Stylish fried rice served with sweet-spicy chili chicken, stir-fried prawns, and a sunny side up egg.' }
  },
  'nasi_gor_paprik': {
    ms: { name: 'Nasi Goreng Paprik', desc: 'Nasi goreng wangi disajikan dengan daging ayam tumis sos paprik herba daun limau purut pekat.' },
    en: { name: 'Chicken Paprik Fried Rice', desc: 'Aromatic fried rice served with chicken pieces cooked in thick sweet-spicy herb paprik gravy.' }
  },
  'nasi_gor_paprik_daging': {
    ms: { name: 'Nasi Goreng Paprik Daging', desc: 'Nasi goreng dihidang bersama daging lembu tumis sos paprik herba thai pedas masam.' },
    en: { name: 'Beef Paprik Fried Rice', desc: 'Fried rice served with sliced tender beef cooked in a rich, sweet-spicy lemongrass paprik sauce.' }
  },
  'nasi_gor_thailand': {
    ms: { name: 'Nasi Goreng Thailand', desc: 'Nasi goreng beraroma serai, daun limau, daun ketumbar menghasilkan citarasa tom yam asli.' },
    en: { name: 'Thai Herb Fried Rice', desc: 'Thai-style fried rice infused with fresh lemongrass, kaffir lime leaves, and authentic tom yam herbs.' }
  },
  'nasi_gor_tomyam_ayam': {
    ms: { name: 'Nasi Goreng Tomyam Ayam', desc: 'Nasi goreng digaul pes tomyam asli digoreng bersama kepingan isi ayam dan kubis.' },
    en: { name: 'Chicken Tomyam Fried Rice', desc: 'Fried rice wok-tossed in sour-spicy tom yam paste with chicken cubes and fresh cabbage.' }
  },
  'nasi_gor_tomyam_seafood': {
    ms: { name: 'Nasi Goreng Tomyam Seafood', desc: 'Nasi goreng dibakar dengan bumbu pes tomyam kaw garing bersama udang, sotong dan sayur.' },
    en: { name: 'Seafood Tomyam Fried Rice', desc: 'High-heat fried rice wok-tossed in robust tom yam paste with fresh prawns and squid slices.' }
  },
  'roti_kosong': {
    ms: { name: 'Roti Canai Kosong', desc: 'Roti canai klasik nipis, diputar dan ditebar layang rangup, dihidang dengan kuah dhal kacang dan kari.' },
    en: { name: 'Roti Canai Plain', desc: 'Classic flaky, masterfully hand-tossed flatbread pan-fried till golden, served with dhal and curry.' }
  },
  'roti_telur': {
    ms: { name: 'Roti Canai Telur', desc: 'Roti canai gebu yang ditebar bersama inti telur ayam segar di dalamnya.' },
    en: { name: 'Egg Roti Canai', desc: 'Gourmet flatbread stuffed with a whisked farm-fresh egg and pan-fried.' }
  },
  'roti_tisu': {
    ms: { name: 'Roti Tisu', desc: 'Roti canai nipis berkilat manis seperti tisu berbentuk kon gergasi tinggi disalut susu pekat manis.' },
    en: { name: 'Roti Tissue (Tall Cone)', desc: 'Paper-thin sweet crispy flatbread sculpted into an extra tall cone, coated in sweet condensed milk.' }
  },
  'roti_kaya': {
    ms: { name: 'Roti Kaya', desc: 'Roti garing rangup dibakar garing diisi sapuan kaya telur pandan yang harum manis.' },
    en: { name: 'Sweet Kaya Roti', desc: 'Crispy flatbread filled with fragrant sweet coconut and pandan egg jam (Kaya).' }
  },
  'roti_boom': {
    ms: { name: 'Roti Boom', desc: 'Roti canai berbentuk lingkaran tebal mini yang lebih padat, manis bersalut margarin.' },
    en: { name: 'Roti Boom (Butter-Sweet)', desc: 'Smaller, thicker, sweeter spiralized roti baked crisp with extra butter and sugar glaze.' }
  },
  'roti_boom_telur': {
    ms: { name: 'Roti Boom Telur', desc: 'Roti boom lingkaran tebal manis diisi dengan telur mata separa cair.' },
    en: { name: 'Egg Roti Boom', desc: 'Thick butter-loaded spiral sweet flatbread cooked with a cracked egg inside.' }
  },
  'roti_planta': {
    ms: { name: 'Roti Planta', desc: 'Roti tebar diisi penuh dengan sapuan margarin Planta mewah berserta taburan gula halus.' },
    en: { name: 'Roti Planta (Margarine-Sugar)', desc: 'Tossed flatbread folded with rich sugary Planta margarine, pan seared till crispy.' }
  },
  'roti_kobra': {
    ms: { name: 'Roti Kobra Chicken', desc: 'Keistimewaan mamak! Roti kosong dicincang dibanjiri kuah kari campur pekat dan ayam goreng merah hancur.' },
    en: { name: 'Roti Cobra Chicken', desc: 'Mamak specialty! Chopped flatbread flooded with mixed heavy chicken curries, topped with spiced chicken.' }
  },
  'roti_kobra_daging': {
    ms: { name: 'Roti Kobra Daging', desc: 'Sajian roti canai cincang banjir kuah kari daging kawah yang memikat selera.' },
    en: { name: 'Roti Cobra Beef', desc: 'Chopped crispy flatbread drenched completely in rich savory beef and dhal curries.' }
  },
  'mur_sayur': {
    ms: { name: 'Murtabak Sayur', desc: 'Roti berinti lipatan dadar tebal dipenuhi sayuran kubis, lobak, bawang dan telur.' },
    en: { name: 'Vegetable Murtabak', desc: 'Thick folded savory flatbread stuffed with eggs, cabbage, carrots, onions and local herbs.' }
  },
  'mur_ayam': {
    ms: { name: 'Murtabak Ayam', desc: 'Murtabak tebal diisi dengan isi daging ayam cincang berempah, telur hancur dan bawang, disaji sos bawang merah jeruk.' },
    en: { name: 'Chicken Murtabak', desc: 'Pan-fried stuffed flatbread filled with minced spiced chicken, seasoned onions, and eggs, served with pickled onions.' }
  },
  'mur_daging': {
    ms: { name: 'Murtabak Daging', desc: 'Murtabak tebal kegemaran ramai diisi padat daging lembu cincang kisar herba rempah ratus dan telur.' },
    en: { name: 'Beef Murtabak', desc: 'Premium pan-fried folded flatbread packed with spiced minced beef, red onions, and egg mixture.' }
  },
  'mur_sardin': {
    ms: { name: 'Murtabak Sardin', desc: 'Murtabak lipat diisi herba tumisan sardin hancur pedas bersama hirisan cili dan bawang.' },
    en: { name: 'Sardine Murtabak', desc: 'Savory stuffed flatbread filled with sautéed spicy mashed sardines, onions, and whisked eggs.' }
  },
  'mee_basah_ayam': {
    ms: { name: 'Mee Basah Ayam', desc: 'Mee kuning digoreng kuali basah bersama ayam, sawi dalam limpahan sup sos kicap pekat aromatik.' },
    en: { name: 'Wet Braised Chicken Mee', desc: 'Yellow noodles wok-fried in delicious thick, dark, gravy with chicken breast and fresh mustard greens.' }
  },
  'mee_basah_daging': {
    ms: { name: 'Mee Basah Daging', desc: 'Mee basah banjir digoreng bersama potongan daging lembu segar dan sos soya herba pekat.' },
    en: { name: 'Wet Braised Beef Mee', desc: 'Saucy Mamak-style yellow noodles stir-fried with beef slices and greens in rich gravy.' }
  },
  'mee_basah_seafood': {
    ms: { name: 'Mee Basah Seafood', desc: 'Mee basah kicap digoreng bersama hirisan sotong, udang laut segar dan sayur.' },
    en: { name: 'Wet Braised Seafood Mee', desc: 'Yellow noodles wok-cooked in a silky dark soy gravy loaded with prawns and fresh squid.' }
  },
  'mee_basah_campur': {
    ms: { name: 'Mee Basah Campur', desc: 'Mee kuning basah dengan campuran mewah daging lembu, ayam dan kuah seafood pekat.' },
    en: { name: 'Wet Braised Mixed Mee', desc: 'Rich combination of chicken, beef, and seafood tossed with noodles in a dark soy glaze.' }
  },
  'mee_gor_kosong': {
    ms: { name: 'Mee Goreng Kosong', desc: 'Mee kuning kosong digoreng bersalut kicap berperisa mamak garing.' },
    en: { name: 'Plain Fried Yellow Noodles', desc: 'Plain stir-fried yellow noodles with soy sauce, egg, and crisp bean sprouts.' }
  },
  'mee_gor_ayam': {
    ms: { name: 'Mee Goreng Ayam', desc: 'Mee kuning digoreng bersama bumbu kicap, hirisan dada ayam, telur dan sawi.' },
    en: { name: 'Chicken Fried Yellow Noodles', desc: 'Robust stir-fried noodles tossed with marinated chicken strips, egg, and greens.' }
  },
  'mee_gor_daging': {
    ms: { name: 'Mee Goreng Daging', desc: 'Mee goreng kicap kering herba pedas dihiasi daging lembu lembut hancur.' },
    en: { name: 'Beef Fried Yellow Noodles', desc: 'Wok-fired yellow noodles seasoned with tender beef pieces, bean sprouts, and dark soy.' }
  },
  'mee_gor_mamak': {
    ms: { name: 'Mee Goreng Mamak', desc: 'Mee goreng basah mamak ikonik! Ditumis pedas cili kisar, tauhu, ubi kentang rebus, telur dan taugeh masam manis.' },
    en: { name: 'Classic Mamak Fried Mee', desc: 'The legendary Mamak wok-tossed yellow noodles with tofu, boiled potatoes, tomatoes, eggs, egg and cabbage.' }
  },
  'mee_gor_seafood': {
    ms: { name: 'Mee Goreng Seafood', desc: 'Mee kuning digoreng garing pedas bumbu laut diisi udang dan sotong.' },
    en: { name: 'Seafood Fried Yellow Noodles', desc: 'Spicy stir-fried yellow noodles tossed with fresh pan-seared sea prawns and squid.' }
  },
  'mee_gor_pataya': {
    ms: { name: 'Mee Goreng Pattaya', desc: 'Mee goreng kisar dibungkus cantik berkubah dalam dadar telur emas.' },
    en: { name: 'Pattaya Fried Mee', desc: 'Spicy noodles fried with chicken and vegetables, cleanly wrapped inside a thin egg envelope.' }
  },
  'mee_hoon_kosong': {
    ms: { name: 'Mee Hoon Goreng Kosong', desc: 'Mee hoon digoreng ringkas bersama kicap putih rempah kosong.' },
    en: { name: 'Plain Fried Rice Vermicelli', desc: 'Plain stir-fried thin white rice noodles with eggs and bean sprouts.' }
  },
  'mee_hoon_ayam': {
    ms: { name: 'Mee Hoon Goreng Ayam', desc: 'Mee hoon digoreng bersama hirisan isi ayam manis, telur hancur dan sayuran.' },
    en: { name: 'Chicken Fried Vermicelli', desc: 'Thin rice vermicelli stir-fried with marinated chicken strips, eggs, and mustard greens.' }
  },
  'mee_hoon_daging': {
    ms: { name: 'Mee Hoon Goreng Daging', desc: 'Mee hoon digoreng garing kicap dimeriahkan dengan bumbu herba hirisan daging.' },
    en: { name: 'Beef Fried Vermicelli', desc: 'Thready rice vermicelli fried in heavy soy sauce with seasoned beef strips and bean sprouts.' }
  },
  'mee_hoon_mamak': {
    ms: { name: 'Mee Hoon Goreng Mamak', desc: 'Mee hoon tumisan pedas merah lada kering dimeriahkan kentang dadih tauhu.' },
    en: { name: 'Mamak Fried Vermicelli', desc: 'Mamak-style stir-fried spicy vermicelli with egg cubes, fried tofu and a tangy sweet soy seasoning.' }
  },
  'mee_hoon_seafood': {
    ms: { name: 'Mee Hoon Goreng Seafood', desc: 'Mee hoon digoreng bersama bumbu laut segar dari udang gajih dan kubis.' },
    en: { name: 'Seafood Fried Vermicelli', desc: 'Savoury stir-fried thin vermicelli with fresh prawns, squids, and crunchy julienne cabbage.' }
  },
  'mee_hoon_pataya': {
    ms: { name: 'Mee Hoon Goreng Pattaya', desc: 'Mee hoon goreng wangi dibungkus rapi dalam lipatan telur dadar gebu.' },
    en: { name: 'Pattaya Fried Vermicelli', desc: 'Savoury stir-fried vermicelli nested beautifully within a fluffy golden egg omelette.' }
  },
  'mee_hoon_singapore': {
    ms: { name: 'Mee Hoon Singapore', desc: 'Mee hoon digoreng putih tanpa cili, sarat perasa lada putih aromatik, udang, telur hancur dan lobak.' },
    en: { name: 'Singapore Fried Vermicelli', desc: 'White-style wok-smoked vermicelli infused with white pepper, loaded with carrots, shrimp and eggs.' }
  },
  'maggi_kosong': {
    ms: { name: 'Maggi Soup Kosong', desc: 'Sajian mee segera Maggi berkuah sup perencah kari membara panas terpilih.' },
    en: { name: 'Plain Soupy Curry Maggi', desc: 'Hot, comforting instant Maggi noodles served in our signature spiced curry broth.' }
  },
  'maggi_sayur': {
    ms: { name: 'Maggi Soup Sayur', desc: 'Mee Maggi kuah kari beraroma digandingkan bersama pak choy hijau.' },
    en: { name: 'Soupy Curry Maggi with Greens', desc: 'Hot curry instant noodles served with fresh bok choy and shredded cabbage.' }
  },
  'maggi_telur_sayur': {
    ms: { name: 'Maggi Soup Telur + Sayur', desc: 'Mee segera kuah kari lengkap dengan sebiji telur separuh masak dan sayur.' },
    en: { name: 'Curry Maggi Soup Egg & Veg', desc: 'Classic instant curry noodle soup with a soft poached egg and tender green pak choy.' }
  },
  'maggi_gor_telur': {
    ms: { name: 'Maggi Goreng Telur', desc: 'Mee segera Maggi digoreng kering bumbu rempah kari bersama kepingan telur dan sayur.' },
    en: { name: 'Fried Maggi with Egg', desc: 'Work-stirred dry instant noodles with savory curry spices, scrambled eggs, and sweet cabbage.' }
  },
  'maggi_gor_ayam': {
    ms: { name: 'Maggi Goreng Ayam', desc: 'Mee Maggi goreng garing kegemaran ramai dihidang bersama seketul ayam goreng mamak rangup.' },
    en: { name: 'Fried Maggi with Fried Chicken', desc: 'Pan-fried instant curry vermicelli noodles served alongside deep-fried spiced chicken.' }
  },
  'indo_kosong': {
    ms: { name: 'Indomie Kosong', desc: 'Mee segera kering berperisa bumbu asli Indomie Mi Goreng.' },
    en: { name: 'Plain Indomie Goreng', desc: 'Standard instant Indomie dry noodles with aromatic fried shallot oil and sweet soy.' }
  },
  'indo_telur': {
    ms: { name: 'Indomie Telur', desc: 'Mi goreng Indomie bumbu lengkap dihiasi sebiji telur mata kerbau garing.' },
    en: { name: 'Indomie with Fried Egg', desc: 'Stir fried Indomie noodles topped with a crispy fried sunny-side-up egg.' }
  },
  'indo_gor_telur': {
    ms: { name: 'Indomie Goreng Telur', desc: 'Indomie digoreng semula dalam kuali herba panas berminyak bersama sayur kubis.' },
    en: { name: 'Wok-Fried Indomie with Egg', desc: 'Wok pan-stirred dry Indomie noodles tossed with scrambled egg and cabbage.' }
  },
  'indo_gor_daging': {
    ms: { name: 'Indomie Goreng Daging', desc: 'Mi Indomie digoreng bumbu rempah bersama hirisan daging sapi garing.' },
    en: { name: 'Indomie Goreng with Beef', desc: 'Wok-seared instant dry noodles stir fried with tender beef strips and green leaves.' }
  },
  'indo_gor_ayam': {
    ms: { name: 'Indomie Goreng Ayam', desc: 'Indomie digoreng lazat bersama bumbu rempah, disajikan bersama kepingan ayam goreng garing.' },
    en: { name: 'Indomie Goreng with Chicken', desc: 'Interactive wok stir-fried Indomie served with deep fried seasoned chicken chunks.' }
  },
  'wantan_ayam': {
    ms: { name: 'Wantan Ho Ayam', desc: 'Kuey teow garing disiram kuah telur likat berkilat bersinar diisi hirisan isi ayam.' },
    en: { name: 'Egg Gravy Wantan Ho Chicken', desc: 'Silky flat rice noodles drenched in rich, velvety egg-drop gravy topped with chicken.' }
  },
  'wantan_daging': {
    ms: { name: 'Wantan Ho Daging', desc: 'Wantan ho kuey teow disiram kuah telur berkrim disajikan bersama daging lembu hancur.' },
    en: { name: 'Egg Gravy Wantan Ho Beef', desc: 'Wide flat rice noodles in creamy, aromatic egg gravy with tender beef julienne.' }
  },
  'wantan_seafood': {
    ms: { name: 'Wantan Ho Seafood', desc: 'Wantan ho kuey teow mewah disiram kuah telur likat bersama udang galah, dan sotong.' },
    en: { name: 'Egg Gravy Wantan Ho Seafood', desc: 'Charred flat noodles swimming in deep egg-drop oyster sauce gravy with shrimp and squids.' }
  },
  'wantan_campur': {
    ms: { name: 'Wantan Ho Campur', desc: 'Wantan ho kuah telur dengan kombo isi daging lembu, ayam dan udang laut di atasnya.' },
    en: { name: 'Egg Gravy Wantan Ho Mixed', desc: 'Wide flat rice noodles wrapped in a luxurious hot egg sauce with beef, chicken, and seafood.' }
  },
  'kt_ayam': {
    ms: { name: 'Kueh Teow Ayam', desc: 'Kuey teow digoreng garing bersalut isi ayam manis dan kicap aromatik.' },
    en: { name: 'Chicken Fried Flat Noodles', desc: 'Stir-fried flat rice noodles cooked in high-heat with shredded chicken breast and sprouts.' }
  },
  'kt_daging': {
    ms: { name: 'Kueh Teow Daging', desc: 'Kuey teow digoreng bumbu lada berserta hirisan daging lembu bersari.' },
    en: { name: 'Beef Fried Flat Noodles', desc: 'Savouty wok-charred flat rice noodles stir fried with beef strips, garlic, and greens.' }
  },
  'kt_seafood': {
    ms: { name: 'Kueh Teow Seafood (Char Kuey Teow)', desc: 'Char kuey teow basah kering harum asap wok hei digoreng bersama kepingan udang pusing segar.' },
    en: { name: 'Seafood Char Kuey Teow', desc: 'Smokey wok-hei laden traditional fried flat noodles cooked with fresh prawns, cockle and chives.' }
  },
  'kt_campur': {
    ms: { name: 'Kueh Teow Campur', desc: 'Kuey teow goreng kuali berasap digabung istimewa ayam, lembu dan isi seafood.' },
    en: { name: 'Mixed Meat Fried Flat Noodles', desc: 'Smoky flat rice noodles fried with standard soy sauce, chicken slices, beef, and prawns.' }
  },
  'soto_campur': {
    ms: { name: 'Soto Campur', desc: 'Sup soto berempah lengkap dengan ketupat nasi, hirisan daging, ayam, taugeh hancur dan sambal kicap pedas jawa.' },
    en: { name: 'Mixed Soto Soup', desc: 'Savory spiced broth loaded with compressed rice cakes, beef strips, chicken, and spicy sweet-soy sauce.' }
  },
  'soto_ayam': {
    ms: { name: 'Soto Ayam', desc: 'Soto kuah ayam kunyit wangi dipenuhi ketupat nasi lembut, sawi dan ayam cincang manis.' },
    en: { name: 'Traditional Chicken Soto', desc: 'Classic golden turmeric chicken broth served with rice cubes and shredded chicken.' }
  },
  'soto_perut': {
    ms: { name: 'Soto Perut & Daging', desc: 'Soto istimewa dipenuhi sup sari pati bercampur isi perut babat lembu dan daging.' },
    en: { name: 'Beef Tripe Soto Soup', desc: 'Robust spiced beef broth loaded with tender beef slices and savory soft beef tripe.' }
  },
  'soto_tulang': {
    ms: { name: 'Soto Tulang', desc: 'Sup herba soto pekat dengan hidangan tulang lembu berisap sum-sum manis.' },
    en: { name: 'Bone Marrow Soto Soup', desc: 'Delicately braised rich beef bone soup carrying local herbs, fried shallots, and celery leaf.' }
  },
  'soto_3_jenis': {
    ms: { name: 'Soto Campur 3 Jenis', desc: 'Soto kombo kuah herba diisi isi ketupat nasi, isi ayam, daging, dan perut hancur.' },
    en: { name: '3-Meat Premium Soto', desc: 'Triple dynamic combination of shredded chicken, beef, and tripe in herb-spiced bone broth.' }
  },
  'soto_4_jenis': {
    ms: { name: 'Soto Campur 4 Jenis', desc: 'Soto berskala besar memuatkan periuk penuh ayam, daging sapi, perut berserta paru goreng.' },
    en: { name: '4-Meat Deluxe Soto', desc: 'Supreme rich broth loaded with chicken, beef, beef tripe, and crispy fried cow lung strips.' }
  },
  'soto_daging': {
    ms: { name: 'Soto Daging', desc: 'Soto sup sapi diisi ketupat nasi bulat berserta kepingan daging batang pinang lembu.' },
    en: { name: 'Traditional Beef Soto', desc: 'Comforting soup with compressed rice cakes, bean sprouts, and sliced beef tenderloin.' }
  },
  'bakso_biasa': {
    ms: { name: 'Bakso', desc: 'Sajian sup bakso jernih ala jawa bersama bebola daging sapi kenyal, mee bihun kuah wangi bumbu.' },
    en: { name: 'Classic Indonesian Bakso', desc: 'Traditional clear beef soup with vermicelli noodles, bok choy, and chewy beef meatballs.' }
  },
  'bakso_ayam': {
    ms: { name: 'Bakso Ayam', desc: 'Mee sup bersama bebola ayam manis bersari minyak bawang putih goreng.' },
    en: { name: 'Chicken Meatball Bakso', desc: 'Warm savory soup with rice vermicelli, chicken meatballs, and fried shallots.' }
  },
  'bakso_daging': {
    ms: { name: 'Bakso Daging', desc: 'Sup jernih penuh bebola daging lembu gred A dihiasi saderi harum.' },
    en: { name: 'Beef Meatball Bakso', desc: 'Sautéed garlic clear soup filled with premium seasoned beef meatballs and noodles.' }
  },
  'bakso_campur': {
    ms: { name: 'Bakso Campur', desc: 'Bakso gabungan istimewa bebola ayam hancur dan bebola daging urat sapi penuh.' },
    en: { name: 'Mixed Combo Bakso', desc: 'Deluxe bowl featuring both chicken meatballs and tendon beef balls with noodles in clear soup.' }
  },
  'ty_ayam': {
    ms: { name: 'Tom Yam Ayam', desc: 'Sup tom yam merah pedas masam meletup diisi kepingan ayam segar, tomato dan serai.' },
    en: { name: 'Chicken Tom Yam Soup', desc: 'Aromatic spicy and sour red tom yam broth infused with lemongrass, chicken breast, and tomatoes.' }
  },
  'ty_daging': {
    ms: { name: 'Tom Yam Daging', desc: 'Sup tom yam ala thai berasid menyegarkan diisi hirisan daging lembu batang pinang.' },
    en: { name: 'Beef Tom Yam Soup', desc: 'Spicy herbs tom yam soup loaded with tender beef slices and oyster mushrooms.' }
  },
  'ty_seafood': {
    ms: { name: 'Tom Yam Seafood', desc: 'Sup tom yam pes limau tulen diisi penuh udang kopek, sotong dan daun ketumbar.' },
    en: { name: 'Seafood Tom Yam Soup', desc: 'Fiery sweet-sour hot soup packed with sea prawns, squid, oyster mushrooms, and cilantro.' }
  },
  'ty_campur': {
    ms: { name: 'Tom Yam Campur', desc: 'Kuah tom yam pekat merah menyengat gabungan isi ayam goreng, daging dan sotong.' },
    en: { name: 'Mixed Hot-Sour Tom Yam', desc: 'Combines chicken, beef, and mixed seafood inside a rich and spicy lemongrass tom yam soup.' }
  },
  'rojak_ayam': {
    ms: { name: 'Rojak Ayam', desc: 'Rojak mamak legendaris! Cucur garing pasir dibancuh kuah kacang lumat berkrim manis, dihiasi ayam goreng hancur.' },
    en: { name: 'Mamak Chicken Rojak', desc: 'Famous street-salad of crispy fritters, boiled eggs, sweet potato tofu dressed in sweet peanut gravy, with fried chicken.' }
  },
  'rojak_daging': {
    ms: { name: 'Rojak Daging', desc: 'Rojak mamak bumbu kacang pekat manis disajikan bersama kepingan daging lembu rebus berempah.' },
    en: { name: 'Mamak Beef Rojak', desc: 'Crispy Malaysian fritter salad tossed with fresh cucumber, sweet peanut sauce and spiced beef chunks.' }
  },
  'rojak_campur': {
    ms: { name: 'Rojak Campur', desc: 'Kombo mega rojak mamak cucur emas berserta ayam goreng hancur, tauhu dan hirisan daging.' },
    en: { name: 'Signature Mixed Rojak', desc: 'All-inclusive Mamak rojak featuring hard eggs, golden fritters, sliced beef, and spiced fried chicken pieces.' }
  },
  'tea_o': {
    ms: { name: 'Teh O', desc: 'Teh hitam brewed segar manis.' },
    en: { name: 'Sweet Black Tea (Teh O)', desc: 'Classic sweetened brewed black tea.' }
  },
  'tea_susu': {
    ms: { name: 'Teh Tarik / Teh Susu', desc: 'Teh susu tarik berkrim berbuih kaw manis kegemaran rakyat.' },
    en: { name: 'Teh Tarik (Foamy Milk Tea)', desc: 'Rich, froamy black tea mixed with sweet condensed and evaporated milk.' }
  },
  'kopi_o': {
    ms: { name: 'Kopi O', desc: 'Kopi hitam panggang tradisional brewed panas pekat manis.' },
    en: { name: 'Sweet Black Coffee (Kopi O)', desc: 'Traditional sweetened, robust, brewed hot black coffee.' }
  },
  'kopi_susu': {
    ms: { name: 'Kopi Susu', desc: 'Kopi susu tempatan yang kaw penuh aroma manis kental.' },
    en: { name: 'Mamak Milk Coffee', desc: 'Indulgent local espresso coffee carrying sweet condensed milk.' }
  },
  'nes_o': {
    ms: { name: 'Nescafe O', desc: 'Neskafe hitam brewed manis menyegarkan.' },
    en: { name: 'Nescafe Black (Nescafe O)', desc: 'Piping black Nescafe instant coffee drink sweetened.' }
  },
  'nes_susu': {
    ms: { name: 'Nescafe Susu', desc: 'Neskafe blended khas bersama susu tin manis berkrim.' },
    en: { name: 'Nescafe Milk Coffee', desc: 'Robust instant Nescafe coffee mixed with sweet milk.' }
  },
  'milo_o': {
    ms: { name: 'Milo O', desc: 'Minuman serbuk malt coklat Milo dibancuh herba tanpa susu.' },
    en: { name: 'Hot Cocoa Malt (Milo O)', desc: 'Dark chocolate malted cocoa drink served without milk.' }
  },
  'milo_susu': {
    ms: { name: 'Milo Susu', desc: 'Milo coklat susu pekat pekat berkrim kegemaran seisi keluarga.' },
    en: { name: 'Creamy Milo (Sweet Milk)', desc: 'Creamy high-energy chocolate malt Milo with sweet condensed milk.' }
  },
  'nestum_o': {
    ms: { name: 'Nestum O', desc: 'Minuman bijirin Nestum wangi berperisa brewed tanpa susu.' },
    en: { name: 'Nestum Cereal Plain', desc: 'Warm sweetened multi-grain Nestum cereal without milk.' }
  },
  'nestum_susu': {
    ms: { name: 'Nestum Susu', desc: 'Bijirin Nestum berperisa vanila berkrim tebal dengan limpahan susu tin manis.' },
    en: { name: 'Nestum Cereal Milk', desc: 'Comforting multi-grain Nestum cereal brewed hot with sweet condensed milk.' }
  },
  'hor_o': {
    ms: { name: 'Horlicks O', desc: 'Minuman malt Horlicks dibancuh brewed manis herba tanpa susu.' },
    en: { name: 'Malted Horlicks Plain', desc: 'Thick hot malted drink without milk, rich in calcium.' }
  },
  'hor_susu': {
    ms: { name: 'Horlicks Susu', desc: 'Susu Horlicks berkrim tinggi kalsium manis pekat.' },
    en: { name: 'Malted Horlicks with Milk', desc: 'Creamy Horlicks sweetened with condensed and evaporated milk.' }
  },
  'sirap_ais': {
    ms: { name: 'Air Sirap Ais', desc: 'Minuman sirap bunga mawar merah sejuk ais gred premium.' },
    en: { name: 'Iced Rose Syrup', desc: 'Ice-chilled red rose water syrup, standard sweet refresh.' }
  },
  'bandung_ais': {
    ms: { name: 'Air Bandung Ais', desc: 'Sirap merah mawar mawar berminyak susu pekat merah jambu sejuk.' },
    en: { name: 'Iced Rose Bandung Milk', desc: 'Chilled pink condensed milk rose water syrup infusion.' }
  },
  'laici_ais': {
    ms: { name: 'Sirap Laici Ais', desc: 'Air sirap merah mawar sejuk ais dipenuhi buah laici segar tanpa biji.' },
    en: { name: 'Iced Lychee Syrup', desc: 'Sweetened iced rose syrup loaded with seedless tropical lychee fruits.' }
  },
  'air_lemon': {
    ms: { name: 'Air Lemon Segar', desc: 'Jus lemon segar ditapis ais masam manis.' },
    en: { name: 'Fresh Lemon Juice', desc: 'Pucker-fresh hand-squeezed pure lemon juice with syrup.' }
  },
  'lemon_tea': {
    ms: { name: 'Lemon Tea', desc: 'Teh ais lemon segar penyejuk tekak.' },
    en: { name: 'Iced Lemon Tea', desc: 'Classic sweetened brewed black tea with real lemon juice.' }
  },
  'ta_o': {
    ms: { name: 'Tongkat Ali O', desc: 'Kopi herba Tongkat Ali herba hitam pekat.' },
    en: { name: 'Tongkat Ali O (Black)', desc: 'Traditional energetic herbal black coffee potion.' }
  },
  'ta_susu': {
    ms: { name: 'Tongkat Ali Susu', desc: 'Kopi Tenaga Tongkat Ali digabung rasa manis susu pekat tin.' },
    en: { name: 'Tongkat Ali Susu (Milk)', desc: 'Tongkat Ali herbal coffee mixed with rich sweetened condensed milk.' }
  },
  'ali_cafe_o': {
    ms: { name: 'Ali Café O', desc: 'Jenama Kopi Ali Cafe hitam brewed manis herba bertenaga.' },
    en: { name: 'Ali Cafe O (Black)', desc: 'Signature premium dry energy robust black coffee.' }
  },
  'ali_cafe_susu': {
    ms: { name: 'Ali Café Susu', desc: 'Ali Cafe bumbu susu manis herba bertenaga.' },
    en: { name: 'Ali Cafe Susu (Milk)', desc: 'Aromatic smooth energy Ali Cafe milk coffee with sweetened milk.' }
  },
  'red_cafe': {
    ms: { name: 'Red Café', desc: 'Pati kopi merah arabica wangi.' },
    en: { name: 'Red Cafe Special', desc: 'Rich zesty red coffee formulation with aromatic herbs.' }
  },
  'neslo': {
    ms: { name: 'Neslo', desc: 'Gabungan mantap Nescafe wangi bersama Milo coklat susu pekat.' },
    en: { name: 'Neslo Chocolate Coffee', desc: 'Beloved fusion cream mocha of robust Nescafe and malt Milo.' }
  },
  'tea_c_special': {
    ms: { name: 'Teh C Special', desc: 'Teh tiga lapis: Gula Melaka manis bawah, susu cair tengah, teh pekat atas.' },
    en: { name: '3-Layer Tea C Special', desc: 'Three-layer local specialty: palm sugar, evaporated milk, and black tea.' }
  },
  'ceo_cafe': {
    ms: { name: 'CEO Café', desc: 'Kopi premium kesihatan herba herba Reishi istimewa.' },
    en: { name: 'CEO Lingzhi Coffee', desc: 'Premium organic healthy coffee containing Ganoderma Reishi extract.' }
  },
  'air_suam': {
    ms: { name: 'Air Suam', desc: 'Segelas air kosong minuman bersih suam.' },
    en: { name: 'Warm Water', desc: 'A glass of clean warm drinking water.' }
  },
  'air_sejuk': {
    ms: { name: 'Air Sejuk', desc: 'Segelas air minuman kosong sejuk ais.' },
    en: { name: 'Chilled Water', desc: 'A glass of ice-chilled plain drinking water.' }
  },
  'chinese_tea': {
    ms: { name: 'Chinese Tea', desc: 'Teh hijau cina wangi antioksida.' },
    en: { name: 'Chinese Green Tea', desc: 'Traditional clear unsweetened Chinese green tea.' }
  },
  'jus_avocado': {
    ms: { name: 'Jus Avocado Susu', desc: 'Krim shake buah mentega avocado manis bersama susu coklat nipis meleret.' },
    en: { name: 'Creamy Avocado Shake', desc: 'Rich and creamy pure avocado shake blended with chocolate syrup drizzle.' }
  },
  'jus_mango': {
    ms: { name: 'Jus Mangga', desc: 'Puri jus mangga pekat wangi berais gred premium.' },
    en: { name: 'Pure Mango Juice', desc: 'Ice chilled thick and pulpy sweet honey mango puree.' }
  },
  'jus_watermelon': {
    ms: { name: 'Jus Tembikai', desc: 'Jus tembikai merah manis diblend segar ais.' },
    en: { name: 'Fresh Watermelon Juice', desc: 'Crisp ice-blended thirst-quenching sweet watermelon shake.' }
  },
  'jus_orange': {
    ms: { name: 'Jus Oren Segar', desc: 'Segelas jus oren diperah segar bersunyi pulp oren.' },
    en: { name: 'Fresh Orange Juice', desc: 'Sweet, citrus pulpy refreshing glass of orange squeeze.' }
  },
  'jus_apple': {
    ms: { name: 'Jus Epal', desc: 'Jus parutan epal hijau rangup atau merah berserta ais.' },
    en: { name: 'Fresh Apple Juice', desc: 'Ice-pulped crisp sweet red fuji or tart green apple juice.' }
  },
  'jus_carrot': {
    ms: { name: 'Jus Lobak Merah', desc: 'Jus lobak merah vitamin segar berais berserta susu.' },
    en: { name: 'Fresh Carrot Milk Juice', desc: 'Healthy and vitamin rich chilled carrot juice with a touch of milk.' }
  },
  'jus_pineapple': {
    ms: { name: 'Jus Nanas', desc: 'Jus nanas madu manis berais masam manis.' },
    en: { name: 'Pineapple Juice', desc: 'Sunny, sweet and tangy refreshing pineapple juice extract.' }
  },
  'jus_lemon': {
    ms: { name: 'Jus Lemon Ais', desc: 'Pati air lemon manis berasid sejuk ais.' },
    en: { name: 'Iced Lemon Sweet', desc: 'Sweetened iced, tart refreshing hand-squeezed lemon juice.' }
  },
  'jus_honeydew': {
    ms: { name: 'Jus Tembikai Susu (Honeydew)', desc: 'Jus tembikai susu segar disaji ais bumbu berkrim.' },
    en: { name: 'Honeydew Sweet Shake', desc: 'Pale green fresh sweet honeydew melon blended with milk.' }
  },
  'mineral_500ml': {
    ms: { name: 'Air Mineral 500ml', desc: 'Satu botol air mineral air minuman bersih sejuk berpenutup.' },
    en: { name: 'Mineral Water 500ml', desc: 'A sealed standard chilled bottle of natural spring mineral water.' }
  },
  'minuman_botol': {
    ms: { name: 'Minuman Tin / Botol', desc: 'Pilihan minuman ringan tin soda manis sejuk (Coca-Cola, 100 Plus, Sprite).' },
    en: { name: 'Canned Soft Drink Selection', desc: 'Your choice of chilled canned or bottled sweet carbonated soda.' }
  },
  'abc_biasa': {
    ms: { name: 'ABC Biasa', desc: 'Air Batu Campur tradisi! Saguan ais parut bersama kacang merah, jagung manis manis condong, susu tin dan sirap merah.' },
    en: { name: 'Classic Malaysian ABC', desc: 'Traditional Air Batu Campur. Shaved ice with sweet corn, red kidney beans, grass jelly, rose syrup, and milk.' }
  },
  'abc_buah': {
    ms: { name: 'ABC Buah-Buahan', desc: 'ABC premium dipenuhi taburan buah-buahan mangga, tembikai, kiwi segar hancur di atas parutan ais.' },
    en: { name: 'Fresh Fruit Mixed ABC', desc: 'Delicious shaved ice loaded with sweet syrup, milk, and seasonal chopped fresh fruits.' }
  },
  'abc_special': {
    ms: { name: 'ABC Special (Ais Krim)', desc: 'ABC Ais Batu Campur premium dihiasi seketul scoop ais krim vanila berkrim manis.' },
    en: { name: 'Executive Vanilla Ice Cream ABC', desc: 'Premium shaved ice dessert crowned with a generous scoop of vanilla ice cream.' }
  },
  'air_kelapa': {
    ms: { name: 'Air Kelapa Muda', desc: 'Air kelapa muda segar asli dipenuhi isi kelapa cangkul lembut sejuk ais.' },
    en: { name: 'Fresh Giant Coconut Water', desc: 'Chilled sweet natural coconut water served in shell with delicious soft pulp.' }
  }
};

/**
 * Translate helper functions
 */
export function t(key: string, lang: Language): string {
  const record = uiTranslations[key];
  if (!record) return key;
  return record[lang] || record['ms'];
}

export function translateSubcategory(subId: string, defaultName: string, lang: Language): string {
  const trans = subcategoryTranslations[subId];
  if (!trans) return defaultName;
  return trans[lang] || defaultName;
}

export function translateItemName(itemId: string, defaultName: string, lang: Language): string {
  const trans = itemTranslations[itemId];
  if (!trans) return defaultName;
  return trans['ms']?.name || defaultName;
}

export function translateItemDesc(itemId: string, defaultDesc: string, lang: Language): string {
  const trans = itemTranslations[itemId];
  if (!trans) return defaultDesc;
  return trans[lang]?.desc || defaultDesc;
}
