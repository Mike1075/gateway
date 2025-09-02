-- Profiles: minimal profile linked to auth.users.id
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  avatar_url text,
  library_unlocked boolean default false,
  created_at timestamp with time zone default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner" on public.profiles
  for select using (auth.uid() = id);

create policy "Profiles are updatable by owner" on public.profiles
  for update using (auth.uid() = id);

create policy "Profiles insert by self" on public.profiles
  for insert with check (auth.uid() = id);

-- Journals: personal logs
create table if not exists public.journals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  title text,
  content text,
  intention text,
  privacy text check (privacy in ('private','mentor','group')) default 'private',
  track_id text,
  created_at timestamp with time zone default now()
);

alter table public.journals enable row level security;

create policy "Journals are viewable by owner" on public.journals
  for select using (auth.uid() = user_id);

create policy "Journals are insertable by owner" on public.journals
  for insert with check (auth.uid() = user_id);

create policy "Journals are updatable by owner" on public.journals
  for update using (auth.uid() = user_id);

-- Progress: track completion (optional)
create table if not exists public.progress (
  user_id uuid references auth.users(id) on delete cascade not null,
  track_id text not null,
  completed_at timestamp with time zone default now(),
  primary key (user_id, track_id)
);

alter table public.progress enable row level security;

create policy "Progress owned" on public.progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

