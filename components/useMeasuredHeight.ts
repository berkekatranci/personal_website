"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

const useClientLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function useMeasuredHeight() {
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useClientLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const measure = () => setContentHeight(content.getBoundingClientRect().height);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  return { contentRef, contentHeight };
}
