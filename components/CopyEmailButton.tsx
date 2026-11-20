"use client";

import { Check, Copy } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<"idle" | "copying" | "copied" | "error">("idle");
  const resetTimer = useRef<ReturnType<typeof setTimeout>>();
  const mounted = useRef(false);
  const request = useRef(0);
  const reducedMotion = useReducedMotion();
  const transition = { duration: reducedMotion ? 0 : 0.16, ease: [0.22, 1, 0.36, 1] as const };

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
    setStatus("copying");
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
      <motion.button type="button" onClick={copyEmail} disabled={status === "copying"}
        aria-busy={status === "copying"} whileTap={reducedMotion ? undefined : { scale: 0.98 }} transition={transition}
        className="focus-ring inline-flex min-h-11 w-40 items-center justify-center border border-white/20 px-4 py-2 text-sm font-semibold text-muted transition-colors duration-[160ms] hover:border-sky hover:text-sky active:border-sky active:bg-sky/10 disabled:opacity-70">
        <motion.span key={status} className="inline-flex items-center gap-3"
          initial={reducedMotion ? false : { opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={transition}>
          {status === "copied" ? <Check aria-hidden size={17} /> : <Copy aria-hidden size={17} />}
          <span>{status === "copied" ? "Copied" : status === "copying" ? "Copying…" : "Copy email"}</span>
        </motion.span>
      </motion.button>
      <span role="status" aria-live="polite" className={status === "error" ? "mt-3 block text-sm text-gold" : "sr-only"}>
        {status === "copied" ? "Email address copied." : status === "error" ? "Could not copy. Please select the email address above." : ""}
      </span>
    </div>
  );
}
