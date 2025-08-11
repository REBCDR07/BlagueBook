-- Enums
create type if not exists public.app_role as enum ('admin','fan');
create type if not exists public.reaction_type as enum ('like','rire');

-- Updated at helper
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Profiles
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy if not exists "Profiles are viewable by everyone"
on public.profiles for select
using (true);

create policy if not exists "Users can insert their own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy if not exists "Users can update their own profile"
on public.profiles for update
using (auth.uid() = id);

drop trigger if exists update_profiles_updated_at on public.profiles;
create trigger update_profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- User roles
create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  created_at timestamptz not null default now(),
  unique(user_id, role)
);

alter table public.user_roles enable row level security;

create policy if not exists "Users can view their own roles"
on public.user_roles for select to authenticated
using (auth.uid() = user_id);

create policy if not exists "Users can insert their own role"
on public.user_roles for insert to authenticated
with check (auth.uid() = user_id);

-- Role helper
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
as $$
  select exists (
    select 1 from public.user_roles
    where user_id = _user_id and role = _role
  );
$$;

-- Auto create profile and role on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  -- Create profile with username from metadata or fallback
  insert into public.profiles (id, username, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'username', 'user_' || substring(new.id::text, 1, 8)),
    null
  )
  on conflict (id) do nothing;

  -- Set role from metadata, default to 'fan'
  insert into public.user_roles (user_id, role)
  values (
    new.id,
    coalesce((new.raw_user_meta_data ->> 'role')::public.app_role, 'fan'::public.app_role)
  )
  on conflict (user_id, role) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Jokes
create table if not exists public.jokes (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint content_length check (char_length(content) <= 10000)
);

alter table public.jokes enable row level security;

drop trigger if exists update_jokes_updated_at on public.jokes;
create trigger update_jokes_updated_at
before update on public.jokes
for each row execute function public.update_updated_at_column();

create policy if not exists "Anyone can view jokes"
on public.jokes for select
using (true);

create policy if not exists "Admins can create jokes"
on public.jokes for insert to authenticated
with check (public.has_role(auth.uid(), 'admin') and auth.uid() = author_id);

create policy if not exists "Authors can update their jokes"
on public.jokes for update to authenticated
using (auth.uid() = author_id);

create policy if not exists "Authors can delete their jokes"
on public.jokes for delete to authenticated
using (auth.uid() = author_id);

-- Comments
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.jokes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);

alter table public.comments enable row level security;

create policy if not exists "Anyone can view comments"
on public.comments for select
using (true);

create policy if not exists "Authenticated users can comment"
on public.comments for insert to authenticated
with check (auth.uid() = user_id);

create policy if not exists "Authors can delete their comments"
on public.comments for delete to authenticated
using (auth.uid() = user_id);

-- Reactions
create table if not exists public.reactions (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.jokes(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  type public.reaction_type not null,
  created_at timestamptz not null default now(),
  unique(post_id, user_id, type)
);

alter table public.reactions enable row level security;

create policy if not exists "Anyone can view reactions"
on public.reactions for select
using (true);

create policy if not exists "Users can react"
on public.reactions for insert to authenticated
with check (auth.uid() = user_id);

create policy if not exists "Users can remove their reaction"
on public.reactions for delete to authenticated
using (auth.uid() = user_id);

-- Storage bucket for avatars
insert into storage.buckets (id, name, public)
values ('avatars','avatars', true)
on conflict (id) do nothing;

create policy if not exists "Avatar images are publicly accessible"
on storage.objects
for select
using (bucket_id = 'avatars');

create policy if not exists "Users can upload their own avatar"
on storage.objects
for insert to authenticated
with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy if not exists "Users can update their own avatar"
on storage.objects
for update to authenticated
using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

create policy if not exists "Users can delete their own avatar"
on storage.objects
for delete to authenticated
using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);