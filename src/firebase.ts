import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  initializeFirestore,
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  writeBatch,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { categories, subcategories, menuItems } from './data/seedData';
import { MenuItem, MenuCategory, MenuSubcategory, Order } from './types';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDM2acFEL2U6Z-2a4cCgJP2hev4dSaVwmE",
  authDomain: "primeval-device-9km1r.firebaseapp.com",
  projectId: "primeval-device-9km1r",
  storageBucket: "primeval-device-9km1r.firebasestorage.app",
  messagingSenderId: "737006298248",
  appId: "1:737006298248:web:33b054bcaaf9c3784e6b3d",
  databaseId: "ai-studio-8ff20d32-346a-4ff9-a797-f46f3d727990"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom Database ID
export const db = getFirestore(app, firebaseConfig.databaseId);

export interface FirestoreErrorInfo {
  code: string;
  message: string;
  details?: string;
}

export function handleFirestoreError(error: any): FirestoreErrorInfo {
  console.error("Firestore operation failed:", error);
  return {
    code: error.code || 'unknown',
    message: error.message || 'An unexpected database error occurred.',
    details: error.details || String(error)
  };
}

// Function to seed Firestore if empty
export async function seedDatabaseIfEmpty() {
  try {
    const itemsRef = collection(db, 'menu_items');
    const querySnapshot = await getDocs(itemsRef);
    
    if (querySnapshot.empty) {
      console.log("Firestore menu is empty. Starting automatic database seeding...");
      
      // 1. Seed categories
      for (const cat of categories) {
        await setDoc(doc(db, 'menu_categories', cat.id), cat);
      }
      console.log("Successfully seeded menu categories.");

      // 2. Seed subcategories
      for (const sub of subcategories) {
        await setDoc(doc(db, 'menu_subcategories', sub.id), sub);
      }
      console.log("Successfully seeded menu subcategories.");

      // 3. Seed menu items in batches of 50 (Firestore limit is 500 per batch)
      let batch = writeBatch(db);
      let count = 0;
      
      for (const item of menuItems) {
        const itemRef = doc(db, 'menu_items', item.id);
        batch.set(itemRef, item);
        count++;
        
        if (count % 50 === 0) {
          await batch.commit();
          batch = writeBatch(db);
        }
      }
      
      if (count % 50 !== 0) {
        await batch.commit();
      }
      
      console.log(`Successfully seeded ${count} menu items to Firestore.`);
    } else {
      console.log("Firestore collections already contain menu items. Seeding skipped.");
    }
  } catch (err) {
    console.error("Failed to seed database during startup:", handleFirestoreError(err));
  }
}

// Function to fetch full menu categories, subcategories, and items from Firestore
// Resiliently falls back to local seedData in case of network discrepancies or initial setup delays.
export async function fetchLiveMenu(): Promise<{
  categories: MenuCategory[];
  subcategories: MenuSubcategory[];
  menuItems: MenuItem[];
}> {
  try {
    // Attempt parallel retrieval from Firestore
    const [catSnap, subSnap, itemsSnap] = await Promise.all([
      getDocs(collection(db, 'menu_categories')),
      getDocs(collection(db, 'menu_subcategories')),
      getDocs(collection(db, 'menu_items'))
    ]);

    if (catSnap.empty || subSnap.empty || itemsSnap.empty) {
      console.warn("Firestore returned empty nodes, falling back to clean local manifest.");
      return { categories, subcategories, menuItems };
    }

    const liveCats: MenuCategory[] = [];
    catSnap.forEach((doc) => liveCats.push(doc.data() as MenuCategory));
    
    const liveSubs: MenuSubcategory[] = [];
    subSnap.forEach((doc) => liveSubs.push(doc.data() as MenuSubcategory));
    
    const liveItems: MenuItem[] = [];
    itemsSnap.forEach((doc) => liveItems.push(doc.data() as MenuItem));

    // Sort by designated operational order
    liveCats.sort((a, b) => a.order - b.order);
    liveSubs.sort((a, b) => a.order - b.order);

    return {
      categories: liveCats,
      subcategories: liveSubs,
      menuItems: liveItems
    };
  } catch (error) {
    console.error("Database connection check failed. Activating local resilience failover...", handleFirestoreError(error));
    return { categories, subcategories, menuItems };
  }
}

// Submit a customer's order to Firestore under public strict check rules
export async function createLiveOrder(order: Order): Promise<boolean> {
  try {
    const orderRef = doc(db, 'orders', order.id);
    await setDoc(orderRef, order);
    console.log(`Order ${order.id} stored successfully in Firestore.`);
    return true;
  } catch (error) {
    const errorDetails = handleFirestoreError(error);
    console.error("Order submission refused by security constraints:", errorDetails);
    throw new Error(errorDetails.message);
  }
}
