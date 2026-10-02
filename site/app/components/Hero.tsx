import type { CSSProperties } from "react";

import type { Profile } from "~/generated/content";

export function Hero({ profile }: { profile: Profile }) {
  const { bio } = profile;
  return (
    <section>
      {bio.headshot ? <HeroBanner bio={bio} /> : <HeroText bio={bio} />}
      {bio.intro ? (
        <p className="mt-8 leading-relaxed text-pretty text-zinc-600">{bio.intro}</p>
      ) : null}
    </section>
  );
}

/**
 * Photo banner with the name and tagline.
 *
 * From `sm` up the photo sits flush left and the backdrop is extended to the right by
 * repeating a 1px strip taken from the photo's own right edge, stretched to the banner
 * height so each row lines up with the photo; the name and tagline sit in that area in
 * white. On phones there is no room beside the photo, so the photo stands alone and the
 * text sits below it in normal colours. One <h1> either way, restyled per breakpoint.
 */
function HeroBanner({ bio }: { bio: Profile["bio"] }) {
  const style = {
    "--hero-bg": bio.headshotBackground ?? "#18181b",
    "--hero-backdrop": bio.headshotBackdrop ? `url(${bio.headshotBackdrop})` : "none",
  } as CSSProperties;
  return (
    <div
      className="sm:flex sm:h-80 sm:overflow-hidden sm:rounded-lg sm:bg-[var(--hero-bg)] sm:bg-repeat-x sm:[background-image:var(--hero-backdrop)] sm:[background-size:1px_100%]"
      style={style}
    >
      <img
        src={bio.headshot ?? undefined}
        alt={`Portrait of ${bio.name}`}
        width={512}
        height={512}
        className="aspect-square w-full rounded-lg object-cover sm:h-full sm:w-auto sm:shrink-0 sm:rounded-none sm:[mask-image:linear-gradient(to_right,black_96%,transparent)]"
      />
      <div className="mt-8 sm:mt-0 sm:flex sm:flex-1 sm:flex-col sm:justify-center sm:py-8 sm:pr-10 sm:pl-4">
        <h1 className="text-4xl font-medium tracking-tight sm:text-white">{bio.name}</h1>
        <p className="mt-4 text-xl leading-snug text-balance text-zinc-900 sm:text-lg sm:text-white/80">
          {bio.tagline}
        </p>
      </div>
    </div>
  );
}

function HeroText({ bio }: { bio: Profile["bio"] }) {
  return (
    <>
      <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">{bio.name}</h1>
      <p className="mt-6 text-xl leading-snug text-balance text-zinc-900">{bio.tagline}</p>
    </>
  );
}
