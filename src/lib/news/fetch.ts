import type { RawArticle } from "@/lib/types";

const AI_QUERY =
  '"artificial intelligence" OR OpenAI OR Anthropic OR "Google AI" OR ChatGPT OR Gemini OR Claude OR NVIDIA OR "machine learning" OR LLM';

interface GNewsResponse {
  articles?: Array<{
    title?: string;
    description?: string;
    content?: string;
    url?: string;
    image?: string;
    publishedAt?: string;
    source?: { name?: string };
  }>;
}

interface NewsApiResponse {
  status?: string;
  articles?: Array<{
    title?: string;
    description?: string;
    content?: string;
    url?: string;
    urlToImage?: string;
    publishedAt?: string;
    source?: { name?: string };
  }>;
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    cache: "no-store",
    signal: AbortSignal.timeout(20_000),
  });
  if (!res.ok) {
    throw new Error(`News API request failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

async function fetchFromGNews(apiKey: string): Promise<RawArticle[]> {
  const params = new URLSearchParams({
    q: AI_QUERY,
    lang: "en",
    max: "50",
    sortby: "publishedAt",
    apikey: apiKey,
  });
  const data = await fetchJson<GNewsResponse>(
    `https://gnews.io/api/v4/search?${params}`,
  );
  return (data.articles ?? [])
    .filter((a) => a.title && a.url)
    .map((a) => ({
      title: a.title ?? "",
      description: a.description ?? "",
      content: a.content ?? "",
      url: a.url ?? "",
      image: a.image ?? null,
      source: a.source?.name ?? "Unknown",
      publishedAt: a.publishedAt ?? new Date().toISOString(),
    }));
}

async function fetchFromNewsApi(apiKey: string): Promise<RawArticle[]> {
  const params = new URLSearchParams({
    q: AI_QUERY,
    language: "en",
    pageSize: "50",
    sortBy: "publishedAt",
    apiKey,
  });
  const data = await fetchJson<NewsApiResponse>(
    `https://newsapi.org/v2/everything?${params}`,
  );
  return (data.articles ?? [])
    .filter((a) => a.title && a.url && a.title !== "[Removed]")
    .map((a) => ({
      title: a.title ?? "",
      description: a.description ?? "",
      content: a.content ?? "",
      url: a.url ?? "",
      image: a.urlToImage ?? null,
      source: a.source?.name ?? "Unknown",
      publishedAt: a.publishedAt ?? new Date().toISOString(),
    }));
}

/**
 * ニュースAPIから直近のAI関連記事を取得する。
 * GNews → NewsAPI の順に試し、両方失敗した場合は例外を投げる。
 */
export async function fetchAiNews(): Promise<RawArticle[]> {
  const gnewsKey = process.env.GNEWS_API_KEY;
  const newsApiKey = process.env.NEWSAPI_API_KEY;

  if (!gnewsKey && !newsApiKey) {
    throw new Error(
      "GNEWS_API_KEY または NEWSAPI_API_KEY のいずれかを設定してください",
    );
  }

  const errors: string[] = [];

  if (gnewsKey) {
    try {
      const articles = await fetchFromGNews(gnewsKey);
      if (articles.length > 0) return articles;
      errors.push("GNews returned 0 articles");
    } catch (error) {
      errors.push(`GNews: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  if (newsApiKey) {
    try {
      const articles = await fetchFromNewsApi(newsApiKey);
      if (articles.length > 0) return articles;
      errors.push("NewsAPI returned 0 articles");
    } catch (error) {
      errors.push(`NewsAPI: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  throw new Error(`すべてのニュースAPIで取得に失敗しました: ${errors.join(" / ")}`);
}
