"use client";

import { motion } from "framer-motion";
import { NewsCard } from "@/components/news-card";
import type { NewsArticle } from "@/lib/types";

interface NewsGridProps {
  articles: NewsArticle[];
}

/** ニュースカードのグリッド（PC: 2列 / モバイル: 1列） */
export function NewsGrid({ articles }: NewsGridProps) {
  if (articles.length === 0) {
    return (
      <div className="glass mx-auto max-w-lg rounded-xl p-10 text-center">
        <p className="text-lg font-bold text-white">
          現在配信中のニュースはありません
        </p>
        <p className="mt-2 text-sm text-white/60">
          次回更新は毎朝 07:00 JST です。
        </p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 1.8 }}
      className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8"
    >
      {articles.map((article, index) => (
        <NewsCard key={article.id} article={article} index={index} />
      ))}
    </motion.div>
  );
}
