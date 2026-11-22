"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

/** Icon button that copies the email address, for visitors whose mailto links do nothing. */
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

  const label =
    status === "copied" ? "Email address copied" : status === "failed" ? "Copy failed" : "Copy email address";

  return (
    <button
      aria-label={label}
      className={`flex min-h-12 w-12 shrink-0 items-center justify-center rounded border transition-[background,border-color,color,transform] duration-[180ms] hover:-translate-y-0.5 ${
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
      <span aria-live="polite" className="sr-only">
        {status === "copied" ? "Email address copied to clipboard" : status === "failed" ? "Could not copy the email address" : ""}
      </span>
    </button>
  );
}
