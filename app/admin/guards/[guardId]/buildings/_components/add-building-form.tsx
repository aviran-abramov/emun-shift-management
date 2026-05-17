"use client";

import { addBuilding } from "@/app/admin/guards/[guardId]/buildings/actions";
import { Building } from "@/app/generated/prisma/client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { AddBuildingFormData, AddBuildingSchema } from "@/lib/validators/guard";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddBuildingFormProps {
  guardId: string;
  buildings: Building[];
}

export default function AddBuildingForm({
  guardId,
  buildings,
}: AddBuildingFormProps) {
  const form = useForm<AddBuildingFormData>({
    resolver: zodResolver(AddBuildingSchema),
    defaultValues: {
      guardId,
      buildingId: "",
    },
  });

  const onSubmit = async (data: AddBuildingFormData) => {
    const result = await addBuilding(data);
    if (result.success) {
      form.reset();
      toast.success("הבניין נוסף בהצלחה!");
    } else {
      form.setError("root", { message: result.error });
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <Controller
        name="buildingId"
        control={form.control}
        render={({ field }) => (
          <Field className="max-w-40">
            <FieldLabel>שם הבניין</FieldLabel>
            <Select
              dir="rtl"
              value={field.value}
              onValueChange={field.onChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="בחר בניין"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>שם הבניין</SelectLabel>
                  {buildings.map((building) => (
                    <SelectItem key={building.id} value={building.id}>
                      {building.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        )}
      />

      <Button type="submit">הוסף</Button>
    </form>
  );
}
