import {PanelsTopLeft, Building2, Contact, CalendarClock} from "lucide-react";

export const adminNavItems = [
    {label: "דשבורד", href: "/admin/dashboard", icon: PanelsTopLeft},
    {label: "משמרות", href: "/admin/shifts", icon: CalendarClock},
    {label: "שומרים", href: "/admin/guards", icon: Contact},
    {label: "בניינים", href: "/admin/buildings", icon: Building2},
];
