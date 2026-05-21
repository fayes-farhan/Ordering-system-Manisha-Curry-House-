import { MenuItem, MenuCategory, MenuSubcategory, Order } from './types';
import { categories, subcategories, menuItems } from './data/seedData';

// Dummy client helper for backwards compatibility in typescript checking
export function getSupabase() {
  return null;
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

// Client-Side Robust Order submission proxying requests to our backend API
export async function createLiveOrder(order: Order): Promise<boolean> {
  try {
    const response = await fetch('/api/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server responded with status ${response.status}`);
    }

    const data = await response.json();
    return data.success === true;
  } catch (error: any) {
    console.error("Order API request error:", error);
    throw new Error(error.message || "Failed to contact order API proxy. Sila hantar semula.");
  }
}
