"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";

interface PillListProps {
  items: { key: string; node: ReactNode }[];
}

/**
 * Renders pills separated by dots. A dot stays on the line of the pill before it
 * and is hidden whenever the next pill wraps onto a new line, so no line starts
 * or ends with a stray separator.
 */
export default function PillList({ items }: PillListProps) {
  const listRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const update = () => {
      const entries = Array.from(list.children) as HTMLElement[];
      entries.forEach((entry, index) => {
        const separator = entry.querySelector<HTMLElement>("[data-separator]");
        if (!separator) return;
        const next = entries[index + 1];
        const wraps =
          !next ||
          Math.abs(next.getBoundingClientRect().top - entry.getBoundingClientRect().top) > 2;
        // visibility (not display) keeps the layout stable, so hiding a dot never changes where lines wrap.
        separator.style.visibility = wraps ? "hidden" : "visible";
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(list);
    return () => observer.disconnect();
  }, [items]);

  return (
    <div
      className="flex shrink-0 flex-wrap items-center justify-start gap-1.5 sm:justify-end"
      ref={listRef}
    >
      {items.map((item, index) => (
        <span className="inline-flex items-center gap-1.5" key={item.key}>
          {item.node}
          {index < items.length - 1 && (
            <span
              aria-hidden="true"
              className="text-sm font-bold leading-none text-sky-300/80"
              data-separator
            >
              ·
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
