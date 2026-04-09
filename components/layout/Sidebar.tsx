"use client";

import Image from "next/image";
import {Badge} from "../ui/badge";
import Link from "next/link";
import {
    PanelRight,
    PanelsTopLeft,
    ClipboardList,
    Building2,
    Contact,
    CalendarClock,
} from "lucide-react";
import {NavItem} from "@/lib/sidebar-nav";

interface SidebarProps {
    navItems: NavItem[];
}

export function Sidebar({navItems}: SidebarProps) {
    return (
        <aside className="hidden md:flex md:flex-col h-screen sticky top-0 bg-[#FCFAF8] w-72 p-4">
            <div className="flex items-center justify-between pt-2 py-4">
                <div className="p-2 hover:bg-gray-300 rounded-md cursor-pointer">
                    <Image
                        src="/favicon.ico"
                        height={30}
                        width={30}
                        alt="emun logo"
                    />
                </div>

                <div className="cursor-pointer p-2 hover:bg-gray-300 rounded-md">
                    <PanelRight size={24} />
                </div>
            </div>

            <nav className="flex-1">
                <ul>
                    {navItems.map(item => (
                        <SidebarNavLink key={item.href} {...item} />
                    ))}
                </ul>
            </nav>

            <div className="flex items-center justify-between px-2 py-4 border-t">
                <p className="font-semibold">שקד</p>
                <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    מנהל
                </Badge>
            </div>
        </aside>
    );
}

const icons = {PanelsTopLeft, ClipboardList, Building2, Contact, CalendarClock};

function SidebarNavLink({label, href, icon}: NavItem) {
    const Icon = icons[icon];

    return (
        <li>
            <Link
                href={href}
                className="flex items-center gap-1.5 px-2 py-2 rounded-sm hover:bg-[#FFEFE5]"
            >
                <Icon className="size-6" />
                <span>{label}</span>
            </Link>
        </li>
    );
}
