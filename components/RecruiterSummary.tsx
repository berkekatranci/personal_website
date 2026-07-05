import { CheckCircle2 } from "lucide-react";
import { recruiterSummary } from "@/data/profile";

export function RecruiterSummary() {
  return (
    <div className="surface-card p-6">
      <p className="eyebrow">Recruiter Summary</p>
      <ul className="mt-5 grid gap-4">
        {recruiterSummary.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-7 text-muted">
            <CheckCircle2
              aria-hidden
              className="mt-1 shrink-0 text-mint"
              size={18}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
