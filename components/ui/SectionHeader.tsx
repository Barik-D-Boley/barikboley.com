import React from 'react';

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  children?: React.ReactNode; // For extra elements like the project count
}

export default function SectionHeader({ title, eyebrow, children }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
      </div>
      {children}
    </div>
  );
}