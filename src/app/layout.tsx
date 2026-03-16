import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "小幡律来 ポートフォリオサイト",
  description:
    "小幡律来のポートフォリオサイトです。フロントエンドエンジニア ／ Webディレクター志望。実装経験を活かし、また一段上のレイヤーへ。",
  keywords: [
    "フロントエンドエンジニア",
    "React",
    "Next.js",
    "小幡律来",
    "Riku Obata",
    "ポートフォリオ",
  ],
  authors: [{ name: "Riku Obata" }],
  openGraph: {
    title: "オバタリック ポートフォリオ",
    description:
      "小幡律来のポートフォリオサイトです。フロントエンドエンジニア ／ Webディレクター志望。実装経験を活かし、また一段上のレイヤーへ。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
