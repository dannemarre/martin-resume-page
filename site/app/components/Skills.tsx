import { Badge } from "~/components/ui/badge";
import type { SkillGroup } from "~/generated/content";

export function Skills({ groups }: { groups: SkillGroup[] }) {
  return (
    <section id="skills" className="mt-24">
      <h2 className="text-sm font-medium uppercase tracking-wider text-zinc-500">Toolbelt</h2>
      <div className="mt-8 space-y-8">
        {groups.map((g) => (
          <div key={g.name}>
            <h3 className="text-sm font-medium text-zinc-700">{g.name}</h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
