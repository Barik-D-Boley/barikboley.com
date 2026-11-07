import React from 'react';

interface PanelProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Panel({ children, className = "", id }: PanelProps) {
  return (
    <div className={`panel ${className}`.trim()} id={id}> 
      {children}
    </div>
  );
}