"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();
  const mounted = useRef(false);
  const request = useRef(0);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      clearTimeout(resetTimer.current);
    };
  }, []);

  const copyEmail = async () => {
    const currentRequest = ++request.current;
    clearTimeout(resetTimer.current);
    setStatus("idle");
    try {
      await navigator.clipboard.writeText(email);
      if (!mounted.current || currentRequest !== request.current) return;
      setStatus("copied");
      resetTimer.current = setTimeout(() => setStatus("idle"), 2000);
    } catch {
      if (mounted.current && currentRequest === request.current) setStatus("error");
    }
  };

  return (
    <div className="mt-5">
      <button type="button" onClick={copyEmail}
        className="focus-ring inline-flex min-h-11 items-center gap-3 border border-white/20 px-4 py-2 text-sm font-semibold text-muted transition-colors hover:border-sky hover:text-sky">
        {status === "copied" ? <Check aria-hidden size={17} /> : <Copy aria-hidden size={17} />}
        <span>{status === "copied" ? "Copied" : "Copy email"}</span>
      </button>
      <span role="status" aria-live="polite" className={status === "error" ? "mt-3 block text-sm text-gold" : "sr-only"}>
        {status === "copied" ? "Email address copied." : status === "error" ? "Could not copy. Please select the email address above." : ""}
      </span>
    </div>
  );
}
