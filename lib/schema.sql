create extension if not exists "uuid-ossp";

create table public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  full_name   text,
  phone       text,
  avatar_url  text,
  country     text default 'GH',
  city        text,
  role        text default 'buyer',
  created_at  timestamptz default now()
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url',
    coalesce(new.raw_user_meta_data->>'role', 'buyer')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create table public.markets (
  id          uuid default uuid_generate_v4() primary key,
  name        text not null,
  description text,
  city        text not null,
  country     text not null,
  lat         numeric(9,6),
  lng         numeric(9,6),
  image_url   text,
  category    text,
  is_active   boolean default true,
  created_at  timestamptz default now()
);

create table public.vendors (
  id            uuid default uuid_generate_v4() primary key,
  profile_id    uuid references public.profiles(id) on delete cascade,
  market_id     uuid references public.markets(id) on delete set null,
  business_name text not null,
  description   text,
  phone         text,
  avatar_url    text,
  banner_url    text,
  rating        numeric(2,1) default 0.0,
  review_count  integer default 0,
  total_sales   integer default 0,
  country       text not null,
  city          text,
  is_verified   boolean default false,
  is_active     boolean default true,
  created_at    timestamptz default now()
);

create table public.products (
  id          uuid default uuid_generate_v4() primary key,
  vendor_id   uuid references public.vendors(id) on delete cascade,
  name        text not null,
  description text,
  price       numeric(10,2) not null,
  currency    text not null,
  image_url   text,
  image_url_2 text,
  image_url_3 text,
  stock_qty   integer default 0,
  category    text,
  is_active   boolean default true,
  created_at  timestamptz default now()
);

create table public.orders (
  id               uuid default uuid_generate_v4() primary key,
  ref              text unique,
  customer_id      uuid references public.profiles(id),
  vendor_id        uuid references public.vendors(id),
  product_id       uuid references public.products(id),
  quantity         integer default 1,
  unit_price       numeric(10,2) not null,
  delivery_fee     numeric(10,2) default 0,
  total_amount     numeric(10,2) not null,
  currency         text not null,
  status           text default 'pending',
  payment_method   text,
  payment_ref      text,
  payment_status   text default 'unpaid',
  delivery_zone    text,
  delivery_address text,
  delivery_eta     text,
  notes            text,
  created_at       timestamptz default now(),
  updated_at       timestamptz default now()
);

create table public.reviews (
  id          uuid default uuid_generate_v4() primary key,
  order_id    uuid references public.orders(id),
  customer_id uuid references public.profiles(id),
  vendor_id   uuid references public.vendors(id),
  rating      integer check (rating between 1 and 5),
  comment     text,
  created_at  timestamptz default now()
);

create or replace function public.update_vendor_rating()
returns trigger as $$
begin
  update public.vendors set
    rating = (select round(avg(rating)::numeric,1) from public.reviews where vendor_id = new.vendor_id),
    review_count = (select count(*) from public.reviews where vendor_id = new.vendor_id)
  where id = new.vendor_id;
  return new;
end;
$$ language plpgsql security definer;

create trigger on_review_created
  after insert on public.reviews
  for each row execute procedure public.update_vendor_rating();

create table public.auctions (
  id           uuid default uuid_generate_v4() primary key,
  title        text not null,
  description  text,
  host_name    text,
  scheduled_at timestamptz not null,
  ends_at      timestamptz,
  status       text default 'upcoming',
  stream_url   text,
  created_at   timestamptz default now()
);

create table public.auction_items (
  id             uuid default uuid_generate_v4() primary key,
  auction_id     uuid references public.auctions(id) on delete cascade,
  vendor_id      uuid references public.vendors(id),
  product_name   text not null,
  description    text,
  image_url      text,
  starting_price numeric(10,2) not null,
  current_bid    numeric(10,2),
  currency       text not null,
  winner_id      uuid references public.profiles(id),
  status         text default 'pending',
  created_at     timestamptz default now()
);

