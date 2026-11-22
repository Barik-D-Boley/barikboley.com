"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Icon button that copies the email address, for visitors whose mailto links do nothing. */
export default function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  // Kept after status resets so the bubble's text stays put while it fades out.
  const [lastResult, setLastResult] = useState<"copied" | "failed">("copied");
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setStatus("copied");
      setLastResult("copied");
    } catch {
      setStatus("failed");
      setLastResult("failed");
    }
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setStatus("idle"), 2500);
  };

  const label =
    status === "copied" ? "Email address copied" : status === "failed" ? "Copy failed" : "Copy email address";

  return (
    <span className="relative flex shrink-0">
      <button
        aria-label={label}
        className={`flex min-h-12 w-12 items-center justify-center rounded border transition-[background,border-color,color,transform] duration-[180ms] hover:-translate-y-0.5 ${
          status === "copied"
            ? "border-emerald-400/60 bg-emerald-500/10 text-emerald-300"
            : "border-sky-400/40 bg-sky-500/10 text-sky-300 hover:border-sky-300 hover:bg-sky-500/20"
        }`}
        onClick={copy}
        title={label}
        type="button"
      >
        {status === "copied" ? (
          <Check aria-hidden="true" size={18} strokeWidth={2.4} />
        ) : (
          <Copy aria-hidden="true" size={18} strokeWidth={2.2} />
        )}
      </button>
      {/* Bubble confirming what was copied; the live region announces the same text to screen readers. */}
      <span
        aria-live="polite"
        className={`pointer-events-none absolute right-0 bottom-full mb-2 whitespace-nowrap rounded border px-2.5 py-1.5 font-mono text-[11px] shadow-lg transition-[opacity,transform] duration-200 ${
          status === "idle" ? "translate-y-1 opacity-0" : "translate-y-0 opacity-100"
        } ${
          lastResult === "failed"
            ? "border-orange-400/50 bg-[#1e293b] text-orange-200"
            : "border-emerald-400/50 bg-[#1e293b] text-emerald-200"
        }`}
        aria-hidden={status === "idle"}
        role="status"
      >
        {lastResult === "copied" ? `Copied ${email}` : `Couldn't copy. Email: ${email}`}
      </span>
    </span>
  );
}
