import type { NewsArticle } from "@/lib/types";

/**
 * デモ・開発用のサンプルニュース。
 * SupabaseやAPIキーが未設定の環境でもサイトの見た目を確認できるようにする。
 * 本番ではCronパイプラインが保存した実データが優先される。
 */
export const SAMPLE_NEWS: NewsArticle[] = [
  {
    id: "sample-1",
    title: "OpenAI、推論特化の次世代モデルを発表",
    summary:
      "OpenAIは、複雑な多段推論に特化した次世代モデルを発表した。従来モデルと比較して数学・科学分野のベンチマークで大幅な性能向上を示し、企業向けAPIとして段階的に提供を開始する。安全性評価には外部研究機関も参加しており、商用利用時のガードレール強化も同時に導入されるという。",
    image: null,
    source: "TechCrunch",
    published_at: "2026-07-09T21:00:00.000Z",
    url: "https://techcrunch.com/",
    created_at: "2026-07-09T22:00:00.000Z",
  },
  {
    id: "sample-2",
    title: "Google DeepMind、科学研究支援AIの成果を公開",
    summary:
      "Google DeepMindは、新素材探索や創薬候補の特定を支援する科学研究向けAIシステムの最新成果を公開した。実験計画の提案から結果の解析までを一貫して支援し、複数の大学研究室との共同検証では研究サイクルの大幅な短縮が確認された。年内により広い研究コミュニティへの開放を予定している。",
    image: null,
    source: "Reuters",
    published_at: "2026-07-09T18:30:00.000Z",
    url: "https://www.reuters.com/",
    created_at: "2026-07-09T22:00:00.000Z",
  },
  {
    id: "sample-3",
    title: "Anthropic、Claudeの企業向け新機能を拡充",
    summary:
      "Anthropicは、AIアシスタント「Claude」の企業向け機能を大幅に拡充したと発表した。長時間の自律的なタスク実行や社内データとの安全な連携機能が追加され、金融・法務など規制の厳しい業界での導入を想定したコンプライアンス管理機能も強化された。大手企業数十社が先行導入を進めているという。",
    image: null,
    source: "Bloomberg",
    published_at: "2026-07-09T15:00:00.000Z",
    url: "https://www.bloomberg.com/",
    created_at: "2026-07-09T22:00:00.000Z",
  },
  {
    id: "sample-4",
    title: "NVIDIA、次世代AIチップの量産開始を発表",
    summary:
      "NVIDIAは、次世代AIアクセラレータの量産開始を正式に発表した。前世代比で推論性能が大幅に向上し、電力効率も改善。主要クラウド事業者への出荷は今四半期から始まる。生成AIの推論需要の急増を背景に、供給能力の拡大が業界全体の関心事となっており、同社は生産パートナーの増強も進めている。",
    image: null,
    source: "CNBC",
    published_at: "2026-07-09T12:00:00.000Z",
    url: "https://www.cnbc.com/",
    created_at: "2026-07-09T22:00:00.000Z",
  },
  {
    id: "sample-5",
    title: "EU、生成AIの透明性規制の運用指針を公表",
    summary:
      "欧州連合は、生成AIサービスに求める透明性義務の具体的な運用指針を公表した。学習データの概要開示やAI生成コンテンツの明示などが柱で、大手AI企業には段階的な適合が求められる。違反時の制裁金についても算定基準が示され、グローバルにサービスを展開する各社の対応が今後の焦点となる。",
    image: null,
    source: "BBC News",
    published_at: "2026-07-09T09:00:00.000Z",
    url: "https://www.bbc.com/news",
    created_at: "2026-07-09T22:00:00.000Z",
  },
];
