-- AI Breaking News: ニュース保存テーブル
create table if not exists public.news (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  image text,
  source text not null,
  published_at timestamptz not null,
  url text not null unique,
  created_at timestamptz not null default now()
);

-- 表示クエリ（created_at降順）用のインデックス
create index if not exists news_created_at_idx on public.news (created_at desc);

-- RLS: 匿名キーでは読み取りのみ許可（書き込みはservice roleキーのCronジョブのみ）
alter table public.news enable row level security;

create policy "Public read access"
  on public.news
  for select
  to anon
  using (true);
