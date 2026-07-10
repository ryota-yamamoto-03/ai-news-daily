import { getTodaysNews } from "@/lib/data";
import { BackgroundFx } from "@/components/background-fx";
import { BreakingTicker } from "@/components/breaking-ticker";
import { IntroOverlay } from "@/components/intro-overlay";
import { NewsGrid } from "@/components/news-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StatsBar } from "@/components/stats-bar";
import type { NewsArticle } from "@/lib/types";

// Cron更新後は revalidatePath で即時反映されるが、保険として5分ごとに再生成する
export const revalidate = 300;

/** JSON-LD（NewsArticleのItemList）を生成する */
function buildJsonLd(articles: NewsArticle[]) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "AI BREAKING NEWS — Today's Headlines",
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "NewsArticle",
        headline: article.title,
        description: article.summary,
        ...(article.image ? { image: [article.image] } : {}),
        datePublished: article.published_at,
        dateCreated: article.created_at,
        url: article.url,
        publisher: {
          "@type": "Organization",
          name: article.source,
        },
        mainEntityOfPage: siteUrl,
      },
    })),
  };
}

export default async function HomePage() {
  const { articles, isStale, lastUpdated } = await getTodaysNews();
  const jsonLd = buildJsonLd(articles);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <IntroOverlay />
      <BackgroundFx />

      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <BreakingTicker headlines={articles.map((a) => a.title)} />

        <main className="relative z-10 mx-auto w-full max-w-[1400px] flex-1 px-4 py-10 sm:px-6 sm:py-14">
          <StatsBar
            storyCount={articles.length}
            lastUpdated={lastUpdated}
            isStale={isStale}
          />
          <h2 className="sr-only">本日の重要AIニュース</h2>
          <NewsGrid articles={articles} />
        </main>

        <SiteFooter />
      </div>
    </>
  );
}
