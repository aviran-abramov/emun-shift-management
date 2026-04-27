import { cn } from "@/lib/utils";

interface PageTitleProps {
  title: string;
  count?: number;
  className?: string;
}

export function PageTitle({ title, count, className }: PageTitleProps) {
  return (
    <h1 className={cn("text-4xl font-bold", className)}>
      {title} {count !== undefined && `(${count})`}
    </h1>
  );
}
