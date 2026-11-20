"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { navigateToSection } from "@/lib/section-navigation";

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function SectionLink({ href, onClick, ...props }: SectionLinkProps) {
  return (
    <Link
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (navigateToSection(href)) event.preventDefault();
      }}
    />
  );
}
