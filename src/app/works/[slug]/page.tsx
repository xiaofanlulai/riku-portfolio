import Link from "next/link";
import { notFound } from "next/navigation";
import { works } from "@/data/works";
import WorkImageGallery from "./WorkImageGallery";
import WorkAnchorNav from "./WorkAnchorNav";
import ImageLightbox from "./ImageLightbox";
import WorkVideoPlayer from "./WorkVideoPlayer";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return works.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = works.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.title} | Riku Obata` };
}

function Divider() {
  return <div className="h-px bg-white/10" />;
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = works.find((p) => p.slug === slug);
  if (!project) notFound();

  const d = project.detail;
  const allTags = [...project.tech, ...(project.marketingTools ?? [])];
  const backId = project.category === "個人プロジェクト" ? "works-personal" : "works-career";
  const categoryLabel = project.category === "個人プロジェクト" ? "個人プロジェクト" : "職務経歴";

  const anchors = [
    d.purpose                                          && { id: "section-purpose",    label: "背景・目的" },
    d.challenges?.length                               && { id: "section-challenges", label: "顧客の課題" },
    d.features?.length                                 && { id: "section-features",   label: "機能紹介" },
    d.efforts.length                                   && { id: "section-efforts",    label: "（個人的）頑張った点・工夫した点" },
    d.results.length                                   && { id: "section-results",    label: "成果・結果" },
    d.next?.length                                     && { id: "section-next",       label: "次にやること" },
    (d.responsibilities.length || d.tools.length || d.team.length)
                                                       && { id: "section-details",    label: "詳細情報" },
  ].filter(Boolean) as { id: string; label: string }[];

  // 左カラム・モバイル共通のサマリー（リンクなし）
  const summary = (
    <div className="flex flex-col gap-4">
      <div className="border-l-4 border-[#e55329] pl-4">
        <span className="text-xs text-[#e55329] tracking-widest uppercase font-black">{categoryLabel}</span>
      </div>

      <h1 className="text-xl md:text-2xl font-black text-white leading-tight tracking-tight">
        {project.title}
      </h1>

      {(project.projectType || project.industry) && (
        <p className="text-xs text-white/50 font-bold tracking-wide">
          {[project.projectType, project.industry].filter(Boolean).join("  /  ")}
        </p>
      )}

      <div className="space-y-1.5 text-xs font-bold border-t border-white/10 pt-4">
        {project.role && (
          <p className="text-white/70">
            <span className="inline-block w-6 text-white/30 mr-2">担当</span>{project.role}
          </p>
        )}
        <p className="text-white/60">
          <span className="inline-block w-6 text-white/30 mr-2">期間</span>{project.period}
        </p>
        {d.pageCount > 0 && (
          <p className="text-white/60">
            <span className="inline-block w-6 text-white/30 mr-2">規模</span>{d.pageCount} ページ
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 pt-1">
        {allTags.map((t) => (
          <span key={t} className="px-2 py-0.5 text-[10px] border border-white/20 text-white/80 font-bold">
            {t}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-dvh bg-[#091928] text-white">
      <div className="max-w-7xl mx-auto px-8 md:px-16 py-16">

        {/* 戻るリンク（mobile のみ） */}
        <Link
          href={`/#${backId}`}
          className="md:hidden group inline-flex items-center gap-2.5 text-sm font-black text-white/75 hover:text-[#e55329] transition-colors mb-10"
        >
          <svg className="group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 8L2 12l4 4"/><path d="M2 12h14"/>
          </svg>
          一覧に戻る
        </Link>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-16">

          {/* 左カラム：sticky（desktop のみ） */}
          <aside className="hidden md:block w-72 lg:w-80 shrink-0">
            <div className="sticky top-16 flex flex-col gap-6">
              {summary}
              <div className="border-t border-white/10 pt-4">
                <Link
                  href={`/#${backId}`}
                  className="group inline-flex items-center gap-2.5 text-sm font-black text-white/75 hover:text-[#e55329] transition-colors"
                >
                  <svg className="group-hover:-translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 8L2 12l4 4"/><path d="M2 12h14"/>
                  </svg>
                  一覧に戻る
                </Link>
              </div>
            </div>
          </aside>

          {/* 右カラム：スクロールコンテンツ */}
          <div className="flex-1 min-w-0">

            {/* SP：プロジェクト概要（mobile のみ縦積み） */}
            <div className="md:hidden mb-10 pb-10 border-b border-white/10">
              {summary}
            </div>

            {/* 目次ナビ（全画面共通、コンテンツ最上部） */}
            {anchors.length > 0 && (
              <div className="mb-6">
                <WorkAnchorNav anchors={anchors} />
              </div>
            )}

            {/* 外部リンク */}
            {d.links && d.links.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-10">
                {d.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 text-sm font-bold rounded-full border border-white/30 text-white/70 hover:border-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    </svg>
                  </a>
                ))}
              </div>
            )}

            <div className="space-y-12">

              {/* 注意事項 */}
              {project.attention && (
                <div className="flex gap-3 border border-yellow-400/30 bg-yellow-400/5 px-5 py-4">
                  <span className="text-yellow-400 font-black shrink-0 text-sm">!</span>
                  <p className="text-sm text-yellow-200/80 font-bold leading-relaxed">{project.attention}</p>
                </div>
              )}

              {/* 画像ギャラリー */}
              {d.images && d.images.length > 0 && (
                <WorkImageGallery images={d.images} title={project.title} />
              )}

              {/* 背景・目的 */}
              {d.purpose && (
                <section id="section-purpose" className="scroll-mt-16">
                  <h2 className="text-lg font-black text-white border-l-2 border-[#e55329] pl-3 mb-5">背景・目的</h2>
                  <p className="text-base text-white font-bold leading-relaxed whitespace-pre-line">{d.purpose}</p>
                  {d.purposeVideo && <WorkVideoPlayer src={d.purposeVideo} />}
                </section>
              )}

              {/* 顧客の課題 */}
              {d.challenges && d.challenges.length > 0 && (
                <>
                  <Divider />
                  <section id="section-challenges" className="scroll-mt-16">
                    <h2 className="text-lg font-black text-white border-l-2 border-[#e55329] pl-3 mb-5">顧客の課題</h2>
                    <ol className="space-y-3">
                      {d.challenges.map((c, i) => (
                        <li key={i} className="flex gap-4 text-base text-white font-bold leading-relaxed">
                          <span className="text-[#e55329] font-black tabular-nums shrink-0">{i + 1}.</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ol>
                  </section>
                </>
              )}

              {/* 機能紹介 */}
              {d.features && d.features.length > 0 && (
                <>
                  <Divider />
                  <section id="section-features" className="scroll-mt-16">
                    <h2 className="text-lg font-black text-white border-l-2 border-[#e55329] pl-3 mb-5">機能紹介</h2>
                    {d.featuresVideo && <WorkVideoPlayer src={d.featuresVideo} />}
                    <div className="space-y-6 mt-6">
                      {d.features.map((f, i) => (
                        <div key={i}>
                          <p className="text-base font-black text-white mb-1">
                            <span className="text-[#e55329] mr-2">{i + 1}.</span>{f.title}
                          </p>
                          {f.body && (
                            <p className="text-base text-white/70 font-bold leading-relaxed pl-5 whitespace-pre-line">{f.body}</p>
                          )}
                          {f.image && (
                            <ImageLightbox src={f.image} alt={f.title} />
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              <Divider />

              {/* 工夫した点 */}
              {d.efforts.length > 0 && (
                <section id="section-efforts" className="scroll-mt-16">
                  <h2 className="text-lg font-black text-white border-l-2 border-[#e55329] pl-3 mb-5">（個人的）頑張った点・工夫した点</h2>
                  <div className="space-y-6">
                    {d.efforts.map((e, i) => (
                      <div key={i}>
                        <p className="text-base font-black text-white mb-1">
                          <span className="text-[#e55329] mr-2">{i + 1}.</span>{e.title}
                        </p>
                        <p className="text-base text-white/70 font-bold leading-relaxed pl-5 whitespace-pre-line">{e.body}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <Divider />

              {/* 成果・結果 */}
              {d.results.length > 0 && (
                <section id="section-results" className="scroll-mt-16">
                  <h2 className="text-lg font-black text-white border-l-2 border-[#e55329] pl-3 mb-5">成果・結果</h2>
                  <div className="space-y-6">
                    {d.results.map((r, i) => (
                      <div key={i}>
                        <p className="text-base font-black text-white mb-1">
                          <span className="text-[#e55329] mr-2">{i + 1}.</span>{r.title}
                        </p>
                        {r.body && (
                          <p className="text-base text-white/70 font-bold leading-relaxed pl-5 whitespace-pre-line">{r.body}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* 次にやること */}
              {d.next && d.next.length > 0 && (
                <>
                  <Divider />
                  <section id="section-next" className="scroll-mt-16">
                    <h2 className="text-lg font-black text-white border-l-2 border-[#e55329] pl-3 mb-5">次にやること</h2>
                    <div className="space-y-6">
                      {d.next.map((n, i) => (
                        <div key={i}>
                          <p className="text-base font-black text-white mb-1">
                            <span className="text-[#e55329] mr-2">{i + 1}.</span>{n.title}
                          </p>
                          {n.body && (
                            <p className="text-base text-white/70 font-bold leading-relaxed pl-5 whitespace-pre-line">{n.body}</p>
                          )}
                          {n.image && (
                            <ImageLightbox src={n.image} alt={n.title} />
                          )}
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              )}

              <Divider />

              {/* 詳細情報 */}
              <section id="section-details" className="scroll-mt-16 space-y-10">
                <h2 className="text-lg font-black text-white border-l-2 border-[#e55329] pl-3">詳細情報</h2>

                <div className="grid sm:grid-cols-2 gap-10">
                  <div>
                    <p className="text-xs text-white/60 tracking-widest uppercase font-black mb-3">制作期間</p>
                    <p className="text-sm text-white font-bold">{project.period}</p>
                    {d.pageCount > 0 && (
                      <p className="text-xs text-white/60 font-bold mt-1.5">合計 {d.pageCount} ページ</p>
                    )}
                  </div>
                  {d.responsibilities.length > 0 && (
                    <div>
                      <p className="text-xs text-white/60 tracking-widest uppercase font-black mb-3">担当領域</p>
                      <ul className="space-y-1.5">
                        {d.responsibilities.map((r, i) => (
                          <li key={i} className="flex gap-3 text-sm text-white font-bold leading-relaxed">
                            <span className="text-[#e55329] shrink-0">·</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {d.tools.length > 0 && (
                  <div>
                    <p className="text-xs text-white/60 tracking-widest uppercase font-black mb-4">制作ツール</p>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {d.tools.map((group) => (
                        <div key={group.label}>
                          <p className="text-xs text-white/60 font-black tracking-widest uppercase mb-2">{group.label}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {group.items.map((item) => (
                              <span key={item} className="px-2.5 py-1 text-xs border border-white/30 text-white/90 font-bold">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {d.team.length > 0 && (
                  <div>
                    <p className="text-xs text-white/60 tracking-widest uppercase font-black mb-3">制作体制</p>
                    <div className="space-y-3">
                      {d.team.map((member, i) => (
                        <div key={i} className="text-sm">
                          <p className="text-white/60 font-bold mb-0.5">{member.role}</p>
                          <p className="text-white font-bold">{member.count}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
