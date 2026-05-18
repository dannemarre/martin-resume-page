import type { Experience } from "~/generated/content";
import { education, experiences, profile } from "~/generated/content";

export const ORIGIN: string =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_ORIGIN) ||
  "https://martin-dannelind-7f7f0.web.app";

export function personJsonLd() {
  const sameAs: string[] = [];
  if (profile.contact.linkedin) sameAs.push(profile.contact.linkedin);
  if (profile.contact.github) sameAs.push(profile.contact.github);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${ORIGIN}/#person`,
    name: profile.bio.name,
    url: `${ORIGIN}/`,
    jobTitle: profile.bio.headline,
    description: profile.bio.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.bio.location,
    },
    sameAs,
    alumniOf: education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
    })),
    hasOccupation: experiences.map((exp) => ({
      "@type": "Role",
      roleName: exp.role,
      startDate: quarterToISO(exp.start, "start"),
      endDate: exp.ongoing ? undefined : exp.end ? quarterToISO(exp.end, "end") : undefined,
      worksFor: exp.nda
        ? undefined
        : {
            "@type": "Organization",
            name: exp.company,
            url: exp.companyUrl ?? undefined,
          },
      url: `${ORIGIN}/experience/${exp.slug}`,
    })),
    knowsAbout: uniqueTags(experiences),
  };
}

export function roleJsonLd(exp: Experience, canonicalUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Role",
    "@id": canonicalUrl,
    roleName: exp.role,
    description: exp.summary,
    startDate: quarterToISO(exp.start, "start"),
    endDate: exp.ongoing ? undefined : exp.end ? quarterToISO(exp.end, "end") : undefined,
    url: canonicalUrl,
    member: {
      "@id": `${ORIGIN}/#person`,
      "@type": "Person",
      name: profile.bio.name,
    },
    worksFor: exp.nda
      ? undefined
      : {
          "@type": "Organization",
          name: exp.company,
          url: exp.companyUrl ?? undefined,
        },
    skills: exp.tags.join(", "),
    industry: exp.industry,
  };
}

function uniqueTags(items: Experience[]): string[] {
  const set = new Set<string>();
  for (const item of items) for (const t of item.tags) set.add(t);
  return Array.from(set).slice(0, 50);
}

function quarterToISO(q: string, edge: "start" | "end"): string | undefined {
  const m = q.match(/^(\d{4})-Q([1-4])$/);
  if (!m) {
    // Plain YYYY value (e.g. education years)
    const y = q.match(/^(\d{4})$/);
    if (y) return edge === "start" ? `${y[1]}-01-01` : `${y[1]}-12-31`;
    return undefined;
  }
  const year = m[1];
  const quarter = Number(m[2]);
  const startMonth = (quarter - 1) * 3 + 1;
  const endMonth = quarter * 3;
  const month = edge === "start" ? startMonth : endMonth;
  const day = edge === "start" ? 1 : monthEnd(Number(year), endMonth);
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function monthEnd(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}
