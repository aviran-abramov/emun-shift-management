"use client";

import { CreateBuildingForm } from "@/app/admin/buildings/_components/create-building-form";
import { FormDialog } from "@/components/shared/form-dialog";
import { useState } from "react";

export function CreateBuildingDialog() {
  const [open, setOpen] = useState(false);

  return (
    <FormDialog
      buttonName="הוסף בניין"
      title="הוסף בניין"
      description="מלא את פרטי הבניין החדש"
      open={open}
      onOpenChange={setOpen}
    >
      <CreateBuildingForm onSuccess={() => setOpen(false)} />
    </FormDialog>
  );
}
