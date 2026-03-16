import PageReveal from "./PageReveal";

export default function Contact() {
  return (
    <section id="contact" className="fullpage-section relative z-10">
      <PageReveal>
        <div className="h-full flex items-center px-10 md:px-20">
          <div className="max-w-lg">

            <div className="mb-10">
              <div className="flex items-center gap-4">
                <p className="text-4xl text-[#e55329] tracking-[0.1em] uppercase font-bold"># Contact</p>
                <div className="flex-1 h-px bg-[#e55329]/50 hidden md:block" />
              </div>
              <div className="h-px bg-[#e55329]/50 mt-3 md:hidden" />
            </div>

            <p className="text-3xl md:text-4xl font-black text-white mb-4 leading-snug">
              お気軽に<br />ご連絡ください
            </p>
            <p className="text-base text-white font-bold leading-relaxed mb-12">
              お仕事のご依頼、ご質問など、どんなことでもお気軽にどうぞ。
            </p>

            <dl className="space-y-5 text-base">
              <div className="flex gap-8">
                <dt className="w-20 text-[#e55329] flex-shrink-0 font-black">Email</dt>
                <dd>
                  <a href="mailto:your@email.com" className="text-white font-bold hover:text-[#e55329] transition-colors">
                    your@email.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-8">
                <dt className="w-20 text-[#e55329] flex-shrink-0 font-black">GitHub</dt>
                <dd>
                  <a href="https://github.com/obataritsurai" target="_blank" rel="noopener noreferrer"
                    className="text-white font-bold hover:text-[#e55329] transition-colors">
                    github.com/obataritsurai
                  </a>
                </dd>
              </div>
              <div className="flex gap-8">
                <dt className="w-20 text-[#e55329] flex-shrink-0 font-black">Twitter</dt>
                <dd>
                  <a href="https://twitter.com/obataritsurai" target="_blank" rel="noopener noreferrer"
                    className="text-white font-bold hover:text-[#e55329] transition-colors">
                    @obataritsurai
                  </a>
                </dd>
              </div>
            </dl>

          </div>
        </div>
      </PageReveal>

      <p className="absolute bottom-10 left-10 md:left-20 text-xs text-white/20 font-bold">
        © 2024 Riku Obata
      </p>
    </section>
  );
}
