export type IconName =
  | "PanelsTopLeft"
  | "ClipboardList"
  | "Building2"
  | "Contact"
  | "CalendarClock";

export type NavItem = {
  label: string;
  href: string;
  icon: IconName;
};

export const adminNavItems: NavItem[] = [
  // { label: "דשבורד", href: "/admin/dashboard", icon: "PanelsTopLeft" },
  { label: "סידורי עבודה", href: "/admin/schedule", icon: "ClipboardList" },
  // { label: "המשמרות שלי", href: "/admin/my-shifts", icon: "CalendarClock" },
  { label: "שומרים", href: "/admin/guards", icon: "Contact" },
  { label: "בניינים", href: "/admin/buildings", icon: "Building2" },
];

export const guardNavItems: NavItem[] = [
  // { label: "פרטים אישיים", href: "/guard/personal-info", icon: "Contact" },
  { label: "הגשת משמרות", href: "/guard/availability", icon: "ClipboardList" },
  // { label: "המשמרות שלי", href: "/guard/my-shifts", icon: "CalendarClock" },
  // { label: "הבניינים שלי", href: "/guard/buildings", icon: "Building2" },
];
