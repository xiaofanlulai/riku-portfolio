"use client";

import PageReveal from "./PageReveal";

export default function Hero() {
  return (
    <section id="hero" className="fullpage-section relative z-10">
      <PageReveal>
        <div className="h-full flex flex-col justify-center px-5 md:px-20">
          <div className="max-w-4xl">
            <div className="mb-10">
              <div className="flex items-center gap-4">
                <p className="text-3xl text-[#e55329] tracking-[0.1em] uppercase font-bold">ポートフォリオサイト</p>
                <div className="flex-1 h-px bg-[#e55329]/50 hidden md:block" />
              </div>
              <div className="h-px bg-[#e55329]/50 mt-3 md:hidden" />
            </div>
            {/* 職種 */}
            <p className="text-sm text-[#e55329] tracking-[0.2em] uppercase font-bold mb-4">
              フロントエンドエンジニア
            </p>

            {/* 名前 */}
            <h1 className="text-7xl md:text-6xl font-black text-white leading-tight mb-1 tracking-tight">
              小幡 律来
            </h1>
            <p className="text-lg text-white/30 tracking-widest font-bold mb-8">Riku Obata</p>

            {/* キャッチコピー */}
            <div className="border-l-2 border-[#e55329] pl-4 mb-8">
              <p className="text-xl text-white font-black leading-snug">
                届けるところまで考える、プロダクト作り。
              </p>
            </div>

            {/* 情報 */}
            <div className="flex flex-col gap-1 text-sm text-white/40 font-bold font-mono">
              <span>Experience  :  2+ years</span>
              <span>Location    :  Kanagawa / Tokyo, Japan</span>
              <span>Age         :  25</span>
            </div>
          </div>
        </div>
      </PageReveal>

      <button
        onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
        className="absolute bottom-10 left-5 md:left-20 flex items-center gap-2 text-xs text-white/40 hover:text-[#e55329] transition-colors font-bold"
      >
        <span>scroll</span>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

    </section>
  );
}
