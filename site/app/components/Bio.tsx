import { MarkdownBody } from "~/components/MarkdownBody";
import type { Profile } from "~/generated/content";

export function Bio({ profile }: { profile: Profile }) {
  return (
    <section className="mt-20">
      <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">About</h2>
      <div className="prose-resume mt-6 max-w-2xl">
        <MarkdownBody html={profile.bio.bodyHtml} />
      </div>
    </section>
  );
}
