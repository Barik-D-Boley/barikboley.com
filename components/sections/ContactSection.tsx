import Icon from "@/components/Icon"
import Button from "@/components/ui/Button"

export default function ContactSection({ number }: { number: string }) {
  return (
    <section className="mx-auto mb-10 flex w-[min(1180px,92vw)] scroll-mt-20 items-center justify-between gap-[30px] rounded-[5px] border border-sky-500/30 border-l-4 border-l-orange-600 bg-[image:linear-gradient(90deg,rgba(14,165,233,0.08),transparent_45%)] bg-[color:var(--panel)] p-[clamp(26px,4vw,48px)] max-[780px]:w-[94vw] max-[780px]:items-stretch max-[780px]:flex-col print:hidden" id="contact">
      <div>
        <div className="text-[10px] font-extrabold tracking-[0.16em] text-sky-400 uppercase">{`Connection / ${number}`}</div>
        <h2 className="mt-[7px] text-[clamp(1.25rem,2vw,1.75rem)] font-extrabold tracking-[-0.035em]">LET’S BUILD SOMETHING THAT WORKS.</h2>
        <p className="mt-2.5 text-[13px] text-[var(--muted)]">
          Interested in engineering, software, or the space where they meet?
        </p>
      </div>
      <Button variant="contact" href="mailto:barik.boley@gmail.com">
        <Icon name="mail" />
        Start a conversation
        <Icon name="arrow" />
      </Button>
    </section>
  )
}