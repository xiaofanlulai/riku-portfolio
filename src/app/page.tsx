import AnimatedBackground from "@/components/AnimatedBackground";
import SideNav from "@/components/SideNav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorksIndex from "@/components/WorksIndex";
import WorkSection from "@/components/WorkSection";
import Career from "@/components/Career";
import Skills from "@/components/Skills";
import { works } from "@/data/works";

export default function Home() {
  const businessWorks = works.filter((w) => w.category === "職務経験");
  const personalWorks = works.filter((w) => w.category === "個人プロジェクト");

  return (
    <>
      <AnimatedBackground />
      <SideNav />
      <div className="fullpage-container relative z-10">
        <Hero />
        <About />
        <WorksIndex />
        <WorkSection id="works-career" heading="職務経歴" projects={businessWorks} />
        <WorkSection id="works-personal" heading="個人プロジェクト" projects={personalWorks} />
        <Career />
        <Skills />
      </div>
    </>
  );
}
