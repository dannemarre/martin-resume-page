/**
 * Reads docs/*.md (ground truth), parses frontmatter + body, validates, sorts,
 * and writes site/app/generated/content.ts.
 *
 * Run via `pnpm content` (also wired as `predev` and `prebuild`).
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

marked.setOptions({ gfm: true, breaks: false });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "../..");
const DOCS = path.join(REPO_ROOT, "docs");
const OUT = path.join(REPO_ROOT, "site/app/generated/content.ts");

type Frontmatter = Record<string, unknown>;

type Experience = {
  slug: string;
  role: string;
  company: string;
  companyUrl: string | null;
  projectTitle: string | null;
  industry: string;
  start: string;
  end: string | null;
  ongoing: boolean;
  nda: boolean;
  featured: boolean;
  tags: string[];
  summary: string;
  bodyHtml: string;
  bodyMarkdown: string;
};

type Education = {
  slug: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  bodyHtml: string;
};

type Profile = {
  bio: {
    name: string;
    headline: string;
    subhead: string;
    location: string;
    employerOfRecord: string | null;
    tagline: string;
    bodyHtml: string;
  };
  identity: {
    roles: string[];
    industries: string[];
    location: string;
    availableFor: string[];
  };
  contact: {
    email: string | null;
    linkedin: string;
    github: string | null;
  };
};

type SkillGroup = { name: string; items: string[] };

function readMarkdown(file: string): { data: Frontmatter; content: string } {
  const raw = readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { data: data as Frontmatter, content: content.trim() };
}

function listMd(dir: string): string[] {
  return readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(dir, f));
}

function require<T>(value: unknown, where: string): T {
  if (value === undefined || value === null) {
    throw new Error(`Missing required field in ${where}`);
  }
  return value as T;
}

function asString(value: unknown, where: string): string {
  if (typeof value !== "string") throw new Error(`Expected string in ${where}, got ${typeof value}`);
  return value;
}

function asStringOrNull(value: unknown): string | null {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") return null;
  return value;
}

function asBool(value: unknown, fallback = false): boolean {
  if (typeof value === "boolean") return value;
  return fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((v): v is string => typeof v === "string");
}

function normalizePlaceholder(value: string | null, marker: string): string | null {
  if (value === null) return null;
  if (value === marker) return null;
  return value;
}

function buildExperiences(): Experience[] {
  const dir = path.join(DOCS, "experience");
  const items = listMd(dir).map((file): Experience => {
    const { data, content } = readMarkdown(file);
    return {
      slug: asString(require(data.slug, file), file),
      role: asString(require(data.role, file), file),
      company: asString(require(data.company, file), file),
      companyUrl: asStringOrNull(data.companyUrl),
      projectTitle: asStringOrNull(data.projectTitle),
      industry: asString(require(data.industry, file), file),
      start: asString(require(data.start, file), file),
      end: asStringOrNull(data.end),
      ongoing: asBool(data.ongoing),
      nda: asBool(data.nda),
      featured: asBool(data.featured),
      tags: asStringArray(data.tags),
      summary: asString(require(data.summary, file), file),
      bodyHtml: marked.parse(content) as string,
      bodyMarkdown: content,
    };
  });

  // Sort: ongoing first (start desc), then ended (end desc, start desc)
  return items.sort((a, b) => {
    if (a.ongoing !== b.ongoing) return a.ongoing ? -1 : 1;
    if (a.ongoing && b.ongoing) return b.start.localeCompare(a.start);
    const aEnd = a.end ?? a.start;
    const bEnd = b.end ?? b.start;
    if (aEnd !== bEnd) return bEnd.localeCompare(aEnd);
    return b.start.localeCompare(a.start);
  });
}

function buildProfile(): Profile {
  const bioRaw = readMarkdown(path.join(DOCS, "profile/bio.md"));
  const identityRaw = readMarkdown(path.join(DOCS, "profile/identity.md"));
  const contactRaw = readMarkdown(path.join(DOCS, "profile/contact.md"));

  const identityBody = identityRaw.content;
  const roles = extractListUnderHeading(identityBody, "Roles");
  const industries = extractListUnderHeading(identityBody, "Industries");

  return {
    bio: {
      name: asString(require(bioRaw.data.name, "bio.md"), "bio.md"),
      headline: asString(require(bioRaw.data.headline, "bio.md"), "bio.md"),
      subhead: asString(require(bioRaw.data.subhead, "bio.md"), "bio.md"),
      location: asString(require(bioRaw.data.location, "bio.md"), "bio.md"),
      employerOfRecord: asStringOrNull(bioRaw.data.employerOfRecord),
      tagline: asString(require(bioRaw.data.tagline, "bio.md"), "bio.md"),
      bodyHtml: marked.parse(bioRaw.content) as string,
    },
    identity: {
      roles,
      industries,
      location: asString(require(identityRaw.data.location, "identity.md"), "identity.md"),
      availableFor: (asString(require(identityRaw.data.availableFor, "identity.md"), "identity.md"))
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    },
    contact: {
      email: normalizePlaceholder(asStringOrNull(contactRaw.data.email), "EMAIL_TBD"),
      linkedin: asString(require(contactRaw.data.linkedin, "contact.md"), "contact.md"),
      github: normalizePlaceholder(asStringOrNull(contactRaw.data.github), "GITHUB_TBD"),
    },
  };
}

function extractListUnderHeading(markdown: string, heading: string): string[] {
  const lines = markdown.split("\n");
  const startIdx = lines.findIndex((l) => l.replace(/^#+\s*/, "").trim() === heading);
  if (startIdx === -1) return [];
  const items: string[] = [];
  for (let i = startIdx + 1; i < lines.length; i++) {
    const line = lines[i];
    if (/^#{1,6}\s/.test(line)) break;
    const m = line.match(/^[-*]\s+(.+)/);
    if (m) items.push(m[1].trim());
  }
  return items;
}

