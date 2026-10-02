import { ArrowUpRight } from "lucide-react";

import type { Education as EducationEntry } from "~/generated/content";

export function Education({ entries }: { entries: EducationEntry[] }) {
  if (entries.length === 0) return null;
  return (
    <section id="education" className="mt-24">
      <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">Education</h2>
      <ul className="mt-8 space-y-6">
        {entries.map((e) => (
          <li key={e.slug}>
            <p className="text-lg font-medium tracking-tight">
              {e.url ? (
                <a
                  href={e.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-baseline gap-1.5 underline-offset-4 decoration-zinc-300 hover:underline"
                >
                  <span>
                    {e.degree}
                    {e.field ? <span className="text-zinc-500">, {e.field}</span> : null}
                  </span>
                  <ArrowUpRight size={14} className="text-zinc-400" aria-hidden />
                  <span className="sr-only">(programme page, opens in a new tab)</span>
                </a>
              ) : (
                <>
                  {e.degree}
                  {e.field ? <span className="text-zinc-500">, {e.field}</span> : null}
                </>
              )}
            </p>
            <p className="text-zinc-500">
              {e.institution} · {e.location}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
