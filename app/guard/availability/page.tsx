import CreateAvailabilityForm from "@/app/guard/_components/create-availability-form";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";

export default function GuardAvailabilityPage() {
  const availability = [];

  return (
    <PageContainer>
      <div className="flex flex-col gap-4">
        <PageTitle title="הגשת משמרות" />

        <section className="flex flex-col gap-2 rounded-lg border p-4 shadow-sm">
          <h2 className="text-lg font-bold">הוסף משמרת</h2>
          <CreateAvailabilityForm />
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
