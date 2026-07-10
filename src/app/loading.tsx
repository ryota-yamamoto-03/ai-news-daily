import { Skeleton } from "@/components/ui/skeleton";

/** ページ生成中に表示するLoading Skeleton */
export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col" aria-busy="true" aria-label="読み込み中">
      {/* ヘッダー */}
      <div className="border-b border-white/10 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>

      {/* ティッカー */}
      <Skeleton className="h-9 w-full rounded-none" />

      <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-10 sm:px-6 sm:py-14">
        {/* ステータスバー */}
        <div className="mb-8 flex items-center justify-between">
          <Skeleton className="h-11 w-44" />
          <Skeleton className="h-11 w-44" />
        </div>

        {/* ニュースカード */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-white/10 bg-navy-900/70"
            >
              <Skeleton className="aspect-[16/9] w-full rounded-none" />
              <div className="space-y-3 p-6">
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-9 w-32" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
