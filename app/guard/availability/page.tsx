import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function GuardAvailabilityPage() {
  const availability = [];

  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <PageTitle title="הגשת משמרות" />

        <section className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm">
          <h2 className="text-lg font-bold">הוסף משמרת</h2>
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
        </section>

        <section className="rounded-lg border p-4 shadow-sm">
          <h2 className="text-lg font-bold">המשמרות שהגשתי</h2>
          {availability.length !== 0 ? (
            <ul>
              <li>ראשון בוקר</li>
            </ul>
          ) : (
            <p className="text-muted-foreground">
              לא הוגשו עדיין משמרות לשבוע הבא
            </p>
          )}
        </section>
      </div>
    </PageContainer>
  );
}
