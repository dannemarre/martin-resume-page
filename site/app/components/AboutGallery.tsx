import * as Dialog from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  type TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import type { GalleryItem } from "~/generated/content";
import { cn } from "~/lib/utils";

// Collage cells. `grid-flow-dense` back-fills gaps, so order + tile sizes in
// docs/profile/bio.md decide the final arrangement on both 2- and 3-column grids.
const tileClass: Record<GalleryItem["tile"], string> = {
  big: "col-span-2 row-span-2",
  wide: "col-span-2",
  tall: "row-span-2",
  small: "",
};

/**
 * Personal photos and silent clips for the About me tab, packed edge-to-edge as
 * a collage. No captions on screen; every tile keeps descriptive alt text.
 * Pressing a tile opens it full size in a lightbox with prev/next navigation.
 */
export function AboutGallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  if (items.length === 0) return null;
  return (
    <>
      <ul
        aria-label="Photos"
        className="mt-12 grid grid-flow-dense auto-rows-[10rem] grid-cols-2 gap-1.5 overflow-hidden rounded-lg sm:grid-cols-3"
      >
        {items.map((item, i) => (
          <li key={item.src} className={cn("bg-zinc-100", tileClass[item.tile])}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Expand: ${item.alt}`}
              className="group block size-full cursor-zoom-in overflow-hidden focus-visible:outline-offset-[-3px]"
            >
              <Media
                item={item}
                className="size-full object-cover transition duration-300 group-hover:scale-[1.03]"
              />
            </button>
          </li>
        ))}
      </ul>
      <Lightbox items={items} index={open} onIndexChange={setOpen} />
    </>
  );
}

function Lightbox({
  items,
  index,
  onIndexChange,
}: {
  items: GalleryItem[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
}) {
  const touchX = useRef<number | null>(null);
  const item = index === null ? null : items[index];
  const step = (delta: number) => {
    if (index === null) return;
    onIndexChange((index + delta + items.length) % items.length);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  };
  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    const start = touchX.current;
    const end = e.changedTouches[0]?.clientX;
    touchX.current = null;
    if (start === null || end === undefined || Math.abs(end - start) < 50) return;
    step(end < start ? 1 : -1);
  };

  return (
    <Dialog.Root open={item !== null} onOpenChange={(o) => !o && onIndexChange(null)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-zinc-950/90 backdrop-blur-sm" />
        <Dialog.Content
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-describedby={undefined}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 outline-none sm:p-10"
          onClick={(e) => {
            // Clicking the dark area around the media closes the lightbox.
            if (e.target === e.currentTarget) onIndexChange(null);
          }}
        >
          {item ? (
            <>
              <Dialog.Title className="sr-only">{item.alt}</Dialog.Title>
              <Media
                key={item.src}
                item={item}
                eager
                className="max-h-full max-w-full rounded-md object-contain shadow-2xl"
              />
              <p className="absolute top-5 left-5 text-sm text-white/70 tabular-nums">
                {(index ?? 0) + 1} / {items.length}
              </p>
              <Dialog.Close
                aria-label="Close"
                className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition hover:bg-black/70"
              >
                <X size={20} />
              </Dialog.Close>
              {items.length > 1 ? (
                <>
                  <NavButton side="left" label="Previous" onClick={() => step(-1)}>
                    <ChevronLeft size={22} />
                  </NavButton>
                  <NavButton side="right" label="Next" onClick={() => step(1)}>
                    <ChevronRight size={22} />
                  </NavButton>
                </>
              ) : null}
            </>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function NavButton({
  side,
  label,
  onClick,
  children,
}: {
  side: "left" | "right";
  label: string;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition hover:bg-black/70",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      {children}
    </button>
  );
}

/** A gallery image or silent looping clip; `eager` is for the lightbox view. */
function Media({
  item,
  className,
  eager = false,
}: {
  item: GalleryItem;
  className: string;
  eager?: boolean;
}) {
  const style = !eager && item.focus ? { objectPosition: item.focus } : undefined;
  if (item.type === "video") return <Clip item={item} className={className} style={style} />;
  return (
    <img
      src={item.src}
      alt={item.alt}
      width={item.width}
      height={item.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      className={className}
      style={style}
    />
  );
}

function Clip({
  item,
  className,
  style,
}: {
  item: GalleryItem;
  className: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  // Muted, looping ambient clip that plays only while on screen. Browsers pause video in a
  // hidden tab panel, so a play() at mount (while the About tab is closed) never starts it;
  // an IntersectionObserver starts it when it scrolls or tabs into view. Respects
  // reduced-motion by staying on its poster.
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const sync = () => {
      if (visible && !reduce.matches) void video.play().catch(() => {});
      else video.pause();
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        sync();
      },
      { threshold: 0.25 },
    );
    observer.observe(video);
    reduce.addEventListener("change", sync);
    return () => {
      observer.disconnect();
      reduce.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={item.src}
      poster={item.poster ?? undefined}
      width={item.width}
      height={item.height}
      aria-label={item.alt}
      muted
      loop
      playsInline
      preload="metadata"
      className={className}
      style={style}
    />
  );
}
