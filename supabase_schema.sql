-- -------------------------------------------------------------
-- Supabase Schema for Manisha Curry House QR Ordering Website
-- -------------------------------------------------------------
-- Instructions:
-- 1. Go to your Supabase Dashboard (https://supabase.com).
-- 2. Open your project, click on "SQL Editor" on the left sidebar.
-- 3. Click "+ New query", paste this SQL content, and click "Run".
-- -------------------------------------------------------------

-- 1. Create Menu Categories Table
create table if not exists public.menu_categories (
    id text primary key,
    name text not null,
    type text not null,
    icon text,
    "order" integer not null
);

-- 2. Create Menu Subcategories Table
create table if not exists public.menu_subcategories (
    id text primary key,
    category_id text references public.menu_categories(id) on delete cascade,
    name text not null,
    icon text,
    "order" integer not null
);

-- 3. Create Menu Items Table
create table if not exists public.menu_items (
    id text primary key,
    subcategory_id text references public.menu_subcategories(id) on delete cascade,
    category_type text not null,
    name text not null,
    base_price numeric not null,
    has_temp_option boolean not null default false,
    price_panas numeric,
    price_sejuk numeric,
    image_url text,
    is_available boolean not null default true,
    description text
);

-- 4. Create Orders Table
create table if not exists public.orders (
    id text primary key,
    table_session text not null,
    items jsonb not null,
    total_amount numeric not null,
    payment_method text not null,
    status text not null,
    created_at timestamptz not null default now()
);

-- -------------------------------------------------------------
-- Enable Row Level Security (RLS)
-- -------------------------------------------------------------
alter table public.menu_categories enable row level security;
alter table public.menu_subcategories enable row level security;
alter table public.menu_items enable row level security;
alter table public.orders enable row level security;

-- -------------------------------------------------------------
-- Create RLS Policies for Anon/Public accesses
-- -------------------------------------------------------------

-- Drop existing policies if any to prevent collision
drop policy if exists "Allow reading all categories" on public.menu_categories;
drop policy if exists "Allow reading all subcategories" on public.menu_subcategories;
drop policy if exists "Allow reading all items" on public.menu_items;
drop policy if exists "Allow anonymous insert orders" on public.orders;
drop policy if exists "Allow anonymous read check orders" on public.orders;

-- Categories: Anyone (anonymous & authenticated) can read
create policy "Allow reading all categories" on public.menu_categories
    for select using (true);

-- Subcategories: Anyone (anonymous & authenticated) can read
create policy "Allow reading all subcategories" on public.menu_subcategories
    for select using (true);

-- Menu Items: Anyone (anonymous & authenticated) can read
create policy "Allow reading all items" on public.menu_items
    for select using (true);

-- Orders: Anyone (anonymous & authenticated) can submit orders
create policy "Allow anonymous insert orders" on public.orders
    for insert with check (true);

-- Orders: Anyone can view orders (helpful for standard verification/receipt views)
create policy "Allow anonymous read check orders" on public.orders
    for select using (true);
