/// <reference types="vite/client" />

import { createClient } from '@supabase/supabase-js';
import { MenuItem, MenuCategory, MenuSubcategory, Order, CategoryType } from './types';
import { categories, subcategories, menuItems } from './data/seedData';

// Initialize Client-Side Supabase Client directly using standard import.meta.env
const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

let supabaseUrl = rawSupabaseUrl ? rawSupabaseUrl.trim() : '';
if (supabaseUrl) {
  supabaseUrl = supabaseUrl.replace(/\/+$/, "");
  if (supabaseUrl.endsWith("/rest/v1")) {
    supabaseUrl = supabaseUrl.substring(0, supabaseUrl.length - 8);
  }
  supabaseUrl = supabaseUrl.replace(/\/+$/, "");
}

export const supabase = supabaseUrl && supabaseAnonKey && !supabaseUrl.startsWith("YOUR_") && !supabaseAnonKey.startsWith("YOUR_")
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Diagnostics console logs to confirm database connection and setup
if (supabase) {
  console.log("Supabase Client initialized successfully via import.meta.env variables.");
  (async () => {
    try {
      const { count, error } = await supabase.from('menu_items').select('count', { count: 'exact', head: true });
      if (error) {
        console.error("Supabase connection check error:", error.message);
      } else {
        console.log("Supabase connection successfully verified! Connection status: OK. Items registered in DB:", count);
      }
    } catch (err) {
      console.error("Unhandled exception during Supabase connection health check:", err);
    }
  })();
} else {
  console.warn("Supabase Client could not be initialized! Missing or invalid VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in environment.");
}

export function getSupabase() {
  return supabase;
}

// Resilient Client-Side Seed Check triggers.
export async function seedDatabaseIfEmpty(): Promise<void> {
  return Promise.resolve();
}

// Client-Side Robust Fetching directly querying Supabase with local fallback
export async function fetchLiveMenu(): Promise<{
  categories: MenuCategory[];
  subcategories: MenuSubcategory[];
  menuItems: MenuItem[];
}> {
  if (!supabase) {
    console.warn("Supabase client is not initialized. Serving local seedData.");
    return { categories, subcategories, menuItems };
  }

  try {
    const itemRes = await supabase
      .from("menu_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (itemRes.error) {
      console.warn("Failed to fetch menu items from Supabase directly:", itemRes.error.message, "Using local seedData waterfall.");
      return { categories, subcategories, menuItems };
    }

    if (!itemRes.data || itemRes.data.length === 0) {
      console.warn("Retrieved empty menu item list from database. Using local seedData default.");
      return { categories, subcategories, menuItems };
    }

    console.log(`Successfully fetched ${itemRes.data.length} live menu items from Supabase.`);

    const liveItems: MenuItem[] = itemRes.data.map((row: any) => {
      const localMatch = menuItems.find(
        (item) => item.name.toLowerCase() === row.name.toLowerCase()
      );

      let subId = row.subcategory;
      if (subId && !subId.startsWith("sub_")) {
        subId = "sub_" + subId;
      }

      return {
        id: localMatch?.id || row.id,
        subcategoryId: subId,
        categoryType: row.category as CategoryType,
        name: row.name,
        basePrice: Number(row.base_price || 0),
        hasTempOption: Boolean(row.has_temp_option),
        pricePanas: row.price_panas !== null && row.price_panas !== undefined ? Number(row.price_panas) : undefined,
        priceSejuk: row.price_sejuk !== null && row.price_sejuk !== undefined ? Number(row.price_sejuk) : undefined,
        imageUrl: row.image_url || localMatch?.imageUrl || (row.category === "makanan"
          ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80"
          : "https://images.unsplash.com/photo-1536935338788-846bb9981813?w=600&auto=format&fit=crop&q=80"),
        isAvailable: Boolean(row.is_available),
        description: row.description || localMatch?.description || `${row.name} yang lazat.`
      };
    });

    return {
      categories,
      subcategories,
      menuItems: liveItems
    };
  } catch (error) {
    console.error("Direct Supabase menu fetch exception. Serving local seedData:", error);
    return { categories, subcategories, menuItems };
  }
}

// Client-Side Direct Supabase Order submission inserting structured parents and children
export async function createLiveOrder(order: Order): Promise<boolean> {
  if (!supabase) {
    console.warn("Supabase client is not initialized in client. Operating on fallbacks.");
    throw new Error("Sistem pangkalan data tidak disambungkan. Sila cuba tawarkan semula.");
  }

  try {
    // 1. Insert parent order record
    const { data: insertedOrder, error: orderErr } = await supabase
      .from('orders')
      .insert([{
        session_id: order.tableSession,
        total_amount: order.totalAmount,
        payment_method: order.paymentMethod,
        status: order.status || 'confirmed',
        order_reference: order.id,
        created_at: order.createdAt || new Date().toISOString()
      }])
      .select()
      .single();

    if (orderErr) {
      console.error("Failed to insert order into Supabase:", orderErr.message);
      throw new Error(orderErr.message);
    }

    if (!insertedOrder) {
      throw new Error("Unable to obtain confirmation from orders insertion response.");
    }

    // 2. Query catalog menu_items to resolve exact UUID foreign keys
    const { data: dbItems, error: itemsFetchErr } = await supabase
      .from('menu_items')
      .select('id, name');

    const itemNameToIdMap = new Map<string, string>();
    if (dbItems) {
      dbItems.forEach((it: any) => {
        itemNameToIdMap.set(it.name.toLowerCase(), it.id);
      });
    }

    // 3. Insert child order_items
    const orderItemsPayload = order.items.map((item) => {
      const dbItemId = itemNameToIdMap.get(item.name.toLowerCase()) || null;

      return {
        order_id: insertedOrder.id,
        menu_item_id: dbItemId,
        item_name: item.name,
        quantity: item.quantity,
        selected_temp: item.selectedTemp,
        unit_price: item.unitPrice,
        subtotal: item.subtotal
      };
    });

    const { error: itemsInsertErr } = await supabase
      .from('order_items')
      .insert(orderItemsPayload);

    if (itemsInsertErr) {
      console.error("Failed to insert order items of live order:", itemsInsertErr.message);
      throw new Error(itemsInsertErr.message);
    }

    console.log(`Directly submitted live order ${order.id} with ${order.items.length} items to database.`);
    return true;
  } catch (error: any) {
    console.error("Client direct order transaction exception:", error);
    throw new Error(error.message || "Failed to finalize database transaction. Sila cuba lagi.");
  }
}

