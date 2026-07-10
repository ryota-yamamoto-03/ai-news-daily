"use client";

import { useEffect } from "react";
import { RotateCcw, SatelliteDish } from "lucide-react";

/** ページ描画エラー時のフォールバックUI */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("ページの描画に失敗しました:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <SatelliteDish aria-hidden className="h-14 w-14 text-breaking-bright" />
      <div>
        <h1 className="font-display text-2xl font-black tracking-widest text-white">
          SIGNAL LOST
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/60">
          放送信号が一時的に途絶えました。回線を再接続してください。
          問題が続く場合は、しばらく時間をおいてからアクセスしてください。
        </p>
      </div>
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center gap-2 rounded-md border border-signal-blue/40 bg-signal-blue/10 px-5 py-2.5 text-sm font-bold text-signal-cyan transition-colors hover:bg-signal-blue/25 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal-cyan"
      >
        <RotateCcw aria-hidden className="h-4 w-4" />
        再接続する
      </button>
    </main>
  );
}
