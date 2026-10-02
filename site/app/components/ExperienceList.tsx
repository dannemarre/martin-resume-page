import { ArrowRight, ArrowUpRight, Link2 } from "lucide-react";
import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import type { Experience } from "~/generated/content";
import { formatRange } from "~/lib/format";

type Workplace = {
  key: string;
  company: string;
  companyUrl: string | null;
  start: string;
  end: string | null;
  ongoing: boolean;
  entries: Experience[];
};

/**
 * Groups experiences by workplace, keeping the incoming (already sorted)
 * order: a workplace appears where its most recent entry would. NDA entries
 * are never merged, since two confidential clients may be different companies.
 */
function groupByWorkplace(experiences: Experience[]): Workplace[] {
  const groups = new Map<string, Workplace>();
  for (const exp of experiences) {
    const key = exp.nda ? `nda:${exp.slug}` : exp.company;
    const group = groups.get(key);
    if (!group) {
      groups.set(key, {
        key,
        company: exp.nda ? "Confidential client" : exp.company,
        companyUrl: exp.nda ? null : exp.companyUrl,
        start: exp.start,
        end: exp.end,
        ongoing: exp.ongoing,
        entries: [exp],
      });
      continue;
    }
    group.entries.push(exp);
    if (exp.start < group.start) group.start = exp.start;
    if (exp.ongoing) group.ongoing = true;
    if (exp.end && (!group.end || exp.end > group.end)) group.end = exp.end;
    group.companyUrl ??= exp.companyUrl;
  }
  return [...groups.values()];
}

export function ExperienceList({ experiences }: { experiences: Experience[] }) {
  const workplaces = groupByWorkplace(experiences);
  return (
    <section id="experience" className="mt-12">
      {/* The tab label already says "Experience"; keep the heading for screen readers only. */}
      <h2 className="sr-only">Experience</h2>
      <ol className="space-y-16">
        {workplaces.map((w) => (
          <WorkplaceGroup key={w.key} workplace={w} />
        ))}
      </ol>
    </section>
  );
}

function WorkplaceGroup({ workplace: w }: { workplace: Workplace }) {
  const count = w.entries.length;
  return (
    <li>
      <header>
        <h3 className="text-2xl font-medium tracking-tight">
          {w.companyUrl ? (
            <a
              href={w.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 hover:underline underline-offset-4 decoration-zinc-300"
            >
              {w.company}
              <ArrowUpRight size={16} className="text-zinc-400" aria-hidden />
              <span className="sr-only">(company website, opens in a new tab)</span>
            </a>
          ) : (
            w.company
          )}
        </h3>
        <p className="mt-1 text-sm text-zinc-500">
          {formatRange(w.start, w.ongoing ? null : w.end, w.ongoing)}
          {count > 1 ? <span> · {count} roles &amp; projects</span> : null}
        </p>
      </header>
      <ol className="mt-5 space-y-3">
        {w.entries.map((exp) => (
          <ExperienceRow key={exp.slug} exp={exp} />
        ))}
      </ol>
    </li>
  );
}

function ExperienceRow({ exp }: { exp: Experience }) {
  return (
    <li>
      <Link
        to={`/experience/${exp.slug}`}
        className="group relative block rounded-md border border-zinc-200 bg-white p-5 pr-14 transition hover:border-zinc-400 hover:shadow-sm focus-visible:border-zinc-900"
      >
        <h4 className="text-lg font-medium tracking-tight underline-offset-4 decoration-zinc-300 group-hover:underline">
          {exp.projectTitle ?? exp.role}
        </h4>
        <span
          aria-hidden
          className="absolute top-5 right-5 flex size-8 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition group-hover:border-zinc-900 group-hover:bg-zinc-900 group-hover:text-white"
        >
          <ArrowRight size={16} className="transition group-hover:translate-x-0.5" />
        </span>
        {/* Dates live on the workplace header; each project row only names the role. */}
        {exp.projectTitle ? <p className="mt-1 text-sm text-zinc-500">{exp.role}</p> : null}
        <p className="mt-3 max-w-2xl text-zinc-700 leading-relaxed">{exp.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          {exp.tags.slice(0, 6).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
          {exp.tags.length > 6 ? <Badge variant="ghost">+{exp.tags.length - 6}</Badge> : null}
        </div>
        {exp.references.length > 0 ? (
          <p className="mt-3 flex items-center gap-1.5 text-xs text-zinc-500">
            <Link2 size={12} aria-hidden />
            {exp.references.length} {exp.references.length === 1 ? "reference" : "references"}
          </p>
        ) : null}
      </Link>
    </li>
  );
}
