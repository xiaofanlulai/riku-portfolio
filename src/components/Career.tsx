import PageReveal from "./PageReveal";

const career = [
  {
    period: "2019年4月 〜 2024年3月",
    org: "文京学院大学",
    url: null,
    roles: ["卒業"],
    note: "2020年、コロナウイルスの影響でオンライン授業になったことをきっかけに、1年間のインターンシップを経験。実務を通じて学ぶことを選択し、5年で卒業。",
  },
  {
    period: "2024年4月 〜 現在に至る",
    org: "株式会社ドリームキャリア",
    url: "https://www.dreamcareer.co.jp/",
    roles: ["フロントエンドエンジニア", "WEBディレクター"],
  },
];

const certifications = [
  { name: "Google アナリティクス個人認定資格（GAIQ）", date: "2026年2月", status: "取得" as const },
  { name: "Google 広告認定資格", date: "2026年2月", status: "取得" as const },
  { name: "日商簿記3級", date: null, status: "興味あり" as const },
  { name: "基本情報技術者試験", date: null, status: "興味あり" as const },
];

export default function Career() {
  return (
    <section id="career" className="fullpage-section relative z-10">
      <PageReveal>
        <div className="h-full flex items-center px-5 md:px-20">
          <div className="w-full max-w-4xl">

            <div className="mb-10">
              <div className="flex items-center gap-4">
                <p className="text-4xl text-[#e55329] tracking-[0.1em] uppercase font-bold"># 経歴・資格</p>
                <div className="flex-1 h-px bg-[#e55329]/50 hidden md:block" />
              </div>
              <div className="h-px bg-[#e55329]/50 mt-3 md:hidden" />
            </div>

            <div className="grid md:grid-cols-2 gap-16">
              <div className="space-y-6">
                <h3 className="text-sm text-[#e55329] tracking-widest uppercase font-black">経歴</h3>
                <ol className="space-y-6">
                  {career.map((item) => (
                    <li key={item.org} className="flex gap-5">
                      <div className="flex flex-col items-center">
                        <div className="w-2 h-2 rounded-full bg-[#e55329] mt-1.5 flex-shrink-0" />
                        <div className="w-px flex-1 bg-[#e55329]/20 mt-2" />
                      </div>
                      <div className="pb-4">
                        <p className="text-sm text-white/40 font-bold mb-1">{item.period}</p>
                        <p className="text-lg text-white font-black">{item.org}</p>
                        {item.url && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 text-xs font-bold rounded-full border border-white/30 text-white/70 hover:border-white/60 hover:text-white transition-colors"
                          >
                            サイトを見る
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            </svg>
                          </a>
                        )}
                        <p className="text-base text-white/70 font-bold mt-2">
                          {item.roles.join("  /  ")}
                        </p>
                        {item.note && (
                          <p className="text-sm text-white/40 font-bold mt-2 leading-relaxed">{item.note}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm text-[#e55329] tracking-widest uppercase font-black">資格</h3>
                <ul className="space-y-5">
                  {certifications.map((c) => (
                    <li key={c.name} className="flex gap-5">
                      <div
                        className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                          c.status === "取得" ? "bg-[#e55329]" : "border border-[#e55329]/50 bg-transparent"
                        }`}
                      />
                      <div>
                        <p className="text-lg text-white font-bold leading-snug">{c.name}</p>
                        <p className="text-sm font-bold mt-1">
                          {c.status === "取得" ? (
                            <span className="text-white/40">{c.date}取得</span>
                          ) : (
                            <span className="text-[#e55329]/60">取得に向け勉強中</span>
                          )}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </PageReveal>
    </section>
  );
}
