import { Sparkles } from "lucide-react";

/** フッター: Powered by AI / 更新時刻の案内 */
export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-black/30 py-10 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-3 px-6 text-center">
        <p className="flex items-center gap-2 font-display text-sm font-bold tracking-[0.2em] text-white">
          <Sparkles aria-hidden className="h-4 w-4 text-signal-cyan" />
          POWERED BY AI
        </p>
        <p className="text-xs tracking-wider text-white/50">
          Updated Every Morning at 07:00 JST
        </p>
        <p className="mt-2 text-[11px] text-white/30">
          © {new Date().getFullYear()} AI BREAKING NEWS — 世界のAIニュースを毎朝5件、日本語要約でお届けします
        </p>
      </div>
    </footer>
  );
}
