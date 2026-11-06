import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import AboutSection from "@/components/sections/AboutSection"
import ExperienceTimeline from "@/components/sections/ExperienceTimeline"
import ProjectGallery from "@/components/sections/ProjectGallery"
import ContactSection from "@/components/sections/ContactSection"
import Footer from "@/components/sections/Footer"

export default function Home() {
  return (
    <div className="site-shell">
      <Navbar />

      <main id="top">
        <Hero />

        <div className="content-grid">
          <ProjectGallery number="001" />
          <AboutSection number="002" />
          <ExperienceTimeline number="003" />
        </div>

        <ContactSection number="004"/>
      </main>

      <Footer />
    </div>
  )
}