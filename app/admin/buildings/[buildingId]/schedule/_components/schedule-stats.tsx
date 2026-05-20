import { StatPill } from "@/app/admin/buildings/[buildingId]/schedule/_components/stat-pill";

interface ScheduleStatsProps {
  activeGuardsCount: number;
  emptyShiftsCount: number;
  notSubmittedGuardsCount: number;
  weeklyNotesCount: number;
}

export function ScheduleStats({
  activeGuardsCount,
  emptyShiftsCount,
  notSubmittedGuardsCount,
  weeklyNotesCount,
}: ScheduleStatsProps) {
  return (
    <section className="flex flex-col gap-3">
      <StatPill
        count={activeGuardsCount}
        singularLabel="שומר פעיל"
        pluralLabel="שומרים פעילים"
        className="bg-[#e1f3de] text-[#27500A] self-start"
      />

      <div className="flex items-center gap-2 text-sm">
        {emptyShiftsCount > 0 && (
          <StatPill
            count={emptyShiftsCount}
            singularLabel="משמרת חסרה"
            pluralLabel="משמרות חסרות"
            className="bg-[#F7ECEC] text-[#7F2C28]"
          />
        )}

        {notSubmittedGuardsCount > 0 && (
          <StatPill
            count={notSubmittedGuardsCount}
            singularLabel="לא הגיש"
            pluralLabel="לא הגישו"
            className="bg-[#F6EEDF] text-[#5A4815]"
          />
        )}

        {weeklyNotesCount > 0 && (
          <StatPill
            count={weeklyNotesCount}
            singularLabel="הערה כללית"
            pluralLabel="הערות כלליות"
            className="bg-[#D6E4F6] text-[#3266AD]"
          />
        )}
      </div>
    </section>
  );
}
