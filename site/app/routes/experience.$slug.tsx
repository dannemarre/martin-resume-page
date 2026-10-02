import { ArrowUpRight } from "lucide-react";
import { Link, useParams } from "react-router";

import { MarkdownBody } from "~/components/MarkdownBody";
import { Badge } from "~/components/ui/badge";
import { experiences, profile } from "~/generated/content";
import { formatRange } from "~/lib/format";
import { ORIGIN, roleJsonLd } from "~/lib/seo";

export const meta = ({ params }: { params: { slug?: string } }) => {
  const exp = experiences.find((e) => e.slug === params.slug);
  if (!exp) return [{ title: `Not found | ${profile.bio.name}` }];
  const company = exp.nda ? "Confidential client" : exp.company;
  const url = `${ORIGIN}/experience/${exp.slug}`;
  // Lead with the project so several projects at one workplace still get unique titles.
  const heading = exp.projectTitle
    ? `${exp.projectTitle} · ${exp.role} at ${company}`
    : `${exp.role} at ${company}`;
  return [
    { title: `${heading} | ${profile.bio.name}` },
    { name: "description", content: exp.summary },
    { property: "og:title", content: heading },
    { property: "og:description", content: exp.summary },
    {
      "script:ld+json": roleJsonLd(exp, url),
    },
  ];
};

export default function ExperienceDetailRoute() {
  const { slug } = useParams();
  const exp = experiences.find((e) => e.slug === slug);

  if (!exp) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-32">
        <h1 className="text-3xl font-medium tracking-tight">Not found</h1>
        <p className="mt-4 text-zinc-500">
          <Link to="/" className="underline underline-offset-4">
            Back to home
          </Link>
        </p>
      </main>
    );
  }

  const company = exp.nda ? "Confidential client" : exp.company;
  const showCompanyLink = exp.companyUrl && !exp.nda;

  return (
    <main className="mx-auto max-w-2xl px-6 pt-20 pb-32 sm:pt-32">
      <Link to="/" className="text-sm text-zinc-500 underline-offset-4 hover:underline">
        ← {profile.bio.name}
      </Link>
      <header className="mt-10">
        <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
          {exp.ongoing ? <span>Since </span> : null}
          <time dateTime={exp.start}>{exp.start}</time>
          {!exp.ongoing && exp.end ? (
            <>
              <span> to </span>
              <time dateTime={exp.end}>{exp.end}</time>
            </>
          ) : null}
        </p>
        <h1 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
          {exp.role} at{" "}
          {showCompanyLink ? (
            <a
              href={exp.companyUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-zinc-200 underline-offset-[6px] hover:decoration-zinc-700"
            >
              {company}
            </a>
          ) : (
            company
          )}
        </h1>
        {exp.projectTitle ? (
          <p className="mt-2 text-zinc-500">{exp.projectTitle}</p>
        ) : null}
        <p className="mt-6 text-lg leading-relaxed text-zinc-700">{exp.summary}</p>
        <span className="sr-only">{formatRange(exp.start, exp.end, exp.ongoing)}</span>
      </header>

      <section className="mt-12 flex flex-wrap gap-1.5">
        {exp.tags.map((t) => (
          <Badge key={t}>{t}</Badge>
        ))}
      </section>

      <article className="prose-resume mt-12">
        <MarkdownBody html={exp.bodyHtml} />
      </article>

      {exp.references.length > 0 ? (
        <section aria-labelledby="references" className="mt-14 border-t border-zinc-200 pt-8">
          <h2
            id="references"
            className="text-sm font-medium uppercase tracking-wider text-zinc-500"
          >
            References
          </h2>
          <ul className="mt-4 space-y-2">
            {exp.references.map((ref) => (
              <li key={ref.url}>
                <a
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-md border border-zinc-200 bg-white p-3 transition hover:border-zinc-400"
                >
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="mt-0.5 shrink-0 text-zinc-400 transition group-hover:text-zinc-900"
                  />
                  <span className="min-w-0">
                    <span className="block text-sm font-medium text-zinc-900 group-hover:underline underline-offset-2 decoration-zinc-300">
                      {ref.title}
                    </span>
                    <span className="block text-xs text-zinc-500">
                      {new URL(ref.url).hostname.replace(/^www\./, "")}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
