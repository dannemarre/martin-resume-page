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
              {e.degree}
              {e.field ? <span className="text-zinc-500">, {e.field}</span> : null}
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
