import { TagCloud } from "./TagCloud";

export function Sidebar() {
  return (
    <aside className="lg:col-span-4">
      <div className="lg:sticky lg:top-20 space-y-4">
        <TagCloud />
      </div>
    </aside>
  );
}
