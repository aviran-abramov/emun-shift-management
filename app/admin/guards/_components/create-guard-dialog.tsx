"use client";

import { CreateGuardForm } from "@/app/admin/guards/_components/create-guard-form";
import { FormDialog } from "@/components/shared/form-dialog";
import { useState } from "react";

export function CreateGuardDialog() {
  const [open, setOpen] = useState(false);

  return (
    <FormDialog
      buttonName="הוסף שומר"
      title="הוסף שומר"
      description="מלא את פרטי השומר החדש"
      open={open}
      onOpenChange={setOpen}
    >
      <CreateGuardForm onSuccess={() => setOpen(false)} />
    </FormDialog>
  );
}
