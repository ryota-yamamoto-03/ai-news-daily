import { getSupabaseReadClient } from "@/lib/supabase";
import { SAMPLE_NEWS } from "@/lib/sample-news";
import type { NewsArticle, NewsPayload } from "@/lib/types";
import { startOfTodayJST } from "@/lib/utils";

const DAILY_ARTICLE_COUNT = 5;

/**
 * 表示用ニュースを取得する。
 *
 * フェイルセーフ設計:
 * 1. 当日（JST）保存分があればそれを表示
 * 2. 当日分が無ければ、直近に保存された5件（前日以前）を表示（isStale = true）
 * 3. Supabase未設定・接続失敗時はサンプルデータで表示を継続
 */
export async function getTodaysNews(): Promise<NewsPayload> {
  const supabase = getSupabaseReadClient();

  if (!supabase) {
    return {
      articles: SAMPLE_NEWS,
      isStale: false,
      lastUpdated: SAMPLE_NEWS[0]?.created_at ?? null,
    };
  }

  try {
    const todayStart = startOfTodayJST().toISOString();

    // 1) 当日保存分
    const { data: todayRows, error: todayError } = await supabase
      .from("news")
      .select("*")
      .gte("created_at", todayStart)
      .order("created_at", { ascending: false })
      .limit(DAILY_ARTICLE_COUNT);

    if (todayError) throw todayError;

    if (todayRows && todayRows.length > 0) {
      const articles = todayRows as NewsArticle[];
      return {
        articles,
        isStale: false,
        lastUpdated: articles[0]?.created_at ?? null,
      };
    }

    // 2) フェイルセーフ: 前日以前の直近5件
    const { data: latestRows, error: latestError } = await supabase
      .from("news")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(DAILY_ARTICLE_COUNT);

    if (latestError) throw latestError;

    if (latestRows && latestRows.length > 0) {
      const articles = latestRows as NewsArticle[];
      return {
        articles,
        isStale: true,
        lastUpdated: articles[0]?.created_at ?? null,
      };
    }
  } catch (error) {
    console.error("Supabaseからのニュース取得に失敗しました:", error);
  }

  // 3) 最終フォールバック
  return {
    articles: SAMPLE_NEWS,
    isStale: false,
    lastUpdated: SAMPLE_NEWS[0]?.created_at ?? null,
  };
}
