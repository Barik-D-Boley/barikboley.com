import React from 'react';
import Link from 'next/link';

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
  
  const variantClass = `${variant}-button`;
  const combinedClasses = `${variantClass} ${className}`.trim();

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