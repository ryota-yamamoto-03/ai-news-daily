import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { runNewsPipeline } from "@/lib/news/pipeline";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * Vercel Cron から毎日 22:00 UTC（= 翌朝 7:00 JST）に呼び出される更新エンドポイント。
 * Authorization: Bearer <CRON_SECRET> で保護する。
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!cronSecret || authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await runNewsPipeline();

    // トップページのISRキャッシュを即時更新
    revalidatePath("/");

    return NextResponse.json({
      ok: true,
      updatedAt: new Date().toISOString(),
      ...result,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("ニュース更新パイプラインが失敗しました:", error);
    // 失敗しても前日分の表示が継続される（getTodaysNewsのフェイルセーフ）
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
