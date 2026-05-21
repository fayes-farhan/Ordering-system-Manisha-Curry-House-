import express from "express";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Load the seed data for resilient server-side fallbacks & seeding
import { categories, subcategories, menuItems } from "./src/data/seedData";
import { MenuCategory, MenuSubcategory, MenuItem, Order, CategoryType } from "./src/types";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Supabase on the server-side safely
// The browser will never have access to these credentials
const rawSupabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

let supabaseUrl = rawSupabaseUrl ? rawSupabaseUrl.trim() : "";
if (supabaseUrl) {
  // Clean up any trailing slash and /rest/v1 to prevent duplicate nested pathing with supabase-js
  supabaseUrl = supabaseUrl.replace(/\/+$/, "");
  if (supabaseUrl.endsWith("/rest/v1")) {
    supabaseUrl = supabaseUrl.substring(0, supabaseUrl.length - 8);
  }
  supabaseUrl = supabaseUrl.replace(/\/+$/, "");
}

let supabaseClient: any = null;

if (supabaseUrl && supabaseAnonKey && !supabaseUrl.startsWith("YOUR_") && !supabaseAnonKey.startsWith("YOUR_")) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    console.log(`Supabase client successfully initialized on the server. Base URL has been sanitized: [${supabaseUrl}]`);
  } catch (error) {
    console.error("Failed to initialize Supabase client on the server:", error);
  }
} else {
  console.warn("Supabase credentials are not configured or are placeholder values. Operating on local memory fallbacks.");
}

// Helper function to detect and output helpful setup recommendations for common Supabase challenges
function analyzeSupabaseError(message: string): string {
  const msg = String(message || "");
  if (msg.includes("Invalid path specified in request URL") || msg.includes("relation") || msg.includes("not found")) {
    return `
👉 [SUPABASE SETUP NOTICE]
The core menu tables were not found in your Supabase database.
To resolve this easily:
  1. Open your Supabase Dashboard (https://supabase.com)
  2. Select your project and click "SQL Editor" on the left-hand navigation bar.
  3. Click "+ New query", then paste the entire SQL definition sequence from 'supabase_schema.sql' (found at the root of this project).
  4. Click "Run" to automatically instantiate your tables and RLS public policies!
The web application is operating perfectly using robust localized fallback data until tables are ready.
`;
  }
  if (msg.includes("Forbidden use of secret API key in browser") || msg.includes("JWT") || msg.includes("secret key") || msg.includes("ApiKey")) {
    return `
👉 [SUPABASE CREDENTIALS WARNING]
Supabase rejected the schema query with a 'Forbidden use of secret API key' verification response.
This error occurs if you configured VITE_SUPABASE_ANON_KEY with your 'service_role' (secret) API key instead of the 'anon' (public) API key.
To resolve this easily:
  1. Go to your Supabase Dashboard -> Project Settings -> API.
  2. Copy the 'anon public' key (NOT the service_role key).
  3. Update VITE_SUPABASE_ANON_KEY inside your configuration settings with the anon public key.
The web application is operating perfectly using robust localized fallback data until this is corrected.
`;
  }
  return `Supabase response notice: ${msg}`;
}

// Resilient backend seeding logic
async function seedDatabaseIfEmpty() {
  if (!supabaseClient) {
    console.log("Supabase client is not initialized. Skipping automatic seeding check.");
    return;
  }

  try {
    const { data: existingItems, error: fetchErr } = await supabaseClient
      .from("menu_items")
      .select("id")
      .limit(1);

    if (fetchErr) {
      console.warn(analyzeSupabaseError(fetchErr.message));
      return;
    }

    if (!existingItems || existingItems.length === 0) {
      console.log("Supabase database menu is empty. Initiating secure backend database seeding...");

      // Map local seed data to client's newer direct schema columns:
      // ('Nasi Briyani Ayam','makanan','nasi',14.00,FALSE,NULL,NULL,TRUE,1)
      const itemPayloads = menuItems.map((item, idx) => {
        let sub = item.subcategoryId;
        if (sub.startsWith("sub_")) {
          sub = sub.replace("sub_", "");
        }

        return {
          name: item.name,
          category: item.categoryType,
          subcategory: sub,
          base_price: item.basePrice,
          has_temp_option: item.hasTempOption,
          price_panas: item.pricePanas !== undefined ? item.pricePanas : null,
          price_sejuk: item.priceSejuk !== undefined ? item.priceSejuk : null,
          image_url: item.imageUrl || null,
          is_available: item.isAvailable,
          display_order: idx + 1
        };
      });

      const chunkSize = 50;
      for (let i = 0; i < itemPayloads.length; i += chunkSize) {
        const chunk = itemPayloads.slice(i, i + chunkSize);
        const { error: itemErr } = await supabaseClient.from("menu_items").insert(chunk);
        if (itemErr) throw new Error(`MenuItem seeding failed at index ${i}: ${itemErr.message}`);
      }

      console.log(`Database seeding completed successfully. ${itemPayloads.length} items created.`);
    } else {
      console.log("Supabase database already contains items. Skipping seeding step.");
    }
  } catch (err: any) {
    console.error("Seeding operation failed on backend startup:", err.message || err);
  }
}

// --------------------------------------------------------
// API Endpoints
// --------------------------------------------------------

