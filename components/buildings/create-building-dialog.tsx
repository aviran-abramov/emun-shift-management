import { CreateBuildingForm } from "@/components/buildings/create-building-form";
import { FormDialog } from "@/components/shared/form-dialog";

export function CreateBuildingDialog() {
  return (
    <FormDialog
      buttonName="הוסף בניין"
      title="הוסף בניין"
      description="מלא את פרטי הבניין החדש"
    >
      <CreateBuildingForm />
    </FormDialog>
  );
}
