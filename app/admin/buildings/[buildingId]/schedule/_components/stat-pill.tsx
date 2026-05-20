import { cn } from "@/lib/utils";

interface StatPillProps {
  count: number;
  singularLabel: string;
  pluralLabel: string;
  className?: string;
}

export function StatPill({
  count,
  singularLabel,
  pluralLabel,
  className,
}: StatPillProps) {
  return (
    <p
      className={cn(
        "font-semibold px-2 py-1 rounded-md flex items-center gap-1",
        className,
      )}
    >
      <span>{count}</span>
      <span>{count === 1 ? singularLabel : pluralLabel}</span>
    </p>
  );
}
