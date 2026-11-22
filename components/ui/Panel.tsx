import React from 'react';
import { cn } from '@/lib/utils';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Panel({ children, className = "", id }: PanelProps) {
  return (
    <div
      className={cn(
        'rounded-[7px] border border-[var(--line)] bg-[image:linear-gradient(145deg,rgba(255,255,255,0.018),transparent_50%)] bg-[color:var(--panel)] shadow-[0_18px_55px_rgba(2,8,23,0.2)] print:break-inside-avoid print:border-slate-300 print:bg-white print:shadow-none print:[&_h2]:text-[#0f172a] print:[&_h3]:text-[#0f172a]',
        className,
      )}
      id={id}
    >
      {children}
    </div>
  );
}