import { getSupabaseAdminClient } from "@/lib/supabase";
import { fetchAiNews } from "./fetch";
import { selectTopArticles } from "./score";
import { summarizeArticles } from "./summarize";

export interface PipelineResult {
  saved: number;
  articles: Array<{ title: string; source: string; score: number }>;
}

const DAILY_ARTICLE_COUNT = 5;

/**
 * 毎朝7:00 JSTの更新処理本体。
 * ニュース取得 → AI関連抽出 → 重要度判定 → 上位5件選択 → 日本語要約 → Supabase保存
 */
export async function runNewsPipeline(): Promise<PipelineResult> {
  const supabase = getSupabaseAdminClient();
  if (!supabase) {
    throw new Error(
      "Supabaseの環境変数（NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY）を設定してください",
    );
  }

  const rawArticles = await fetchAiNews();
  const topArticles = selectTopArticles(rawArticles, DAILY_ARTICLE_COUNT);

  if (topArticles.length === 0) {
    throw new Error("AI関連記事が1件も見つかりませんでした");
  }

  const summarized = await summarizeArticles(topArticles);

  const rows = summarized.map((a) => ({
    title: a.titleJa,
    summary: a.summaryJa,
    image: a.image,
    source: a.source,
    published_at: a.publishedAt,
    url: a.url,
  }));

  // 同一URLの再保存は上書き扱いにして重複行を防ぐ
  const { error } = await supabase
    .from("news")
    .upsert(rows, { onConflict: "url" });

  if (error) {
    throw new Error(`Supabaseへの保存に失敗しました: ${error.message}`);
  }

  return {
    saved: rows.length,
    articles: summarized.map((a) => ({
      title: a.titleJa,
      source: a.source,
      score: a.score,
    })),
  };
}
