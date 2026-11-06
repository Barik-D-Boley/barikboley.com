import Icon from "@/components/Icon"

export default function ContactSection({ number = "004" }: { number?: string }) {
  return (
    <section className="contact-panel" id="contact">
      <div>
        <div className="section-kicker">Connection / {number}</div>
        <h2>LET’S BUILD SOMETHING THAT WORKS.</h2>
        <p>
          Interested in engineering, software, or the space where they meet?
        </p>
      </div>
      <a className="contact-button" href="mailto:barik.boley@gmail.com">
        <Icon name="mail" />
        Start a conversation
        <Icon name="arrow" />
      </a>
    </section>
  )
}