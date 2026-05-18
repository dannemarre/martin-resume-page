import { Link } from "react-router";

import { Badge } from "~/components/ui/badge";
import type { Experience } from "~/generated/content";
import { formatRange } from "~/lib/format";

export function ExperienceList({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="mt-24">
      <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">Experience</h2>
      <ol className="mt-8 space-y-12">
        {experiences.map((exp) => (
          <ExperienceRow key={exp.slug} exp={exp} />
        ))}
      </ol>
    </section>
  );
}

function ExperienceRow({ exp }: { exp: Experience }) {
  const company = exp.nda ? "Confidential client" : exp.company;
  return (
    <li>
      <Link
        to={`/experience/${exp.slug}`}
        className="group block focus:outline-none"
      >
        <p className="text-sm text-zinc-500">
          {formatRange(exp.start, exp.end, exp.ongoing)}
        </p>
        <h3 className="mt-2 text-xl font-medium tracking-tight group-hover:underline underline-offset-4 decoration-zinc-300">
          {exp.role} <span className="text-zinc-500 font-normal">at</span> {company}
        </h3>
        {exp.projectTitle ? (
          <p className="mt-1 text-sm text-zinc-500">{exp.projectTitle}</p>
        ) : null}
        <p className="mt-3 max-w-2xl text-zinc-700 leading-relaxed">{exp.summary}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {exp.tags.slice(0, 6).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
          {exp.tags.length > 6 ? (
            <Badge variant="ghost">+{exp.tags.length - 6}</Badge>
          ) : null}
        </div>
      </Link>
    </li>
  );
}
