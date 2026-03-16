import PageReveal from "./PageReveal";

export default function About() {
  return (
    <section id="about" className="fullpage-section relative z-10">
      <PageReveal>
        <div className="h-full flex items-center px-5 md:px-20">
          <div className="w-full max-w-4xl">

            <div className="mb-6">
              <div className="flex items-center gap-4">
                <p className="text-4xl text-[#e55329] tracking-[0.1em] uppercase font-bold"># 私について</p>
                <div className="flex-1 h-px bg-[#e55329]/50 hidden md:block" />
              </div>
              <div className="h-px bg-[#e55329]/50 mt-3 md:hidden" />
            </div>

            <div className="space-y-3 text-base text-white font-bold leading-relaxed">
              <p>
                学生時代の自己学習やインターンシップを含め、フロントエンドエンジニアとして6年以上、数多くのWebサイトやサービスの実装に携わってきました。
                </p>
              <p>
                大学時代のインターンシップでは、コーディングだけでなくWebマーケティング業務も担当し、「作る」と「届ける」両方の視点をキャリアの早い段階から持つことができました。その経験が、今の自分の大きな土台になっています。<br />
                現在は、フロントエンドエンジニアとして大手企業のキャンペーンLPを多数担当しています。プロジェクト管理や実装を中心に、チームの中で幅広い役割を担ってきました。
              </p>
              <p>
                また、業務と並行して、自らプロダクトを企画・開発し、リリースから運用まで一人で手がけるなど、エンジニアの枠にとどまらない挑戦を続けています。
              </p>
            </div>

          </div>
        </div>
      </PageReveal>
    </section>
  );
}
