"use client";

import PageReveal from "./PageReveal";
import { works } from "@/data/works";

// ▼ 各カテゴリの説明文をここで編集してください
const categoryDescriptions = {
  career: "新卒入社から現在まで従事しているSES企業にて、携わった制作案件をご紹介します。\n業種は多岐にわたりますが、守秘義務の観点から今回は2つの事例を紹介します。",
  personal: "業務外で運営している朝活コミュニティにおいて、LP制作やWebアプリケーション開発を行いました。\n企画から開発、運営まで一貫して担当しているためご紹介します。",
};

export default function WorksIndex() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const business = works.filter((w) => w.category === "職務経験");
  const personal = works.filter((w) => w.category === "個人プロジェクト");

  return (
    <section id="works-index" className="fullpage-section relative z-10">
      <PageReveal>
        <div className="h-full flex items-center px-5 md:px-20">
          <div className="w-full max-w-4xl">

            <div className="mb-10">
              <div className="flex items-center gap-4">
                <p className="text-4xl text-[#e55329] tracking-[0.1em] uppercase font-bold"># 制作実績一覧</p>
                <div className="flex-1 h-px bg-[#e55329]/50 hidden md:block" />
              </div>
              <div className="h-px bg-[#e55329]/50 mt-3 md:hidden" />
            </div>

            <div className="flex flex-col divide-y divide-white/10">
              <button
                onClick={() => scrollTo("works-career")}
                className="group py-8 flex items-center justify-between text-left"
              >
                <div>
                  <p className="text-2xl font-black text-white group-hover:text-[#e55329] transition-colors">職務経歴</p>
                  <p className="text-xs text-white/25 font-bold mt-1">{business.map((w) => w.title).join("  /  ")}</p>
                  <p className="text-sm text-white/50 font-bold mt-2 leading-relaxed whitespace-pre-line">{categoryDescriptions.career}</p>
                </div>
                <span className="text-white/25 group-hover:text-[#e55329] transition-colors font-black text-xl">→</span>
              </button>

              <button
                onClick={() => scrollTo("works-personal")}
                className="group py-8 flex items-center justify-between text-left"
              >
                <div>
                  <p className="text-2xl font-black text-white group-hover:text-[#e55329] transition-colors">個人プロジェクト</p>
                  <p className="text-xs text-white/25 font-bold mt-1">{personal.map((w) => w.title).join("  /  ")}</p>
                  <p className="text-sm text-white/50 font-bold mt-2 leading-relaxed whitespace-pre-line">{categoryDescriptions.personal}</p>
                </div>
                <span className="text-white/25 group-hover:text-[#e55329] transition-colors font-black text-xl">→</span>
              </button>
            </div>

            <div className="mt-8 px-4 py-3 border border-[#e55329]/30 bg-[#e55329]/5">
              <p className="text-xs text-white/60 font-bold leading-relaxed">
                <span className="text-[#e55329] mr-1.5">※</span>
                守秘義務契約により、一部の制作実績プロジェクトは詳細情報を非公開としています。なお、個人プロジェクトについてはこれに該当しません。
              </p>
            </div>

          </div>
        </div>
      </PageReveal>
    </section>
  );
}
