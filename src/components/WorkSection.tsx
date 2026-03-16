"use client";

import Link from "next/link";
import PageReveal from "./PageReveal";
import type { Project } from "@/data/works";

type Props = {
  id: string;
  heading: string;
  projects: Project[];
};

export default function WorkSection({ id, heading, projects }: Props) {
  return (
    <section id={id} className="fullpage-section relative z-10">
      <PageReveal>
        <div className="h-full flex flex-col justify-center px-5 md:px-20 py-14">
          <div className="w-full max-w-4xl">

            {/* ヘッダー */}
            <div className="border-l-4 border-[#e55329] pl-4 mb-8">
              <span className="text-base text-[#e55329] tracking-widest uppercase font-black">{heading}</span>
            </div>

            {/* プロジェクト一覧 */}
            <div className="flex flex-col">
              {projects.map((project, i) => (
                <div key={project.slug} className="border-t border-white/10 pt-5 pb-6 flex items-start gap-6">

                  {/* 大きな番号 */}
                  <span className="text-7xl text-white/8 leading-none select-none shrink-0 -mt-1" style={{ fontFamily: "var(--font-bebas-neue)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* コンテンツ */}
                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <h2 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight">
                      {project.title}
                    </h2>
                    {(project.projectType || project.industry) && (
                      <p className="text-xs text-white/25 font-bold tracking-wide">
                        {[project.projectType, project.industry].filter(Boolean).join("  /  ")}
                      </p>
                    )}
                    <p className="text-sm text-white/55 font-bold leading-relaxed whitespace-pre-line">
                      {project.description}
                    </p>
                    <div className="flex gap-6 text-xs font-bold text-white/40 mt-1">
                      {project.role && <span><span className="text-white/15 mr-1.5">担当</span>{project.role}</span>}
                      <span><span className="text-white/15 mr-1.5">期間</span>{project.period}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {[...project.tech, ...(project.marketingTools ?? [])].map((t) => (
                        <span key={t} className="px-2 py-0.5 text-[10px] border border-white/8 text-white font-bold">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-end mt-3">
                      <Link
                        href={`/works/${project.slug}`}
                        className="group inline-flex items-center gap-3 text-xs font-black text-white/45 hover:text-white transition-colors"
                      >
                        詳しく見る
                        <span className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#e55329] group-hover:bg-[#e55329] transition-all">
                          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                          </svg>
                        </span>
                      </Link>
                    </div>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </div>
      </PageReveal>
    </section>
  );
}
