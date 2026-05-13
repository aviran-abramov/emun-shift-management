interface ScheduleStatsProps {
  emptyShiftsCount: number;
  notSubmittedGuardsCount: number;
  weeklyNotesCount: number;
}

export function ScheduleStats({
  emptyShiftsCount,
  notSubmittedGuardsCount,
  weeklyNotesCount,
}: ScheduleStatsProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {emptyShiftsCount > 0 && (
        <p className="bg-[#F7ECEC] text-[#7F2C28] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
          <span>{emptyShiftsCount}</span>
          <span>{emptyShiftsCount > 1 ? "משמרות חסרות" : "משמרת חסרה"}</span>
        </p>
      )}

      {notSubmittedGuardsCount > 0 && (
        <p className="bg-[#F6EEDF] text-[#5A4815] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
          <span>{notSubmittedGuardsCount}</span>
          <span>לא הגיש{notSubmittedGuardsCount > 1 ? "ו" : ""}</span>
        </p>
      )}

      {weeklyNotesCount > 0 && (
        <p className="bg-[#D6E4F6] text-[#3266AD] font-semibold px-2 py-1 rounded-md flex items-center gap-1">
          <span>{weeklyNotesCount}</span>
          <span>{weeklyNotesCount > 1 ? "הערות כלליות" : "הערה כללית"}</span>
        </p>
      )}
    </div>
  );
}