function buildEducation(): Education[] {
  const dir = path.join(DOCS, "education");
  return listMd(dir).map((file) => {
    const { data, content } = readMarkdown(file);
    return {
      slug: asString(require(data.slug, file), file),
      degree: asString(require(data.degree, file), file),
      field: asString(require(data.field, file), file),
      institution: asString(require(data.institution, file), file),
      location: asString(require(data.location, file), file),
      bodyHtml: marked.parse(content) as string,
    };
  });
}

function buildSkillGroups(): SkillGroup[] {
  const file = path.join(DOCS, "skills/technologies.md");
  const { content } = readMarkdown(file);
  const groups: SkillGroup[] = [];
  let current: SkillGroup | null = null;
  for (const line of content.split("\n")) {
    const heading = line.match(/^##\s+(.+)/);
    if (heading) {
      if (current) groups.push(current);
      current = { name: heading[1].trim(), items: [] };
      continue;
    }
    const item = line.match(/^[-*]\s+(.+)/);
    if (item && current) current.items.push(item[1].trim());
  }
  if (current) groups.push(current);
  return groups;
}

function buildLlmsTxt(
  profile: Profile,
  experiences: Experience[],
  education: Education[],
  origin: string,
): string {
  // Concise index per the llms.txt convention. Designed to fit in a short context.
  const lines: string[] = [];
  lines.push(`# ${profile.bio.name}`);
  lines.push("");
  lines.push(`> ${profile.bio.headline}${profile.bio.subhead ? ` (${profile.bio.subhead})` : ""} based in ${profile.bio.location}. ${profile.bio.tagline}`);
  lines.push("");
  lines.push("## Facts");
  lines.push("");
  lines.push(`- Name: ${profile.bio.name}`);
  lines.push(`- Role: ${profile.bio.headline}`);
  lines.push(`- Location: ${profile.bio.location}`);
  if (profile.bio.employerOfRecord) lines.push(`- Employer (consulting): ${profile.bio.employerOfRecord}`);
  if (profile.contact.linkedin) lines.push(`- LinkedIn: ${profile.contact.linkedin}`);
  if (profile.contact.github) lines.push(`- GitHub: ${profile.contact.github}`);
  if (profile.contact.email) lines.push(`- Email: ${profile.contact.email}`);
  lines.push(`- Canonical site: ${origin}/`);
  lines.push(`- Full content: ${origin}/llms-full.txt`);
  lines.push("");
  lines.push("## Experience");
  lines.push("");
  for (const exp of experiences) {
    const company = exp.nda ? "Confidential client" : exp.company;
    const dates = exp.ongoing ? `${exp.start} – ongoing` : `${exp.start} – ${exp.end}`;
    lines.push(`- [${exp.role} at ${company} (${dates})](${origin}/experience/${exp.slug}): ${exp.summary}`);
  }
  lines.push("");
  lines.push("## Education");
  lines.push("");
  for (const e of education) {
    lines.push(`- ${e.degree}${e.field ? `, ${e.field}` : ""} at ${e.institution}`);
  }
  return `${lines.join("\n")}\n`;
}

function buildLlmsFullTxt(
  profile: Profile,
  experiences: Experience[],
  education: Education[],
  origin: string,
): string {
  // Full agent-readable digest with full bodies. Designed for retrieval / deep grounding.
  const lines: string[] = [];
  lines.push(`# ${profile.bio.name} — ${profile.bio.headline}`);
  lines.push("");
  lines.push(profile.bio.tagline);
  lines.push("");
  lines.push(`Location: ${profile.bio.location}`);
  if (profile.bio.employerOfRecord) lines.push(`Employer of record: ${profile.bio.employerOfRecord}`);
  if (profile.contact.linkedin) lines.push(`LinkedIn: ${profile.contact.linkedin}`);
  if (profile.contact.github) lines.push(`GitHub: ${profile.contact.github}`);
  if (profile.contact.email) lines.push(`Email: ${profile.contact.email}`);
  lines.push(`Canonical site: ${origin}/`);
  lines.push("");
  lines.push("## About");
  lines.push("");
  lines.push(profile.bio.tagline);
  lines.push("");
  // Bio body is HTML — strip tags for plain text
  lines.push(htmlToText(profile.bio.bodyHtml));
  lines.push("");
  lines.push("## Experience");
  lines.push("");
  for (const exp of experiences) {
    const company = exp.nda ? "Confidential client" : exp.company;
    const dates = exp.ongoing ? `${exp.start} – ongoing` : `${exp.start} – ${exp.end}`;
    lines.push(`### ${exp.role} at ${company}`);
    lines.push("");
    lines.push(`- Dates: ${dates}`);
    lines.push(`- Industry: ${exp.industry}`);
    if (exp.companyUrl) lines.push(`- Company URL: ${exp.companyUrl}`);
    if (exp.projectTitle) lines.push(`- Project: ${exp.projectTitle}`);
    lines.push(`- Tags: ${exp.tags.join(", ")}`);
    lines.push(`- Page: ${origin}/experience/${exp.slug}`);
    lines.push("");
    lines.push(exp.bodyMarkdown);
    lines.push("");
  }
  lines.push("## Education");
  lines.push("");
  for (const e of education) {
    lines.push(`### ${e.degree}${e.field ? `, ${e.field}` : ""}`);
    lines.push("");
    lines.push(`- Institution: ${e.institution}`);
    lines.push(`- Location: ${e.location}`);
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

function htmlToText(html: string): string {
  // Lightweight: strip tags, collapse whitespace. Good enough for llms-full.txt.
  return html
    .replace(/<\/(p|h[1-6]|li|ul|ol)>/gi, "\n\n")
    .replace(/<li[^>]*>/gi, "- ")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function buildSitemapXml(experiences: Experience[], origin: string): string {
  const today = new Date().toISOString().slice(0, 10);
  const urls = ["/", ...experiences.map((e) => `/experience/${e.slug}`)];
  const body = urls
    .map(
      (u) =>
        `  <url><loc>${origin}${u}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq></url>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

function buildRobotsTxt(origin: string): string {
  // Default: allow everything. Then list each major AI agent explicitly so that
  // future opt-out-by-default policies keep us indexed. List sourced from the
  // ai-robots-txt registry + OpenAI/Anthropic/Google/Perplexity/Mistral docs.
  const aiAgents = [
    // Search engines (traditional) — already covered by User-agent: * but listing the
    // big ones helps with crawl-budget visibility in Search Console.
    "Googlebot",
    "Bingbot",
    "DuckDuckBot",
    "Applebot",
    // AI training + AI search crawlers. Agent-specific tokens.
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "anthropic-ai",
    "PerplexityBot",
    "Perplexity-User",
    "MistralAI-User",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Meta-ExternalAgent",
    "cohere-ai",
    "YouBot",
    "BraveBot",
    "Kagibot",
    "Phindbot",
  ];
  const agentGroup = aiAgents.map((ua) => `User-agent: ${ua}`).join("\n");
  return `# robots.txt for ${origin}
# Default: everyone is welcome.

User-agent: *
Allow: /

# Explicit allows for major search + AI agents. Listed by name so future
# opt-out-by-default policies preserve indexing.
${agentGroup}
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
}

function buildSecurityTxt(profile: Profile): string {
  // .well-known/security.txt per RFC 9116. Expires is snapped to Dec 31 of next
  // year (stable across the whole current calendar year, advances once on Jan 1)
  // so the file doesn't drift on every build. RFC 9116 recommends < 1 year out;
  // this can land at ~12 months early in the year and ~24 months late — within
  // common practice.
  const nextYearEnd = new Date(
    Date.UTC(new Date().getUTCFullYear() + 1, 11, 31, 23, 59, 59),
  );
  const contact = profile.contact.email
    ? `mailto:${profile.contact.email}`
    : profile.contact.linkedin;
  return `Contact: ${contact}
Expires: ${nextYearEnd.toISOString()}
Preferred-Languages: en, sv
`;
}

function emit(
  experiences: Experience[],
  profile: Profile,
  education: Education[],
  skills: SkillGroup[],
): string {
  const stringify = (v: unknown) => JSON.stringify(v, null, 2);
  return `// AUTO-GENERATED by site/scripts/build-content.ts from /docs/*.md
// Do not edit by hand. Run \`pnpm content\` to regenerate.

export type Experience = {
  slug: string;
  role: string;
  company: string;
  companyUrl: string | null;
  projectTitle: string | null;
  industry: string;
  start: string;
  end: string | null;
  ongoing: boolean;
  nda: boolean;
  featured: boolean;
  tags: string[];
  summary: string;
  bodyHtml: string;
  bodyMarkdown: string;
};

export type Education = {
  slug: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  bodyHtml: string;
};

export type Profile = {
  bio: {
    name: string;
    headline: string;
    subhead: string;
    location: string;
    employerOfRecord: string | null;
    tagline: string;
    bodyHtml: string;
  };
  identity: {
    roles: string[];
    industries: string[];
    location: string;
    availableFor: string[];
  };
  contact: {
    email: string | null;
    linkedin: string;
    github: string | null;
  };
};

export type SkillGroup = { name: string; items: string[] };

export const experiences: Experience[] = ${stringify(experiences)};

export const profile: Profile = ${stringify(profile)};

export const education: Education[] = ${stringify(education)};

export const skillGroups: SkillGroup[] = ${stringify(skills)};
`;
}

function main() {
  const experiences = buildExperiences();
  const profile = buildProfile();
  const education = buildEducation();
  const skills = buildSkillGroups();

  // Default origin used in generated artifacts. Override with SITE_ORIGIN at build time once domain is known.
  const origin = process.env.SITE_ORIGIN ?? "https://martin-dannelind-7f7f0.web.app";

  // Ensure .well-known directory exists before writing into it.
  const wellKnownDir = path.join(REPO_ROOT, "site/public/.well-known");
  if (!existsSync(wellKnownDir)) mkdirSync(wellKnownDir, { recursive: true });

  writeFileSync(OUT, emit(experiences, profile, education, skills), "utf8");
  writeFileSync(path.join(REPO_ROOT, "site/public/llms.txt"), buildLlmsTxt(profile, experiences, education, origin), "utf8");
  writeFileSync(path.join(REPO_ROOT, "site/public/llms-full.txt"), buildLlmsFullTxt(profile, experiences, education, origin), "utf8");
  writeFileSync(path.join(REPO_ROOT, "site/public/sitemap.xml"), buildSitemapXml(experiences, origin), "utf8");
  writeFileSync(path.join(REPO_ROOT, "site/public/robots.txt"), buildRobotsTxt(origin), "utf8");
  writeFileSync(path.join(wellKnownDir, "security.txt"), buildSecurityTxt(profile), "utf8");

  console.log(
    `[build-content] wrote ${experiences.length} experiences, ${education.length} education entries, ${skills.length} skill groups`,
  );
  console.log(`[build-content] origin: ${origin}`);
}

main();
