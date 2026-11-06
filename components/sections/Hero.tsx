'use client';

import Icon from "@/components/Icon"

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <div className="eyebrow">
          <span>01</span> Engineer + Developer
        </div>
        <h1 id="hero-title">
          MECHANICAL ENGINEERING
          <span>& SOFTWARE DEVELOPMENT.</span>
        </h1>
        <p className="hero-subtitle">
          Bridging physical and digital systems.
        </p>
        <p className="student-line">
          Student @ BYU-Idaho <i /> Expected graduation: April 2029
        </p>
        <div className="hero-actions">
          <a
            className="primary-button"
            href="/Barik_Boley_Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="download" /> Resume (PDF)
          </a>
          <a
            className="primary-button"
            href="https://github.com/Barik-D-Boley"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="github" /> GitHub
          </a>
          <a
            className="primary-button"
            href="https://www.linkedin.com/in/barik-boley"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="linkedin" /> LinkedIn
          </a>
        </div>
      </div>
      <div className="hero-metric" aria-hidden="true">
        <span>SYS.STATUS</span>
        <strong>AVAILABLE</strong>
        <div>
          <i /> Open to opportunities
        </div>
      </div>
    </section>
  )
}