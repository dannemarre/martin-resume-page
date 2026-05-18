import { Github, Linkedin, Mail } from "lucide-react";

import type { Profile } from "~/generated/content";

export function ContactBlock({ contact }: { contact: Profile["contact"] }) {
  return (
    <section id="contact" className="mt-24 border-t border-zinc-100 pt-12">
      <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">Contact</h2>
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
        {contact.email ? (
          <li>
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 text-zinc-900 hover:underline underline-offset-4"
            >
              <Mail size={16} />
              {contact.email}
            </a>
          </li>
        ) : null}
        <li>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-zinc-900 hover:underline underline-offset-4"
          >
            <Linkedin size={16} />
            LinkedIn
          </a>
        </li>
        {contact.github ? (
          <li>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-zinc-900 hover:underline underline-offset-4"
            >
              <Github size={16} />
              GitHub
            </a>
          </li>
        ) : null}
      </ul>
    </section>
  );
}
