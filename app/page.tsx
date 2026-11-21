import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/sections/Hero"
import About from "@/components/sections/About"
import Experience from "@/components/sections/Experience"
import ProjectGallery from "@/components/sections/ProjectGallery"
import Skills from "@/components/sections/Skills"
import Contact from "@/components/sections/Contact"
import Footer from "@/components/layout/Footer"

export default function Home() {
  return (
    <div className="site-shell">
      <Navbar />

      <main id="top">
        <Hero />

        <div className="content-grid">
          <ProjectGallery number="001" />
          <div className="about-timeline-wrapper">
            <About number="002" />
            <Experience number="003" />
          </div>
          <Skills number="004" />
        </div>

        <Contact number="005"/>
      </main>

      <Footer />
    </div>
  )
}