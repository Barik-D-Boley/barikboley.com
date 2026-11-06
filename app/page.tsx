import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import AboutSection from "@/components/sections/About"
import ExperienceTimeline from "@/components/sections/Experience"
import ProjectGallery from "@/components/sections/ProjectGallery"
import ContactSection from "@/components/sections/Contact"
import Footer from "@/components/layout/Footer"

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