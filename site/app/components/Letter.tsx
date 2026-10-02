import { Play } from "lucide-react";

import { MarkdownBody } from "~/components/MarkdownBody";
import type { Letter as LetterEntry, LetterVideo } from "~/generated/content";

export function Letter({ letter }: { letter: LetterEntry }) {
  return (
    <section className="mt-12">
      {/* No visible header: the letter opens straight into the text. Kept for screen readers. */}
      <h2 className="sr-only">
        {letter.title}, {letter.role} at {letter.company}
      </h2>
      <div className="prose-resume max-w-2xl">
        <MarkdownBody html={letter.bodyHtml} />
      </div>
      {letter.videos.length > 0 ? (
        <div className="mt-12">
          {letter.videosHeading ? (
            <h3 className="text-lg font-medium tracking-tight">{letter.videosHeading}</h3>
          ) : null}
          {letter.videosIntro ? (
            <p className="mt-2 text-zinc-600 leading-relaxed">{letter.videosIntro}</p>
          ) : null}
          <ul className="mt-5 space-y-2">
            {letter.videos.map((video) => (
              <VideoCard key={video.url} video={video} />
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}

function VideoCard({ video }: { video: LetterVideo }) {
  return (
    <li>
      <a
        href={video.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-start gap-3 rounded-md p-2 transition hover:bg-zinc-100 sm:gap-4"
      >
        <div className="relative aspect-video w-28 shrink-0 overflow-hidden rounded-sm bg-zinc-900 sm:w-36">
          {/* hqdefault is 4:3 with letterbox bars; object-cover crops them to 16:9. */}
          <img
            src={`https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`}
            alt=""
            width={480}
            height={360}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="size-full object-cover"
          />
          <span
            aria-hidden
            className="absolute inset-0 m-auto flex size-7 items-center justify-center rounded-full bg-black/60 text-white transition group-hover:bg-red-600"
          >
            <Play size={12} className="translate-x-px" fill="currentColor" />
          </span>
        </div>
        <div className="min-w-0 py-0.5">
          <p className="line-clamp-2 text-sm font-medium leading-snug text-zinc-900 group-hover:underline underline-offset-2 decoration-zinc-300">
            {video.title}
            <span className="sr-only"> (YouTube, opens in a new tab)</span>
          </p>
          <p className="mt-0.5 text-xs text-zinc-500">{video.channel}</p>
          {video.note ? (
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-600">{video.note}</p>
          ) : null}
        </div>
      </a>
    </li>
  );
}
