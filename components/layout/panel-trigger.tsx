import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { PanelRight, PanelLeft } from "lucide-react";

export function PanelTrigger({ className }: { className?: string }) {
  const { toggleSidebar, state } = useSidebar();
  const Icon = state === "expanded" ? PanelRight : PanelLeft;
  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-10 [&_svg]:size-6!", className)}
      onClick={toggleSidebar}
      aria-label="Toggle sidebar"
    >
      <Icon />
    </Button>
  );
}
