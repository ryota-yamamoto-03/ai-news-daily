"use client";

import { motion } from "framer-motion";
import { Newspaper, RefreshCw, TriangleAlert } from "lucide-react";
import { formatDateTimeJST } from "@/lib/utils";

interface StatsBarProps {
  storyCount: number;
  lastUpdated: string | null;
  isStale: boolean;
}

/** 見出し件数・最終更新時刻を表示するステータスバー */
export function StatsBar({ storyCount, lastUpdated, isStale }: StatsBarProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
      aria-label="配信ステータス"
      className="mb-8 flex flex-wrap items-center justify-between gap-4"
    >
      <div className="flex items-center gap-3">
        <div className="glass flex h-11 w-11 items-center justify-center rounded-lg">
          <Newspaper aria-hidden className="h-5 w-5 text-signal-cyan" />
        </div>
        <div>
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
            Today&apos;s Headlines
          </p>
          <p className="font-display text-lg font-black text-white">
            {storyCount} <span className="text-sm font-bold text-white/70">Stories</span>
          </p>
        </div>
      </div>

      {isStale && (
        <p className="glass flex items-center gap-2 rounded-md border-yellow-500/40 px-3 py-2 text-xs font-bold text-yellow-300">
          <TriangleAlert aria-hidden className="h-4 w-4" />
          本日の更新が遅延しているため、前回配信分を表示しています
        </p>
      )}

      <div className="flex items-center gap-3 text-right">
        <div>
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-white/50">
            Last Updated
          </p>
          <p className="font-display text-sm font-bold tabular-nums text-white">
            {lastUpdated ? formatDateTimeJST(lastUpdated) : "—"}
          </p>
        </div>
        <div className="glass flex h-11 w-11 items-center justify-center rounded-lg">
          <RefreshCw aria-hidden className="h-5 w-5 text-signal-cyan" />
        </div>
      </div>
    </motion.section>
  );
}
