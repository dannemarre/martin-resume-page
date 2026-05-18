import type { Profile } from "~/generated/content";

export function Hero({ profile }: { profile: Profile }) {
  return (
    <section className="border-b border-zinc-100 pb-16">
      <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
        {profile.bio.headline}
        {profile.bio.subhead ? <span className="text-zinc-300"> · </span> : null}
        {profile.bio.subhead}
      </p>
      <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
        {profile.bio.name}
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-700">
        {profile.bio.tagline}
      </p>
      <p className="mt-6 text-sm text-zinc-500">{profile.bio.location}</p>
    </section>
  );
}
