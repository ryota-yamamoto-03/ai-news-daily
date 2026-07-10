# AI BREAKING NEWS

毎朝 **7:00 JST** に世界中のAIニュースを自動収集し、その日の重要ニュース **5件だけ** をAI日本語要約付きで配信する速報サイト。

海外ニュース専門チャンネル（CNN / Bloomberg / Reuters / BBC）をイメージした、ライブ放送風のダークUIで構成されています。

## 主な機能

- 🔴 **LIVE演出** — 点滅するLIVEインジケーター、JSTリアルタイム時計、Breaking News無限ティッカー
- 📰 **毎日5件の厳選ニュース** — OpenAI / Google AI / Anthropic などの優先度に基づく重要度スコアリング
- 🤖 **AI日本語要約** — OpenAI APIでタイトル日本語化 + 150〜200文字の要約
- ⏰ **毎朝7:00 JST自動更新** — Vercel Cron（22:00 UTC）でパイプラインを実行
- 🛡️ **フェイルセーフ** — API失敗時は前日のニュースを自動表示。DB未接続でもサンプルデータで稼働
- 💀 **Loading Skeleton** / ♿ アクセシビリティ（WCAG AA配慮、`prefers-reduced-motion`対応）
- 🔍 **SEO** — sitemap.xml / robots.txt / OGP / Twitter Card / JSON-LD（NewsArticle）

## 技術スタック

Next.js (App Router) / TypeScript / Tailwind CSS / Framer Motion / shadcn/uiスタイルのUIプリミティブ / Supabase / OpenAI API / GNews・NewsAPI / Vercel + Vercel Cron

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. Supabaseのセットアップ

Supabaseプロジェクトを作成し、SQLエディタで [`supabase/schema.sql`](supabase/schema.sql) を実行してください。

### 3. 環境変数

`.env.example` を `.env.local` にコピーして各キーを設定します。

| 変数 | 説明 |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase読み取り用 |
| `SUPABASE_SERVICE_ROLE_KEY` | Cronジョブの書き込み用 |
| `OPENAI_API_KEY` | 日本語要約用 |
| `GNEWS_API_KEY` または `NEWSAPI_API_KEY` | ニュース取得用（両方あればGNews優先） |
| `CRON_SECRET` | Cronエンドポイント保護用のランダム文字列 |
| `NEXT_PUBLIC_SITE_URL` | 本番URL（OGP・sitemap用） |

> 💡 環境変数が未設定でも、サンプルニュースでUIの確認ができます。

### 4. 開発サーバー

```bash
npm run dev
```

## デプロイ（Vercel）

1. リポジトリをVercelにインポート
2. 上記の環境変数をVercelプロジェクトに設定
3. `vercel.json` の設定により、毎日 22:00 UTC（= 7:00 JST）に `/api/cron/update-news` が自動実行されます

手動で更新パイプラインを実行する場合:

```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://your-domain.vercel.app/api/cron/update-news
```

## 毎朝の処理フロー

```
07:00 JST (22:00 UTC)
  ↓ Vercel Cron → /api/cron/update-news
  ↓ GNews / NewsAPI からAIニュース取得（最大50件）
  ↓ AI関連記事のみ抽出
  ↓ 重要度スコアリング（企業優先度 + 影響度 + 新しさ）
  ↓ 上位5件を選択（重複・同一ソース偏りを除去）
  ↓ OpenAI APIで日本語タイトル + 150〜200文字要約
  ↓ Supabase `news` テーブルへupsert
  ↓ トップページのISRキャッシュを再検証 → サイト更新
```

## ディレクトリ構成

```
src/
├── app/
│   ├── api/cron/update-news/  # Cronエンドポイント
│   ├── layout.tsx             # フォント・メタデータ（OGP/Twitter Card）
│   ├── page.tsx               # トップページ（JSON-LD含む）
│   ├── loading.tsx            # Loading Skeleton
│   ├── error.tsx              # エラーフォールバック
│   ├── sitemap.ts / robots.ts / opengraph-image.tsx
├── components/                # UIコンポーネント
└── lib/
    ├── news/                  # 取得・スコアリング・要約・パイプライン
    ├── data.ts                # 表示用データ取得（フェイルセーフ）
    └── supabase.ts
```
