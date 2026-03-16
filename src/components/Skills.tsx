import PageReveal from "./PageReveal";

const categories = [
  {
    label: "フロントエンド",
    items: [
      { name: "HTML / CSS", years: "3年以上" },
      { name: "Sass / scss", years: "3年以上" },
      { name: "JavaScript", years: "3年以上" },
      { name: "jQuery", years: "3年以上" },
      { name: "React", years: "2年" },
      { name: "Next.js", years: "2年" },
      { name: "Tailwind CSS", years: "1年" },
    ],
  },
  {
    label: "バックエンド",
    items: [
      { name: "TypeScript", years: "1年" },
      { name: "PHP", years: "2年" },
    ],
  },
  {
    label: "デザイン",
    items: [
      { name: "Figma", years: "2年" },
      { name: "Adobe Illustrator", years: "1年" },
      { name: "Adobe Photoshop", years: "1年" },
      { name: "Canva", years: "3年以上" },
    ],
  },
  {
    label: "マーケティング",
    items: [
      { name: "Google Analytics", years: "3年以上" },
      { name: "Google Tag Manager", years: "3年以上" },
      { name: "Google Search Console", years: "3年以上" },
      { name: "Google Ads", years: "1年" },
    ],
  },
  {
    label: "AI",
    items: [
      { name: "ChatGPT", years: undefined },
      { name: "Claude", years: undefined },
      { name: "Claude Code", years: undefined },
      { name: "Cursor", years: undefined },
      { name: "Replit", years: undefined },
      { name: "Genspark", years: undefined },
      { name: "Gemini", years: undefined },
      { name: "Perplexity", years: undefined },
    ],
  },
  {
    label: "その他",
    items: [
      { name: "Git / GitHub", years: "3年" },
      { name: "WordPress", years: "2年" },
      { name: "Shopify", years: "1年" },
      { name: "Notion", years: "3年以上" },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="fullpage-section relative z-10">
      <PageReveal>
        <div className="h-full flex items-center px-5 md:px-20">
          <div className="w-full max-w-4xl">

            <div className="mb-10">
              <div className="flex items-center gap-4">
                <p className="text-4xl text-[#e55329] tracking-[0.1em] uppercase font-bold"># スキル</p>
                <div className="flex-1 h-px bg-[#e55329]/50 hidden md:block" />
              </div>
              <div className="h-px bg-[#e55329]/50 mt-3 md:hidden" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-8">
              {categories.map((cat) => (
                <div key={cat.label}>
                  <h3 className="text-xs text-[#e55329] tracking-widest uppercase font-black mb-3">{cat.label}</h3>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item.name}
                        className="px-2.5 py-1 text-sm border border-white/20 text-white font-bold rounded"
                      >
                        {item.name}
                        {item.years && (
                          <span className="ml-1.5 text-xs text-white/40">{item.years}</span>
                        )}
                      </span>
                    ))}
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
