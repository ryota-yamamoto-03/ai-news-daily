"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Clock, Globe2, Satellite } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { NewsArticle } from "@/lib/types";
import { formatDateTimeJST } from "@/lib/utils";

interface NewsCardProps {
  article: NewsArticle;
  index: number;
}

/** 画像が無い・読み込めない場合の放送局風プレースホルダー */
function ImageFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-950">
      <Satellite aria-hidden className="h-12 w-12 text-signal-blue/40" />
    </div>
  );
}

/**
 * ニュースカード。
 * スクロールで下からフェードイン、ホバーで拡大・発光・ボーダー点灯。
 */
export function NewsCard({ article, index }: NewsCardProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const showImage = article.image && !imageFailed;

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.12, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.015 }}
      className="group relative overflow-hidden rounded-xl border border-white/10 bg-navy-900/70 shadow-lg shadow-black/40 backdrop-blur-md transition-[border-color,box-shadow] duration-300 hover:border-signal-blue/60 hover:shadow-[0_18px_50px_rgba(0,0,0,0.6),0_0_32px_rgba(46,124,246,0.25)]"
    >
      {/* ホバー時にカード上部を走る光のライン */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-signal-cyan/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* 画像エリア */}
      <div className="relative aspect-[16/9] overflow-hidden">
        {showImage ? (
          <Image
            src={article.image as string}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <ImageFallback />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/20 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <Badge variant="breaking">Breaking</Badge>
          <Badge variant="blue">AI</Badge>
        </div>
        <span
          aria-hidden
          className="absolute bottom-3 right-3 font-display text-4xl font-black text-white/15"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* テキストエリア */}
      <div className="flex flex-col gap-3 p-5 sm:p-6">
        <h3 className="font-display text-lg font-bold leading-snug text-white sm:text-xl">
          {article.title}
        </h3>

        <p className="line-clamp-4 text-sm leading-relaxed text-white/70">
          {article.summary}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/50">
          <span className="inline-flex items-center gap-1.5">
            <Globe2 aria-hidden className="h-3.5 w-3.5 text-signal-cyan" />
            {article.source}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock aria-hidden className="h-3.5 w-3.5" />
            <time dateTime={article.published_at}>
              {formatDateTimeJST(article.published_at)}
            </time>
          </span>
        </div>

        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-md border border-signal-blue/40 bg-signal-blue/10 px-4 py-2 text-sm font-bold text-signal-cyan transition-colors hover:bg-signal-blue/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-cyan"
        >
          続きを読む
          <ArrowUpRight aria-hidden className="h-4 w-4" />
          <span className="sr-only">（{article.source}の元記事を新しいタブで開く）</span>
        </a>
      </div>
    </motion.article>
  );
}
