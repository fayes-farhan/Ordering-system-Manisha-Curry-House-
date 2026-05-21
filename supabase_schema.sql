-- -------------------------------------------------------------
-- Supabase Schema for Manisha Curry House QR Ordering Website
-- -------------------------------------------------------------
-- Instructions:
-- 1. Go to your Supabase Dashboard (https://supabase.com).
-- 2. Open your project, click on "SQL Editor" on the left sidebar.
-- 3. Click "+ New query", paste this SQL content, and click "Run".
-- -------------------------------------------------------------

-- Drop existing tables to avoid type conflicts if re-initializing
drop table if exists public.order_items cascade;
drop table if exists public.orders cascade;
drop table if exists public.menu_items cascade;

-- 1. Table: Menu Items
create table public.menu_items (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    category text not null check (category in ('makanan', 'minuman')),
    subcategory text not null,
    base_price decimal(10,2) not null default 0,
    has_temp_option boolean default false,
    price_panas decimal(10,2),
    price_sejuk decimal(10,2),
    image_url text,
    description text,
    is_available boolean default true,
    display_order int default 0,
    created_at timestamp with time zone default now()
);

-- 2. Table: Orders
create table public.orders (
    id uuid default gen_random_uuid() primary key,
    session_id text not null,
    total_amount decimal(10,2) not null,
    payment_method text check (payment_method in ('cash', 'qr')),
    status text default 'confirmed',
    order_reference text unique not null,
    created_at timestamp with time zone default now()
);

-- 3. Table: Order Items (Linking Orders to Menu Items)
create table public.order_items (
    id uuid default gen_random_uuid() primary key,
    order_id uuid references public.orders(id) on delete cascade,
    menu_item_id uuid references public.menu_items(id) on delete set null,
    item_name text not null,
    quantity int not null default 1,
    selected_temp text check (selected_temp in ('panas', 'sejuk')),
    unit_price decimal(10,2) not null,
    subtotal decimal(10,2) not null,
    created_at timestamp with time zone default now()
);

-- -------------------------------------------------------------
-- Enable Row Level Security (RLS)
-- -------------------------------------------------------------
alter table public.menu_items enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- -------------------------------------------------------------
-- Create RLS Policies for Public accesses
-- -------------------------------------------------------------

-- Menu Items policies
create policy "Allow public read check menu_items" on public.menu_items
    for select using (true);

-- Orders policies
create policy "Allow anonymous insert orders" on public.orders
    for insert with check (true);

create policy "Allow anonymous read check orders" on public.orders
    for select using (true);

-- Order Items policies
create policy "Allow anonymous insert order_items" on public.order_items
    for insert with check (true);

create policy "Allow anonymous read check order_items" on public.order_items
    for select using (true);
