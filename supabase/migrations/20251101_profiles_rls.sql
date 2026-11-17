-- profiles RLS lockdown — run in Supabase SQL Editor to replace open policies.
-- Clients may only UPDATE mother_name / child_birth_date on their own row.
-- INSERT is blocked: rows are created by on_auth_user_created trigger only.

alter table public.profiles enable row level security;

-- Drop known open / legacy policies
drop policy if exists "Profiles are viewable by everyone" on public.profiles;
drop policy if exists "Profiles are publicly readable" on public.profiles;
drop policy if exists "Enable read access for all users" on public.profiles;
drop policy if exists "Enable update for all users" on public.profiles;
drop policy if exists "Public profiles are viewable by everyone." on public.profiles;
drop policy if exists "Users can update own profile." on public.profiles;
drop policy if exists "profiles_select_own" on public.profiles;
drop policy if exists "profiles_update_own" on public.profiles;
drop policy if exists "profiles_select_authenticated" on public.profiles;
drop policy if exists "profiles_update_authenticated" on public.profiles;
drop policy if exists "profiles_insert_own" on public.profiles;

-- Column-level writes: no client INSERT; UPDATE only safe profile fields
revoke insert, update on public.profiles from authenticated;
grant select on public.profiles to authenticated;
grant update (mother_name, child_birth_date) on public.profiles to authenticated;

create policy "profiles_select_own"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- No profiles_insert_own: trigger creates the row.
