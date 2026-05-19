import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionCardProps {
  children: ReactNode;
  className?: string;
}

export default function SectionCard({ children, className }: SectionCardProps) {
  return (
    <section className={cn("rounded-lg bg-[#F5F4ED] px-4 py-2", className)}>
      {children}
    </section>
  );
}
