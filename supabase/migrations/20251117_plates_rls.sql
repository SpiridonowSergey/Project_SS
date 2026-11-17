-- RLS for plate catalog + per-user customizations.
-- Run in Supabase SQL Editor before release.

alter table public.plate_templates enable row level security;
alter table public.user_plates enable row level security;

-- plate_templates: read-only catalog for signed-in users (no client writes)
drop policy if exists "plate_templates_select" on public.plate_templates;
drop policy if exists "plate_templates_select_authenticated" on public.plate_templates;
drop policy if exists "Enable read access for all users" on public.plate_templates;
drop policy if exists "Enable insert for all users" on public.plate_templates;
drop policy if exists "Enable update for all users" on public.plate_templates;
drop policy if exists "Enable delete for all users" on public.plate_templates;

create policy "plate_templates_select"
  on public.plate_templates
  for select
  to authenticated
  using (true);

revoke insert, update, delete on public.plate_templates from authenticated;
grant select on public.plate_templates to authenticated;

-- user_plates: each user only reads/writes their own rows
drop policy if exists "user_plates_select_own" on public.user_plates;
drop policy if exists "user_plates_insert_own" on public.user_plates;
drop policy if exists "user_plates_update_own" on public.user_plates;
drop policy if exists "user_plates_delete_own" on public.user_plates;
drop policy if exists "Enable read access for all users" on public.user_plates;
drop policy if exists "Enable insert for all users" on public.user_plates;
drop policy if exists "Enable update for all users" on public.user_plates;
drop policy if exists "Enable delete for all users" on public.user_plates;

create policy "user_plates_select_own"
  on public.user_plates
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "user_plates_insert_own"
  on public.user_plates
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "user_plates_update_own"
  on public.user_plates
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "user_plates_delete_own"
  on public.user_plates
  for delete
  to authenticated
  using (auth.uid() = user_id);

grant select, insert, update, delete on public.user_plates to authenticated;

-- Recommended uniqueness for upsert(onConflict: 'user_id,template_id')
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'user_plates_user_id_template_id_key'
  ) then
    alter table public.user_plates
      add constraint user_plates_user_id_template_id_key unique (user_id, template_id);
  end if;
end $$;
