"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Shows the email address as text with a button that copies it, for visitors whose mailto links do nothing. */
export default function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus("idle"), 2000);
  };

  return (
    <div className="flex items-center justify-between gap-3 font-mono text-xs max-[780px]:justify-center">
      <span className="select-all text-slate-300">{email}</span>
      <button
        className="inline-flex min-h-8 items-center gap-1.5 rounded border border-sky-400/30 bg-sky-500/5 px-2.5 text-[10px] font-bold tracking-[0.08em] text-sky-300 uppercase transition-colors hover:border-sky-300 hover:bg-sky-500/10"
        onClick={copy}
        type="button"
      >
        {status === "copied" ? (
          <Check aria-hidden="true" size={12} strokeWidth={2.4} />
        ) : (
          <Copy aria-hidden="true" size={12} strokeWidth={2.2} />
        )}
        {status === "copied" ? "Copied!" : status === "failed" ? "Copy failed" : "Copy"}
      </button>
      <span aria-live="polite" className="sr-only">
        {status === "copied" ? "Email address copied to clipboard" : status === "failed" ? "Could not copy the email address" : ""}
      </span>
    </div>
  );
}
