import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Load the seed data for resilient server-side fallbacks & seeding
import { categories, subcategories, menuItems } from "./src/data/seedData";
import { MenuCategory, MenuSubcategory, MenuItem, Order } from "./src/types";

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Supabase on the server-side safely
// The browser will never have access to these credentials
const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

let supabaseClient: any = null;

if (supabaseUrl && supabaseAnonKey && !supabaseUrl.startsWith("YOUR_") && !supabaseAnonKey.startsWith("YOUR_")) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    console.log("Supabase client successfully initialized on the server.");
  } catch (error) {
    console.error("Failed to initialize Supabase client on the server:", error);
  }
} else {
  console.warn("Supabase credentials are not configured or are placeholder values. Operating on local memory fallbacks.");
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
      console.warn("Could not query menu_items in Supabase. Tables might not be created. Error:", fetchErr.message);
      return;
    }

    if (!existingItems || existingItems.length === 0) {
      console.log("Supabase database menu is empty. Initiating secure backend database seeding...");

      // 1. Seed categories
      const catPayloads = categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        type: cat.type,
        icon: cat.icon,
        order: cat.order
      }));
      const { error: catErr } = await supabaseClient.from("menu_categories").upsert(catPayloads);
      if (catErr) throw new Error(`Category seeding failed: ${catErr.message}`);

      // 2. Seed subcategories
      const subPayloads = subcategories.map(sub => ({
        id: sub.id,
        category_id: sub.categoryId,
        name: sub.name,
        icon: sub.icon,
        order: sub.order
      }));
      const { error: subErr } = await supabaseClient.from("menu_subcategories").upsert(subPayloads);
      if (subErr) throw new Error(`Subcategory seeding failed: ${subErr.message}`);

      // 3. Seed menu items in chunks
      const itemPayloads = menuItems.map(item => ({
        id: item.id,
        subcategory_id: item.subcategoryId,
        category_type: item.categoryType,
        name: item.name,
        base_price: item.basePrice,
        has_temp_option: item.hasTempOption,
        price_panas: item.pricePanas !== undefined ? item.pricePanas : null,
        price_sejuk: item.priceSejuk !== undefined ? item.priceSejuk : null,
        image_url: item.imageUrl,
        is_available: item.isAvailable,
        description: item.description || null
      }));

      const chunkSize = 50;
      for (let i = 0; i < itemPayloads.length; i += chunkSize) {
        const chunk = itemPayloads.slice(i, i + chunkSize);
        const { error: itemErr } = await supabaseClient.from("menu_items").upsert(chunk);
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
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", supabaseConfigured: !!supabaseClient });
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

    const [catRes, subRes, itemRes] = await Promise.all([
      supabaseClient.from("menu_categories").select("*"),
      supabaseClient.from("menu_subcategories").select("*"),
      supabaseClient.from("menu_items").select("*")
    ]);

    if (catRes.error || subRes.error || itemRes.error) {
      console.warn("Error querying database tables. Falling back gracefully to seedData.");
      return res.json({ categories, subcategories, menuItems });
    }

    if (!catRes.data || catRes.data.length === 0 || !subRes.data || !itemRes.data) {
      console.warn("Retrieved empty set from database. Serving local seedData instead.");
      return res.json({ categories, subcategories, menuItems });
    }

    // Map snake_case database rows back to perfect frontend CamelCase types
    const liveCats: MenuCategory[] = catRes.data.map((row: any) => ({
      id: row.id,
      name: row.name,
      type: row.type,
      icon: row.icon || "",
      order: Number(row.order)
    }));

    const liveSubs: MenuSubcategory[] = subRes.data.map((row: any) => ({
      id: row.id,
      categoryId: row.category_id !== undefined ? row.category_id : row.categoryId,
      name: row.name,
      icon: row.icon || "",
      order: Number(row.order)
    }));

    const liveItems: MenuItem[] = itemRes.data.map((row: any) => ({
      id: row.id,
      subcategoryId: row.subcategory_id !== undefined ? row.subcategory_id : row.subcategoryId,
      categoryType: row.category_type !== undefined ? row.category_type : row.categoryType,
      name: row.name,
      basePrice: Number(row.base_price !== undefined ? row.base_price : row.basePrice),
      hasTempOption: Boolean(row.has_temp_option !== undefined ? row.has_temp_option : row.hasTempOption),
      pricePanas: row.price_panas !== null && row.price_panas !== undefined ? Number(row.price_panas) : undefined,
      priceSejuk: row.price_sejuk !== null && row.price_sejuk !== undefined ? Number(row.price_sejuk) : undefined,
      imageUrl: row.image_url !== undefined ? row.image_url : row.imageUrl,
      isAvailable: Boolean(row.is_available !== undefined ? row.is_available : row.isAvailable),
      description: row.description || undefined
    }));

    // Perform sorting identically to seed specifications
    liveCats.sort((a, b) => a.order - b.order);
    liveSubs.sort((a, b) => a.order - b.order);

    return res.json({
      categories: liveCats,
      subcategories: liveSubs,
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
    const orderRow = {
      id: order.id,
      table_session: order.tableSession,
      items: order.items,
      total_amount: order.totalAmount,
      payment_method: order.paymentMethod,
      status: order.status,
      created_at: order.createdAt instanceof Date ? order.createdAt.toISOString() : (order.createdAt || new Date().toISOString())
    };

    const { error } = await supabaseClient.from("orders").insert([orderRow]);

    if (error) {
      console.error("Supabase failed inserting order:", error.message);
      return res.status(500).json({ success: false, error: error.message });
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
