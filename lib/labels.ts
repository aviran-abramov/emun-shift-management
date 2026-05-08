import { DayOfWeek, ShiftType } from "@/app/generated/prisma/enums";

export const DAY_LABELS: Record<DayOfWeek, string> = {
  SUNDAY: "ראשון",
  MONDAY: "שני",
  TUESDAY: "שלישי",
  WEDNESDAY: "רביעי",
  THURSDAY: "חמישי",
  FRIDAY: "שישי",
  SATURDAY: "שבת",
};

export const DAY_LABELS_SHORT: Record<DayOfWeek, string> = {
  SUNDAY: "א׳",
  MONDAY: "ב׳",
  TUESDAY: "ג׳",
  WEDNESDAY: "ד׳",
  THURSDAY: "ה׳",
  FRIDAY: "ו׳",
  SATURDAY: "ש׳",
};

export const SHIFT_LABELS: Record<ShiftType, string> = {
  MORNING: "בוקר",
  EVENING: "ערב",
  NIGHT: "לילה",
};
