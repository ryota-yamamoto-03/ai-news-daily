import type { RawArticle, ScoredArticle } from "@/lib/types";

/** 要件の優先順位に基づくキーワード重み付け（上位ほど高スコア） */
const PRIORITY_KEYWORDS: Array<{ pattern: RegExp; weight: number }> = [
  { pattern: /\bopenai\b|chatgpt|\bgpt-?\d/i, weight: 100 },
  { pattern: /google (ai|deepmind)|deepmind|\bgemini\b/i, weight: 90 },
  { pattern: /anthropic|\bclaude\b/i, weight: 85 },
  { pattern: /microsoft (ai|copilot)|copilot|azure (ai|openai)/i, weight: 75 },
  { pattern: /meta ai|\bllama\b/i, weight: 70 },
  { pattern: /nvidia/i, weight: 65 },
  { pattern: /\bxai\b|\bgrok\b/i, weight: 60 },
  { pattern: /perplexity/i, weight: 55 },
  { pattern: /hugging ?face/i, weight: 50 },
  {
    pattern: /artificial intelligence|machine learning|\bllm\b|generative ai|\bai\b/i,
    weight: 30,
  },
];

/** 速報性・重大性を示す語へのボーナス */
const IMPACT_KEYWORDS: Array<{ pattern: RegExp; weight: number }> = [
  { pattern: /launch|release|unveil|announce|introduc/i, weight: 20 },
  { pattern: /breakthrough|first|record|milestone/i, weight: 15 },
  { pattern: /billion|acquisition|acquire|funding|raise/i, weight: 15 },
  { pattern: /regulat|lawsuit|ban|policy|law\b/i, weight: 10 },
  { pattern: /open[- ]?source/i, weight: 8 },
];

/** AI関連性の判定に使う語（1つも含まなければ除外） */
const AI_RELEVANCE =
  /\bai\b|artificial intelligence|machine learning|\bllm\b|neural|openai|anthropic|deepmind|chatgpt|gemini|claude|copilot|nvidia|hugging ?face|perplexity|\bgrok\b|\bllama\b|generative/i;

function textOf(article: RawArticle): string {
  return `${article.title} ${article.description}`;
}

/** AI関連記事のみを抽出する */
export function filterAiArticles(articles: RawArticle[]): RawArticle[] {
  return articles.filter((a) => AI_RELEVANCE.test(textOf(a)));
}

/** 重要度スコアを計算する（キーワード優先度 + 影響度 + 新しさ） */
export function scoreArticle(article: RawArticle, now: Date = new Date()): number {
  const text = textOf(article);
  let score = 0;

  // 優先キーワードは最も重みの大きい1件のみ採用（二重加点を防ぐ）
  const priority = PRIORITY_KEYWORDS.find(({ pattern }) => pattern.test(text));
  score += priority?.weight ?? 0;

  for (const { pattern, weight } of IMPACT_KEYWORDS) {
    if (pattern.test(text)) score += weight;
  }

  // 新しい記事ほど加点（24時間で最大20点が0点まで線形減衰）
  const ageHours =
    (now.getTime() - new Date(article.publishedAt).getTime()) / 3_600_000;
  score += Math.max(0, 20 - (ageHours / 24) * 20);

  // 画像付き記事はカード表示品質が高いため微加点
  if (article.image) score += 5;

  return Math.round(score * 10) / 10;
}

/**
 * 重要度順に並べ、重複（同一URL・類似タイトル・同一ソース過多）を除いて上位N件を返す
 */
export function selectTopArticles(
  articles: RawArticle[],
  count: number,
): ScoredArticle[] {
  const now = new Date();
  const scored = filterAiArticles(articles)
    .map((a) => ({ ...a, score: scoreArticle(a, now) }))
    .sort((a, b) => b.score - a.score);

  const selected: ScoredArticle[] = [];
  const seenUrls = new Set<string>();
  const seenTitleKeys = new Set<string>();
  const sourceCount = new Map<string, number>();

  for (const article of scored) {
    if (selected.length >= count) break;

    if (seenUrls.has(article.url)) continue;

    // タイトル先頭40文字で類似記事（転載など）を弾く
    const titleKey = article.title.toLowerCase().replace(/\s+/g, " ").slice(0, 40);
    if (seenTitleKeys.has(titleKey)) continue;

    // 同一メディアに偏らないよう1ソース最大2件まで
    const perSource = sourceCount.get(article.source) ?? 0;
    if (perSource >= 2) continue;

    selected.push(article);
    seenUrls.add(article.url);
    seenTitleKeys.add(titleKey);
    sourceCount.set(article.source, perSource + 1);
  }

  return selected;
}
