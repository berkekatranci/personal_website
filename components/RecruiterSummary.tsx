import Link from "next/link";
import { AboutFocus } from "@/components/AboutInteractions";
import { recruiterSummary } from "@/data/profile";

export function RecruiterSummary() {
  return (
    <aside className="border-l border-sky/40 pl-6 lg:pl-8">
      <p className="eyebrow">Recruiter Summary</p>
      <AboutFocus />
      <ul className="mt-7 border-t border-white/10">
        {recruiterSummary.map((item, index) => (
          <li
            key={item}
            className="text-row grid grid-cols-[2rem_minmax(0,1fr)] gap-3 border-b border-white/10 py-5 text-base leading-8 text-muted"
          >
            <span className="font-mono text-[10px] text-mint">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link
        href="/#contact"
        className="focus-ring mt-6 inline-flex min-h-11 items-center border-b border-sky text-sm font-semibold text-text transition-colors hover:text-sky"
      >
        Contact Me
      </Link>
    </aside>
  );
}
