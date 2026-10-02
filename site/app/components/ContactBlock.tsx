import { ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";

import type { Profile } from "~/generated/content";

const linkClass =
  "inline-flex max-w-full min-w-0 items-center gap-2 whitespace-nowrap text-zinc-900 underline-offset-4 decoration-zinc-300 hover:underline";

export function ContactBlock({ contact }: { contact: Profile["contact"] }) {
  return (
    <section
      id="contact"
      aria-label="Contact"
      className="mt-10 grid gap-y-6 rounded-lg border border-zinc-200 bg-white p-6"
    >
      <ContactGroup title="Email">
        {contact.emails.map((e) => (
          <ContactRow key={e.address} label={e.label}>
            <a href={`mailto:${e.address}`} className={linkClass}>
              <Mail size={14} className="shrink-0 text-zinc-400" />
              <span className="truncate">{e.address}</span>
            </a>
          </ContactRow>
        ))}
      </ContactGroup>
      <ContactGroup title="Phone & profiles">
        {contact.phone ? (
          <ContactRow label="Phone">
            <a href={`tel:${contact.phone.replace(/\s+/g, "")}`} className={linkClass}>
              <Phone size={14} className="shrink-0 text-zinc-400" />
              {contact.phone}
            </a>
          </ContactRow>
        ) : null}
        <ContactRow label="LinkedIn">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
            <Linkedin size={14} className="shrink-0 text-zinc-400" />
            Profile
            <ArrowUpRight size={12} className="text-zinc-400" />
          </a>
        </ContactRow>
        {contact.github ? (
          <ContactRow label="GitHub">
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className={linkClass}>
              <Github size={14} className="shrink-0 text-zinc-400" />
              {contact.github.replace(/^https?:\/\/(www\.)?github\.com\//, "")}
              <ArrowUpRight size={12} className="text-zinc-400" />
            </a>
          </ContactRow>
        ) : null}
      </ContactGroup>
    </section>
  );
}

function ContactGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <h2 className="text-xs font-medium uppercase tracking-wider text-zinc-500">{title}</h2>
      <dl className="mt-3 grid grid-cols-1 gap-x-5 text-sm sm:grid-cols-[8rem_minmax(0,1fr)] sm:items-center sm:gap-y-2">
        {children}
      </dl>
    </div>
  );
}

function ContactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="contents">
      <dt className="text-xs text-zinc-500 sm:text-sm">{label}</dt>
      <dd className="mb-3 min-w-0 last:mb-0 sm:mb-0">{children}</dd>
    </div>
  );
}
