import OpenAI from "openai";
import type { ScoredArticle } from "@/lib/types";

export interface SummarizedArticle {
  titleJa: string;
  summaryJa: string;
}

const SYSTEM_PROMPT = `あなたは海外ニュース専門チャンネルの日本語編集者です。
英語のAIニュース記事を、日本の視聴者向けに翻訳・要約してください。

ルール:
- タイトルは自然な日本語のニュース見出しにする（30文字前後、体言止め推奨）
- 要約は150〜200文字の日本語。事実のみを簡潔に、ニュース原稿のような文体で
- 推測や誇張は入れない
- 必ず次のJSON形式のみで回答する: {"title": "...", "summary": "..."}`;

function getClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY を設定してください");
  }
  return new OpenAI({ apiKey });
}

/** 1記事をOpenAI APIで日本語タイトル・要約に変換する */
export async function summarizeArticle(
  article: ScoredArticle,
): Promise<SummarizedArticle> {
  const client = getClient();

  const userContent = [
    `Title: ${article.title}`,
    `Source: ${article.source}`,
    `Description: ${article.description}`,
    article.content ? `Content: ${article.content.slice(0, 1500)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.3,
    max_tokens: 500,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userContent },
    ],
  });

  const raw = completion.choices[0]?.message?.content;
  if (!raw) {
    throw new Error("OpenAI APIから空のレスポンスが返されました");
  }

  const parsed = JSON.parse(raw) as { title?: string; summary?: string };
  if (!parsed.title || !parsed.summary) {
    throw new Error("要約レスポンスの形式が不正です");
  }

  return { titleJa: parsed.title, summaryJa: parsed.summary };
}

/**
 * 複数記事を順番に要約する。
 * 1件失敗しても全体は止めず、原文タイトル・説明文でフォールバックする。
 */
export async function summarizeArticles(
  articles: ScoredArticle[],
): Promise<Array<ScoredArticle & SummarizedArticle>> {
  const results: Array<ScoredArticle & SummarizedArticle> = [];

  for (const article of articles) {
    try {
      const summary = await summarizeArticle(article);
      results.push({ ...article, ...summary });
    } catch (error) {
      console.error(`要約に失敗（原文で継続）: ${article.url}`, error);
      results.push({
        ...article,
        titleJa: article.title,
        summaryJa: article.description || article.title,
      });
    }
  }

  return results;
}
