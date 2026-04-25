import { cn } from "@/lib/utils";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn("p-2 md:px-4 flex flex-col max-w-3xl", className)}>
      {children}
    </div>
  );
}
