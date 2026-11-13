import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'contact' | 'see-more' | 'filter';
  href?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  href, 
  target, 
  rel, 
  children, 
  className = "", 
  ...props 
}: ButtonProps) {
  
  const variantClasses = {
    primary:
      'inline-flex min-h-[43px] items-center gap-[9px] rounded border border-[rgba(255,255,255,0.12)] bg-sky-500 px-4 text-xs font-bold text-[#07111f] no-underline shadow-[0_8px_22px_rgba(14,165,233,0.16)] transition-[transform,background] duration-[180ms] hover:-translate-y-0.5 hover:bg-sky-400',
    contact:
      'flex min-h-12 shrink-0 items-center gap-2.5 rounded bg-sky-500 px-[18px] text-xs font-bold text-[#06131f] no-underline transition-[background,transform] duration-[180ms] hover:-translate-y-0.5 hover:bg-sky-400 max-[780px]:justify-center',
    'see-more':
      'inline-flex items-center gap-2 rounded border border-sky-500 bg-sky-500/10 px-6 py-3 text-[11px] font-bold tracking-[0.08em] text-sky-400 uppercase transition-[background,color,transform] duration-[180ms] hover:-translate-y-0.5 hover:bg-sky-500 hover:text-[#06131f]',
    filter:
      'rounded border border-slate-400/30 bg-[#152235] px-3 py-[9px] text-[9px] leading-[1.35] font-bold tracking-[0.05em] text-slate-300 uppercase transition-[border-color,background,color] duration-150 hover:border-sky-500 hover:text-white max-[780px]:flex max-[780px]:min-h-12 max-[780px]:w-full max-[780px]:items-center max-[780px]:justify-center max-[780px]:p-2 max-[780px]:text-center max-[780px]:text-[10px]',
  };
  const combinedClasses = cn(variantClasses[variant], className);

  // If href exists, render as an anchor link
  if (href) {
    return (
      <Link 
        href={href} 
        className={combinedClasses}
        target={target} 
        rel={rel}
      >
        {children}
      </Link>
    );
  }

  // Otherwise, render as a standard button
  return (
    <button className={combinedClasses} {...props}>
      {children}
    </button>
  );
}