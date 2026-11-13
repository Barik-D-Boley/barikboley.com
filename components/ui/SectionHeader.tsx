import React from 'react';

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  children?: React.ReactNode; // For extra elements like the project count
}

export default function SectionHeader({ title, eyebrow, children }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between gap-5 max-[780px]:flex-col max-[780px]:items-start max-[780px]:gap-[9px]">
      <div className="max-[780px]:w-full max-[780px]:text-left">
        {eyebrow && (
          <span className="mb-[22px] flex items-center gap-2.5 text-[10px] font-extrabold tracking-[0.16em] text-sky-400 uppercase">
            {eyebrow}
          </span>
        )}
        <h2 className="mt-[7px] text-[clamp(1.25rem,2vw,1.75rem)] font-extrabold tracking-[-0.035em]">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}