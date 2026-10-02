import { Bio } from "~/components/Bio";
import { ConsentBanner } from "~/components/ConsentBanner";
import { ContactBlock } from "~/components/ContactBlock";
import { Education } from "~/components/Education";
import { ExperienceList } from "~/components/ExperienceList";
import { Hero } from "~/components/Hero";
import { Letter } from "~/components/Letter";
import { type ResumeTab, ResumeTabs } from "~/components/ResumeTabs";
import { Skills } from "~/components/Skills";
import { education, experiences, letter, profile, skillGroups } from "~/generated/content";
import { profilePageJsonLd, websiteJsonLd } from "~/lib/seo";

export const meta = () => [
  { title: `${profile.bio.name} | ${profile.bio.headline}` },
  { name: "description", content: profile.bio.tagline },
  { property: "og:title", content: `${profile.bio.name} | ${profile.bio.headline}` },
  { property: "og:description", content: profile.bio.tagline },
  { "script:ld+json": profilePageJsonLd() },
  { "script:ld+json": websiteJsonLd() },
];

const tabs: ResumeTab[] = [
  {
    id: "experience",
    label: "Experience",
    content: (
      <>
        <ExperienceList experiences={experiences} />
        <Education entries={education} />
        <Skills groups={skillGroups} />
      </>
    ),
  },
  { id: "about", label: "About me", content: <Bio profile={profile} /> },
  // A letter marked `draft: true` is only shown in the dev server, never in a production build.
  ...(letter && (!letter.draft || import.meta.env.DEV)
    ? [{ id: "letter", label: "Personal letter", content: <Letter letter={letter} /> }]
    : []),
];

export default function HomeRoute() {
  return (
    <main className="mx-auto max-w-3xl px-6 pt-10 pb-32 sm:pt-16 lg:px-12">
      <Hero profile={profile} />
      <ContactBlock contact={profile.contact} />
      <ResumeTabs tabs={tabs} />
      <ConsentBanner />
    </main>
  );
}
