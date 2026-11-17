-- MOCK IAP ONLY: allow the signed-in user to write their own subscription dates.
-- Required for the temporary client-side paywall until real store receipts exist.
-- When real payments land, revoke these columns and set dates from a webhook / Edge Function.

revoke update on public.profiles from authenticated;
grant update (
  mother_name,
  child_birth_date,
  subscription_start_date,
  subscription_end_date
) on public.profiles to authenticated;
