import { Bio } from "~/components/Bio";
import { ConsentBanner } from "~/components/ConsentBanner";
import { ContactBlock } from "~/components/ContactBlock";
import { Education } from "~/components/Education";
import { ExperienceList } from "~/components/ExperienceList";
import { Hero } from "~/components/Hero";
import { Skills } from "~/components/Skills";
import { education, experiences, profile, skillGroups } from "~/generated/content";

export const meta = () => [
  { title: `${profile.bio.name} — ${profile.bio.headline}` },
  { name: "description", content: profile.bio.tagline },
];

export default function HomeRoute() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-20 pb-32 sm:pt-32">
      <Hero profile={profile} />
      <Bio profile={profile} />
      <ExperienceList experiences={experiences} />
      <Skills groups={skillGroups} />
      <Education entries={education} />
      <ContactBlock contact={profile.contact} />
      <ConsentBanner />
    </main>
  );
}
