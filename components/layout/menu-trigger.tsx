"use client";

import { AlignJustify } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function MenuTrigger({ className }: { className?: string }) {
  const { toggleSidebar } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-12 [&_svg]:size-8!", className)}
      onClick={toggleSidebar}
    >
      <AlignJustify />
    </Button>
  );
}
