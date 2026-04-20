"use client";

import { Button } from "@/components/ui/button";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import {
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Select,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function CreateAvailabilityForm() {
  return (
    <form>
      <FieldGroup>
        <Field className="max-w-28">
          <FieldLabel>יום</FieldLabel>
          <Select dir="rtl">
            <SelectTrigger>
              <SelectValue placeholder="בחר" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="ראשון">ראשון</SelectItem>
                <SelectItem value="שני">שני</SelectItem>
                <SelectItem value="שלישי">שלישי</SelectItem>
                <SelectItem value="רביעי">רביעי</SelectItem>
                <SelectItem value="חמישי">חמישי</SelectItem>
                <SelectItem value="שישי">שישי</SelectItem>
                <SelectItem value="שבת">שבת</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field className="max-w-28">
          <FieldLabel>משמרת</FieldLabel>
          <Select dir="rtl">
            <SelectTrigger>
              <SelectValue placeholder="בחר" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="MORNING">בוקר</SelectItem>
                <SelectItem value="EVENING">ערב</SelectItem>
                <SelectItem value="NIGHT">לילה</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </Field>

        <Field>
          <FieldLabel>הערות למשמרת</FieldLabel>
          <Textarea id="notes" />
        </Field>

        <Button className="self-baseline">הוסף משמרת</Button>
      </FieldGroup>
    </form>
  );
}
