import { Link, useParams } from "react-router";

import { MarkdownBody } from "~/components/MarkdownBody";
import { Badge } from "~/components/ui/badge";
import { experiences, profile } from "~/generated/content";
import { formatRange } from "~/lib/format";
import { ORIGIN, roleJsonLd } from "~/lib/seo";

export const meta = ({ params }: { params: { slug?: string } }) => {
  const exp = experiences.find((e) => e.slug === params.slug);
  if (!exp) return [{ title: `Not found — ${profile.bio.name}` }];
  const company = exp.nda ? "Confidential client" : exp.company;
  const url = `${ORIGIN}/experience/${exp.slug}`;
  return [
    { title: `${exp.role} at ${company} — ${profile.bio.name}` },
    { name: "description", content: exp.summary },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:title", content: `${exp.role} at ${company}` },
    { property: "og:description", content: exp.summary },
    { property: "og:url", content: url },
    { property: "og:type", content: "article" },
    { property: "og:image", content: `${ORIGIN}/og-image.svg` },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: `${ORIGIN}/og-image.svg` },
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
          <time dateTime={exp.start}>{exp.start}</time>
          {exp.ongoing ? (
            <>
              <span> — </span>
              <span>ongoing</span>
            </>
          ) : exp.end ? (
            <>
              <span> — </span>
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
    </main>
  );
}