create table public.auction_bids (
  id         uuid default uuid_generate_v4() primary key,
  item_id    uuid references public.auction_items(id) on delete cascade,
  bidder_id  uuid references public.profiles(id),
  amount     numeric(10,2) not null,
  created_at timestamptz default now()
);

create table public.seller_applications (
  id              uuid default uuid_generate_v4() primary key,
  ref             text unique,
  first_name      text,
  last_name       text,
  email           text,
  phone           text,
  country         text,
  city            text,
  business_name   text,
  market          text,
  categories      text,
  description     text,
  products        text,
  delivery        text,
  delivery_areas  text,
  payment_methods text,
  account_number  text,
  status          text default 'pending',
  created_at      timestamptz default now()
);

alter table public.profiles            enable row level security;
alter table public.markets             enable row level security;
alter table public.vendors             enable row level security;
alter table public.products            enable row level security;
alter table public.orders              enable row level security;
alter table public.reviews             enable row level security;
alter table public.auctions            enable row level security;
alter table public.auction_items       enable row level security;
alter table public.auction_bids        enable row level security;
alter table public.seller_applications enable row level security;

create policy "Profiles public read"    on public.profiles for select using (true);
create policy "Profiles own update"     on public.profiles for update using (auth.uid() = id);
create policy "Markets public read"     on public.markets  for select using (true);
create policy "Vendors public read"     on public.vendors  for select using (is_active = true);
create policy "Vendors own update"      on public.vendors  for update using (auth.uid() = profile_id);
create policy "Products public read"    on public.products for select using (is_active = true);
create policy "Products vendor manage"  on public.products for all using (
  vendor_id in (select id from public.vendors where profile_id = auth.uid())
);
create policy "Orders buyer read"       on public.orders for select using (auth.uid() = customer_id);
create policy "Orders vendor read"      on public.orders for select using (
  vendor_id in (select id from public.vendors where profile_id = auth.uid())
);
create policy "Orders buyer insert"     on public.orders for insert with check (auth.uid() = customer_id);
create policy "Orders vendor update"    on public.orders for update using (
  vendor_id in (select id from public.vendors where profile_id = auth.uid())
);
create policy "Reviews public read"     on public.reviews for select using (true);
create policy "Reviews buyer insert"    on public.reviews for insert with check (auth.uid() = customer_id);
create policy "Auctions public read"    on public.auctions     for select using (true);
create policy "Items public read"       on public.auction_items for select using (true);
create policy "Bids auth insert"        on public.auction_bids  for insert with check (auth.uid() = bidder_id);
create policy "Bids auth read"          on public.auction_bids  for select using (auth.uid() = bidder_id);
create policy "Anyone can apply"        on public.seller_applications for insert with check (true);
create policy "Admin view apps"         on public.seller_applications for select using (auth.role() = 'authenticated');

insert into public.markets (name, description, city, country, lat, lng, category) values
  ('Makola Market',    'Accra largest open-air market',          'Accra',  'GH', 5.5502, -0.2174, 'General'),
  ('Kumasi Central',   'Heart of Ashanti commerce and crafts',   'Kumasi', 'GH', 6.6885, -1.6244, 'Crafts'),
  ('Kejetia Market',   'One of the largest markets in West Africa', 'Kumasi', 'GH', 6.6950, -1.6200, 'General'),
  ('Computer Village', 'West Africa largest electronics hub',    'Lagos',  'NG', 6.6018,  3.3515, 'Electronics'),
  ('Balogun Market',   'Lagos iconic textile and goods market',  'Lagos',  'NG', 6.4544,  3.3948, 'General'),
  ('Wuse Market',      'Abuja premier market',                   'Abuja',  'NG', 9.0630,  7.4898, 'Food');

insert into public.auctions (title, description, host_name, scheduled_at, ends_at, status) values
  ('Weekend Market Live — Vol. 1', 'Our first weekend auction! Bid on fresh produce, kente cloth, electronics and more.', 'Yadamarket Host', now() + interval '5 days', now() + interval '5 days' + interval '3 hours', 'upcoming');
