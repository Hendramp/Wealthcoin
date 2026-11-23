alter table public.academy_subscribers
  add column if not exists token uuid not null default gen_random_uuid();

create unique index if not exists academy_subscribers_token_key
  on public.academy_subscribers (token);
