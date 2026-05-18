type Props = {
  html: string;
  skipHeadings?: string[];
};

export function MarkdownBody({ html, skipHeadings }: Props) {
  const cleaned = skipHeadings && skipHeadings.length > 0 ? stripHeadings(html, skipHeadings) : html;
  return (
    <div
      className="prose-resume"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: source is our own docs/ folder, sanitized at build time by marked
      dangerouslySetInnerHTML={{ __html: cleaned }}
    />
  );
}

function stripHeadings(html: string, headings: string[]): string {
  let out = html;
  for (const h of headings) {
    const re = new RegExp(`<h[1-6][^>]*>\\s*${escapeRe(h)}\\s*</h[1-6]>`, "gi");
    out = out.replace(re, "");
  }
  return out;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
