import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "AI BREAKING NEWS | 毎朝7:00更新のAIニュース速報",
    template: "%s | AI BREAKING NEWS",
  },
  description:
    "世界中のAIニュースを毎朝7:00 JSTに自動収集し、その日の重要ニュース5件だけをAI要約付きで配信する速報サイト。OpenAI・Google・Anthropicなど最前線の動きを日本語で。",
  keywords: ["AI", "ニュース", "速報", "OpenAI", "Anthropic", "Google AI", "生成AI", "人工知能"],
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "AI BREAKING NEWS",
    title: "AI BREAKING NEWS | 毎朝7:00更新のAIニュース速報",
    description:
      "世界中のAIニュースから毎朝7:00に重要な5件だけを厳選。AI要約付きの日本語速報サイト。",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI BREAKING NEWS",
    description:
      "世界中のAIニュースから毎朝7:00に重要な5件だけを厳選。AI要約付きの日本語速報サイト。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#050A18",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`dark ${inter.variable} ${notoSansJP.variable}`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
