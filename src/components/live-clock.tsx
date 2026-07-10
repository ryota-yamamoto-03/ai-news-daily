"use client";

import { useEffect, useState } from "react";
import { formatDateJST, formatTimeJST } from "@/lib/utils";

/**
 * ヘッダー右上の現在日時表示（JST・1秒間隔で更新）。
 * ハイドレーション不一致を避けるためマウント後に描画する。
 */
export function LiveClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <time
      className="text-right font-display text-xs leading-tight tracking-wider text-white/80 sm:text-sm"
      dateTime={now?.toISOString()}
      aria-label="現在日時（日本標準時）"
    >
      {now ? (
        <>
          <span className="block tabular-nums">{formatDateJST(now)}</span>
          <span className="block tabular-nums text-signal-cyan">
            {formatTimeJST(now)}
          </span>
        </>
      ) : (
        <span className="block opacity-0">--/--/----</span>
      )}
    </time>
  );
}
