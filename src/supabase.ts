import { createClient } from '@supabase/supabase-js';
import { MenuItem, MenuCategory, MenuSubcategory, Order } from './types';
import { categories, subcategories, menuItems } from './data/seedData';

// Initialize Client-Side Supabase Client
const metaEnv = (import.meta as any).env || {};
const rawSupabaseUrl = metaEnv.VITE_SUPABASE_URL || '';
const supabaseAnonKey = metaEnv.VITE_SUPABASE_ANON_KEY || '';

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

export function getSupabase() {
  return supabase;
}

// Resilient Client-Side Seed Check triggers. 
// Handled securely on the server-side, so on-client this is a clean no-op resolving instantly.
export async function seedDatabaseIfEmpty(): Promise<void> {
  return Promise.resolve();
}

// Client-Side Robust Fetching proxying requests to our backend API
export async function fetchLiveMenu(): Promise<{
  categories: MenuCategory[];
  subcategories: MenuSubcategory[];
  menuItems: MenuItem[];
}> {
  try {
    const response = await fetch('/api/menu');
    if (!response.ok) {
      throw new Error(`Server returned HTTP status ${response.status}`);
    }
    const data = await response.json();
    
    if (data && Array.isArray(data.categories) && Array.isArray(data.menuItems)) {
      return data;
    }
    
    console.warn("API menu payload malformed. Using fallback seedData.");
    return { categories, subcategories, menuItems };
  } catch (error) {
    console.error("Failed to connect to menu API proxy. Activating local resilience failover:", error);
    return { categories, subcategories, menuItems };
  }
}

// Client-Side Direct Supabase Order submission
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
