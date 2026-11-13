'use client';

import Image from "next/image";
import Icon from "@/components/Icon"
import Button from '../ui/Buttons';

export default function Hero() {
  return (
    <section className="relative grid min-h-[560px] items-end overflow-hidden border-b border-[var(--line)] pt-[88px] pr-[clamp(260px,26vw,420px)] pb-[82px] pl-[clamp(24px,5vw,80px)] max-[1040px]:min-h-[620px] max-[780px]:min-h-[570px] max-[780px]:pt-[70px] max-[480px]:min-h-[540px] print:min-h-0 print:border-0 print:p-[30px]" aria-labelledby="hero-title">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(14,165,233,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.08)_1px,transparent_1px)] bg-size-[48px_48px] opacity-[0.55] [mask-image:linear-gradient(to_bottom,black,transparent_94%)]" aria-hidden="true" />
      <div className="relative z-2 max-w-[760px]">
        <div className="mb-[22px] flex items-center gap-2.5 text-[10px] font-extrabold tracking-[0.16em] text-sky-400 uppercase">
          <span className="grid h-[26px] w-[26px] place-items-center border border-[var(--line-strong)] text-sky-400">01</span> Engineer + Developer
        </div>
        <h1 className="max-w-[950px] text-[clamp(2.8rem,6.5vw,6.7rem)] leading-[0.92] font-extrabold tracking-[-0.055em] max-[780px]:text-[clamp(2.5rem,12vw,4.8rem)] max-[480px]:text-[clamp(2.2rem,12vw,3.2rem)] max-[480px]:leading-[0.96] print:text-[#0f172a]" id="hero-title">
          MECHANICAL ENGINEERING
          <span className="block text-blue-100 print:text-[#0f172a]">& SOFTWARE DEVELOPMENT</span>
        </h1>
        <p className="mt-6 text-[clamp(1.05rem,2vw,1.4rem)] tracking-[-0.02em] text-slate-300">
          Bridging physical and digital systems.
        </p>
        <p className="mt-3.5 flex items-center gap-[9px] text-[11px] font-extrabold tracking-[0.06em] text-orange-400 uppercase max-[480px]:items-start max-[480px]:flex-col">
          Student @ BYU-Idaho <i className="h-1 w-1 rounded-full bg-current max-[480px]:hidden" /> Expected graduation: April 2029
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5 max-[480px]:grid max-[480px]:grid-cols-2 print:hidden">
          <Button
            variant="primary"
            className="max-[480px]:col-span-2 max-[480px]:justify-center"
            href="/Barik_Boley_Resume.pdf"
            target="_blank"
            rel="noreferrer"
          >
            <Icon name="download" /> Resume (PDF)
          </Button>
          <Button
            variant="primary"
            href="https://github.com/Barik-D-Boley"
            target="_blank"
            rel="noreferrer"
            className="bg-[#172c42] text-blue-100 max-[480px]:justify-center"
          >
            <Icon name="github" /> GitHub
          </Button>
          <Button
            variant="primary"
            href="https://www.linkedin.com/in/barik-boley"
            target="_blank"
            rel="noreferrer"
            className="bg-[#172c42] text-blue-100 max-[480px]:justify-center"
          >
            <Icon name="linkedin" /> LinkedIn
          </Button>
        </div>
      </div>
      <div className="absolute top-8 right-[8vw] z-1 flex items-center justify-center max-[1040px]:top-[22px] max-[1040px]:right-[4vw]" aria-hidden="true">
        <div className="flex h-[min(22vw,320px)] w-[min(22vw,320px)] min-h-[180px] min-w-[180px] items-center justify-center overflow-hidden rounded-full border border-sky-500/20 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.12),rgba(15,23,42,0.24)_65%,rgba(15,23,42,0.7)_100%)] shadow-[inset_0_0_0_18px_rgba(14,165,233,0.05),0_18px_40px_rgba(2,6,23,0.3)] max-[1040px]:h-[min(22vw,210px)] max-[1040px]:w-[min(22vw,210px)] max-[1040px]:min-h-[150px] max-[1040px]:min-w-[150px]">
          <Image className="h-auto w-[62%] opacity-[0.96]" src="/icon.svg" alt="" width={220} height={220} priority />
        </div>
      </div>
      <div className="absolute right-[5vw] bottom-[85px] z-2 w-[260px] border-t border-[var(--line-strong)] bg-[rgba(30,41,59,0.72)] px-4 pt-[18px] pb-4 shadow-[0_16px_40px_rgba(0,0,0,0.2)] max-[1040px]:static max-[1040px]:mt-[22px] max-[1040px]:w-[min(100%,360px)]" role="status" aria-live="polite">
        <span className="font-mono text-[10px] tracking-[0.12em] text-[var(--muted)]">SYS.STATUS</span>
        <strong className="mt-1 block mb-2.5 text-lg leading-[1.2] font-bold tracking-[0.08em] text-white">SEEKING INTERNSHIPS</strong>
        <div className="flex items-center gap-1.5 text-[11px] leading-[1.35] text-blue-100 before:h-[7px] before:w-[7px] before:shrink-0 before:rounded-full before:bg-green-500 before:shadow-[0_0_10px_#22c55e] before:content-['']">
          Mechanical • Nuclear • Software
        </div>
      </div>
    </section>
  )
}