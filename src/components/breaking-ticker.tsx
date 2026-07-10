"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

interface BreakingTickerProps {
  headlines: string[];
}

/**
 * Breaking Newsバー。
 * 見出しを2セット並べて -50% まで平行移動をループさせることで、
 * 途切れない無限スクロールを実現する。
 */
export function BreakingTicker({ headlines }: BreakingTickerProps) {
  const items = headlines.length > 0 ? headlines : ["AI BREAKING NEWS"];

  return (
    <motion.div
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: 1.4, ease: "easeOut" }}
      className="relative z-30 flex items-stretch border-b border-white/10 bg-black/40"
      role="marquee"
      aria-label="速報ヘッドライン"
    >
      {/* 左端の BREAKING NEWS ラベル */}
      <div className="relative z-10 flex shrink-0 items-center gap-2 bg-breaking px-3 py-2 shadow-[0_0_24px_rgba(225,29,46,0.55)] sm:px-5">
        <Zap aria-hidden className="h-3.5 w-3.5 fill-white text-white" />
        <span className="font-display text-[11px] font-black tracking-[0.2em] text-white sm:text-xs">
          BREAKING&nbsp;NEWS
        </span>
      </div>

      {/* 無限スクロール部 */}
      <div className="relative flex-1 overflow-hidden">
        <div className="absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black/60 to-transparent" />
        <div className="flex h-full w-max animate-ticker items-center">
          {[0, 1].map((set) => (
            <div
              key={set}
              className="flex items-center"
              aria-hidden={set === 1}
            >
              {items.map((headline, i) => (
                <span
                  key={`${set}-${i}`}
                  className="flex items-center whitespace-nowrap px-6 py-2 text-sm text-white/90"
                >
                  <span className="mr-6 inline-block h-1.5 w-1.5 rounded-full bg-breaking-bright" />
                  {headline}
                </span>
              ))}
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black/60 to-transparent" />
      </div>
    </motion.div>
  );
}
