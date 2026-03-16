"use client";

import { useEffect, useState } from "react";
const mainSections = [
  { id: "hero",        num: "01", label: "TOP",    desc: "" },
  { id: "about",       num: "02", label: "ABOUT",  desc: "自己紹介・プロフィール" },
  { id: "works-index", num: "03", label: "WORKS",  desc: "制作実績一覧" },
  { id: "career",      num: "04", label: "CAREER", desc: "職務経歴・資格" },
  { id: "skills",      num: "05", label: "SKILLS", desc: "技術スタック" },
];

const allSectionIds = [
  "hero",
  "about",
  "works-index",
  "works-career",
  "works-personal",
  "career",
  "skills",
];

export default function SideNav() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const container = document.querySelector(".fullpage-container");
    if (!container) return;

    const update = () => {
      const containerRect = container.getBoundingClientRect();
      let bestId = "";
      let bestRatio = -1;

      allSectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const visibleTop = Math.max(rect.top, containerRect.top);
        const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
        const visible = Math.max(0, visibleBottom - visibleTop);
        const ratio = visible / containerRect.height;
        if (ratio > bestRatio) {
          bestRatio = ratio;
          bestId = id;
        }
      });

      if (bestId) setActive(bestId);
    };

    container.addEventListener("scroll", update, { passive: true });
    update();
    return () => container.removeEventListener("scroll", update);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const isWorkActive = active === "works-career" || active === "works-personal";
  const activeMainId = isWorkActive ? "works-index" : active;

  return (
    <>
      {/* ドットナビ: md〜1200px */}
      <nav className="hidden md:flex min-[1200px]:hidden fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col gap-3.5">
        {allSectionIds.map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="flex items-center"
          >
            <span
              className={`block w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                active === id
                  ? "bg-[#e55329]"
                  : "bg-white/20 group-hover:bg-white/50"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* 拡張サイドバー: 1200px+ */}
      <nav className="hidden min-[1200px]:flex fixed right-0 top-0 h-full z-50 w-56 flex-col justify-center border-l border-white/5">
        <ul className="space-y-0.5 px-4">
          {mainSections.map((section) => {
            const isActive = activeMainId === section.id;
            const isWorksSection = section.id === "works-index";

            return (
              <li key={section.id}>
                <button
                  onClick={() => scrollTo(section.id)}
                  className={`w-full text-left group flex items-stretch gap-3 py-2.5 px-2 rounded transition-all duration-200 ${
                    isActive ? "bg-[#e55329]/8" : "hover:bg-white/4"
                  }`}
                >
                  {/* 左アクセントバー */}
                  <div
                    className={`w-0.5 rounded-full flex-shrink-0 transition-colors duration-200 ${
                      isActive
                        ? "bg-[#e55329]"
                        : "bg-white/10 group-hover:bg-white/25"
                    }`}
                  />
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-1.5">
                      <span
                        className={`text-[10px] font-mono font-bold transition-colors duration-200 ${
                          isActive
                            ? "text-[#e55329]"
                            : "text-white/25 group-hover:text-white/45"
                        }`}
                      >
                        {section.num}
                      </span>
                      <span
                        className={`text-xs font-black tracking-widest transition-colors duration-200 ${
                          isActive
                            ? "text-[#e55329]"
                            : "text-white/45 group-hover:text-white/75"
                        }`}
                      >
                        {section.label}
                      </span>
                    </div>
                    <p
                      className={`text-[10px] font-bold mt-0.5 leading-relaxed transition-colors duration-200 ${
                        isActive
                          ? "text-white/55"
                          : "text-white/20 group-hover:text-white/40"
                      }`}
                    >
                      {section.desc}
                    </p>
                  </div>
                </button>

                {/* works サブアイテム */}
                {isWorksSection && (
                  <ul className="mt-0.5 mb-1 space-y-0.5 ml-5 pl-2 border-l border-white/5">
                    {[
                      { id: "works-career", label: "職務経歴" },
                      { id: "works-personal", label: "個人プロジェクト" },
                    ].map((item) => (
                      <li key={item.id}>
                        <button
                          onClick={() => scrollTo(item.id)}
                          className={`w-full text-left px-2 py-1.5 text-[10px] font-bold rounded transition-all duration-200 leading-snug ${
                            active === item.id
                              ? "text-[#e55329]"
                              : "text-white/20 hover:text-white/50"
                          }`}
                        >
                          <span className="text-white/15 mr-1">↳</span>
                          {item.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
