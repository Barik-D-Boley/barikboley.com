import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import AboutSection from "@/components/sections/AboutSection"
import ExperienceTimeline from "@/components/sections/ExperienceTimeline"
import ProjectGallery from "@/components/sections/ProjectGallery"
import Skills from "@/components/sections/Skills"
import ContactSection from "@/components/sections/ContactSection"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] print:bg-white">
      <Navbar />

      <main id="top">
        <Hero />

        <div className="mx-auto my-10 flex w-[min(1180px,92vw)] flex-col gap-7 max-[480px]:my-7 max-[480px]:w-[94vw] print:m-0 print:w-full">
          <ProjectGallery number="001" />
          <div className="grid grid-cols-[1.7fr_1fr] gap-7 max-[1040px]:grid-cols-1">
            <div id="about" className="scroll-mt-20">
              <AboutSection number="002" />
            </div>
            <div id="experience" className="scroll-mt-20">
              <ExperienceTimeline number="003" />
            </div>
          </div>
          <Skills number="004" />
        </div>

        <ContactSection number="005" />
      </main>

      <Footer />
    </div>
  )
}