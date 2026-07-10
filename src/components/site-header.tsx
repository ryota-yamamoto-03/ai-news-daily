"use client";

import { motion } from "framer-motion";
import { Radio } from "lucide-react";
import { LiveClock } from "@/components/live-clock";

/** 左上のLIVEインジケーター（赤丸が1秒周期で点滅） */
function LiveIndicator() {
  return (
    <div
      className="glass flex items-center gap-2 rounded-md px-3 py-1.5"
      role="status"
      aria-label="ライブ配信中"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="absolute inline-flex h-full w-full animate-live-pulse rounded-full bg-breaking-bright" />
      </span>
      <span className="font-display text-xs font-black tracking-[0.25em] text-white">
        LIVE
      </span>
    </div>
  );
}

/** 画面上部のヘッダー: LIVE / ロゴ / 現在日時 */
export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
      className="sticky top-0 z-40 border-b border-white/10 bg-navy-950/70 backdrop-blur-lg"
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <LiveIndicator />

        <h1 className="flex items-center gap-3 text-center">
          <Radio aria-hidden className="hidden h-5 w-5 text-breaking-bright sm:block" />
          <span className="font-display text-lg font-black tracking-[0.18em] text-white sm:text-2xl">
            AI{" "}
            <span className="text-breaking-bright text-glow-red">BREAKING</span>{" "}
            NEWS
          </span>
        </h1>

        <LiveClock />
      </div>
    </motion.header>
  );
}
