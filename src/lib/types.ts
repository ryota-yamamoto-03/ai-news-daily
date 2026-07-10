/** Supabase `news` テーブルの1行に対応するニュース記事 */
export interface NewsArticle {
  id: string;
  /** AIで日本語化されたタイトル */
  title: string;
  /** AIによる日本語要約（150〜200文字程度） */
  summary: string;
  /** 記事のサムネイル画像URL（無い場合はnull） */
  image: string | null;
  /** 発行元メディア名 */
  source: string;
  /** 記事の公開日時（ISO 8601） */
  published_at: string;
  /** 元記事URL */
  url: string;
  /** DBへの保存日時（ISO 8601） */
  created_at: string;
}

/** ニュースAPIから取得した生の記事（要約前） */
export interface RawArticle {
  title: string;
  description: string;
  content: string;
  url: string;
  image: string | null;
  source: string;
  publishedAt: string;
}

/** 重要度スコア付きの記事 */
export interface ScoredArticle extends RawArticle {
  score: number;
}

/** サイト表示用のニュースデータ一式 */
export interface NewsPayload {
  articles: NewsArticle[];
  /** 当日分が取得できず前日以前のニュースを表示している場合 true */
  isStale: boolean;
  /** 最終更新日時（ISO 8601、記事が無い場合はnull） */
  lastUpdated: string | null;
}
