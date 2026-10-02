import { type ReactNode, useEffect, useState } from "react";

import { cn } from "~/lib/utils";

export type ResumeTab = { id: string; label: string; content: ReactNode };

/**
 * One-page tab switcher. Every panel is rendered into the prerendered HTML
 * (inactive ones are `hidden`), so crawlers and LLM readers still see all
 * content. The active tab is mirrored to the URL hash so tabs are linkable.
 */
export function ResumeTabs({ tabs }: { tabs: ResumeTab[] }) {
  const [active, setActive] = useState(tabs[0]?.id);

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (tabs.some((t) => t.id === id)) setActive(id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [tabs]);

  const select = (id: string) => {
    setActive(id);
    window.history.replaceState(null, "", id === tabs[0]?.id ? " " : `#${id}`);
  };

  return (
    <div className="mt-16">
      <div role="tablist" aria-label="Sections" className="flex border-b border-zinc-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={active === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => select(t.id)}
            className={cn(
              // Equal-width segments: each tab owns 1/n of the line, and the active one fills its whole segment.
              "-mb-px min-w-0 flex-1 basis-0 whitespace-nowrap border-b-2 pb-3 text-center text-[0.9375rem] font-medium transition-colors sm:text-[1.0625rem]",
              active === t.id
                ? "border-zinc-900 text-zinc-900"
                : "border-transparent text-zinc-500 hover:text-zinc-800",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`panel-${t.id}`}
          aria-labelledby={`tab-${t.id}`}
          hidden={active !== t.id}
        >
          {t.content}
        </div>
      ))}
    </div>
  );
}
