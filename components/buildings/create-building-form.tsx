"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function CreateBuildingForm() {
  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Field>
          <FieldLabel htmlFor="name" className="px-1">
            שם הבניין
          </FieldLabel>
          <Input type="text" id="name" />
        </Field>

        <Field>
          <FieldLabel htmlFor="street" className="px-1">
            רחוב
          </FieldLabel>
          <Input type="text" id="street" />
        </Field>

        <Field>
          <FieldLabel htmlFor="city" className="px-1">
            עיר
          </FieldLabel>
          <Input type="text" id="city" />
        </Field>
      </div>

      <div className="flex flex-col items-center border-t py-4 gap-2">
        <Button type="submit" className="self-stretch">
          הוסף
        </Button>

        <Button
          type="reset"
          variant="outline"
          className="self-stretch border-primary"
        >
          איפוס טופס
        </Button>
      </div>
    </form>
  );
}