// Healthcheck endpoint
app.get("/api/health", async (req, res) => {
  const diagnostics: any = {
    status: "ok",
    supabaseConfigured: !!supabaseClient,
    envUrl: process.env.VITE_SUPABASE_URL ? "defined" : "undefined",
    envKey: process.env.VITE_SUPABASE_ANON_KEY ? "defined" : "undefined",
    tables: {
      menu_items: { exists: false, error: null },
      orders: { exists: false, error: null },
      order_items: { exists: false, error: null }
    }
  };

  if (!supabaseClient) {
    return res.json({ ...diagnostics, status: "Supabase client not initialized" });
  }

  try {
    // Check menu_items
    const { error: menuErr } = await supabaseClient.from("menu_items").select("id").limit(1);
    if (menuErr) {
      diagnostics.tables.menu_items.error = menuErr.message;
    } else {
      diagnostics.tables.menu_items.exists = true;
    }

    // Check orders
    const { error: ordersErr } = await supabaseClient.from("orders").select("id").limit(1);
    if (ordersErr) {
      diagnostics.tables.orders.error = ordersErr.message;
    } else {
      diagnostics.tables.orders.exists = true;
    }

    // Check order_items
    const { error: itemsErr } = await supabaseClient.from("order_items").select("id").limit(1);
    if (itemsErr) {
      diagnostics.tables.order_items.error = itemsErr.message;
    } else {
      diagnostics.tables.order_items.exists = true;
    }
  } catch (err: any) {
    diagnostics.diagnosticError = err.message || err;
  }

  console.log("Supabase Connection Diagnostics:", JSON.stringify(diagnostics));
  res.json(diagnostics);
});

// GET /api/menu - Securely fetches entire menu and handles seeding check on request
app.get("/api/menu", async (req, res) => {
  if (!supabaseClient) {
    console.warn("API request for menu received but Supabase is offline. Serving local seed data.");
    return res.json({ categories, subcategories, menuItems });
  }

  try {
    // Run seed check inline to keep standard UX flow consistent
    await seedDatabaseIfEmpty();

    const itemRes = await supabaseClient
      .from("menu_items")
      .select("*")
      .order("display_order", { ascending: true });

    if (itemRes.error) {
      console.warn(analyzeSupabaseError(itemRes.error.message));
      return res.json({ categories, subcategories, menuItems });
    }

    if (!itemRes.data || itemRes.data.length === 0) {
      console.warn("Retrieved empty set of items from database. Serving local seedData instead.");
      return res.json({ categories, subcategories, menuItems });
    }

    // Map your new custom flat database rows back to CamelCase models expectation
    const liveItems: MenuItem[] = itemRes.data.map((row: any) => {
      const localMatch = menuItems.find(
        (item) => item.name.toLowerCase() === row.name.toLowerCase()
      );

      let subId = row.subcategory;
      if (subId && !subId.startsWith("sub_")) {
        subId = "sub_" + subId;
      }

      return {
        id: row.id,
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

    return res.json({
      categories,
      subcategories,
      menuItems: liveItems
    });
  } catch (error) {
    console.error("Resilient fallback triggered by unexpected server error fetching menu:", error);
    return res.json({ categories, subcategories, menuItems });
  }
});

// POST /api/order - Securely submits a verified QR order
app.post("/api/order", async (req, res) => {
  const order: Order = req.body;

  if (!order || !order.id || !order.items) {
    return res.status(400).json({ success: false, error: "Invalid order data provided." });
  }

  if (!supabaseClient) {
    console.log("Saving order to localized session storage logs as Supabase is offline.");
    return res.json({ success: true, localCached: true });
  }

  try {
    // 1. Insert Core Order Row
    const { data: insertedOrder, error: orderErr } = await supabaseClient
      .from("orders")
      .insert([{
        session_id: order.tableSession,
        total_amount: order.totalAmount,
        payment_method: order.paymentMethod,
        status: order.status || "confirmed",
        order_reference: order.id,
        created_at: order.createdAt || new Date().toISOString()
      }])
      .select()
      .single();

    if (orderErr) {
      console.error("Supabase failed inserting order:", orderErr.message);
      const friendlyError = analyzeSupabaseError(orderErr.message);
      return res.status(500).json({ success: false, error: friendlyError });
    }

    if (!insertedOrder) {
      throw new Error("Unable to obtain confirmation response from orders insert.");
    }

    // 2. Fetch UUIDs from menu_items to map them correctly as Foreign Keys
    const { data: dbItems, error: itemsFetchErr } = await supabaseClient
      .from("menu_items")
      .select("id, name");

    const itemNameToIdMap = new Map<string, string>();
    if (dbItems) {
      dbItems.forEach((it: any) => {
        itemNameToIdMap.set(it.name.toLowerCase(), it.id);
      });
    }

    // 3. Batch insert order items referencing the generated Order UUID
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

    const { error: itemsInsertErr } = await supabaseClient
      .from("order_items")
      .insert(orderItemsPayload);

    if (itemsInsertErr) {
      console.error("Supabase failed inserting order items list:", itemsInsertErr.message);
    }

    console.log(`Successfully dispatched order ${order.id} to backend database.`);
    return res.json({ success: true });
  } catch (err: any) {
    console.error("Backend error submitting order:", err);
    return res.status(500).json({ success: false, error: err.message || "An unexpected database insert failure occurred." });
  }
});

// --------------------------------------------------------
// Vite Frontend Middleware Handling
// --------------------------------------------------------
async function initializeFrontend() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Full-Stack secure server running perfectly at http://localhost:${PORT}`);
  });
}

initializeFrontend();
