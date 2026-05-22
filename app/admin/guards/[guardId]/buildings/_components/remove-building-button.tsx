"use client";

import { detachBuildingFromGuard } from "@/app/admin/guards/[guardId]/buildings/actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface RemoveBuildingButtonProps {
  buildingId: string;
  guardId: string;
}

export function RemoveBuildingButton({
  buildingId,
  guardId,
}: RemoveBuildingButtonProps) {
  const handleClick = async () => {
    const result = await detachBuildingFromGuard({ buildingId, guardId });
    if (!result.success) {
      toast.error(result.error);
      return;
    }
    toast.success("הבניין הוסר בהצלחה!");
  };

  return (
    <Button type="button" variant="outline" onClick={handleClick}>
      הסר
    </Button>
  );
}
