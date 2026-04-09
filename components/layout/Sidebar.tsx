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
    PanelLeft,
} from "lucide-react";
import {NavItem} from "@/lib/sidebar-nav";
import {useState} from "react";
import {usePathname} from "next/navigation";

interface SidebarProps {
    navItems: NavItem[];
}

export function Sidebar({navItems}: SidebarProps) {
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => setIsOpen(prevState => !prevState);

    return isOpen ? (
        <ExpandedSidebar navItems={navItems} onToggle={toggleSidebar} />
    ) : (
        <CollapsedSidebar navItems={navItems} onToggle={toggleSidebar} />
    );
}

interface SidebarContentProps extends SidebarProps {
    onToggle: () => void;
}

function ExpandedSidebar({navItems, onToggle}: SidebarContentProps) {
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

                <button
                    onClick={onToggle}
                    className="p-2 hover:bg-gray-300 rounded-md"
                >
                    <PanelRight size={24} />
                </button>
            </div>

            <nav className="flex-1">
                <ul>
                    {navItems.map(item => (
                        <SidebarNavLink key={item.href} {...item} showLabel />
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

function CollapsedSidebar({navItems, onToggle}: SidebarContentProps) {
    return (
        <aside className="hidden md:flex md:flex-col h-screen sticky top-0 bg-[#FCFAF8] p-4 pt-6">
            <button
                onClick={onToggle}
                className="p-2 hover:bg-gray-300 rounded-md mb-5"
            >
                <PanelLeft size={24} />
            </button>

            <nav className="flex-1">
                <ul>
                    {navItems.map(item => (
                        <SidebarNavLink
                            key={item.href}
                            {...item}
                            showLabel={false}
                        />
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

const navIcons = {
    PanelsTopLeft,
    ClipboardList,
    Building2,
    Contact,
    CalendarClock,
};

interface SidebarNavLinkProps extends NavItem {
    showLabel: boolean;
}

function SidebarNavLink({label, href, icon, showLabel}: SidebarNavLinkProps) {
    const Icon = navIcons[icon];

    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <li>
            <Link
                href={href}
                className={`flex items-center gap-1.5 px-2 py-2 rounded-sm ${isActive ? "bg-[#FFEFE5]" : "hover:bg-[#FFEFE5]"}`}
            >
                <Icon className="size-6" />
                {showLabel && <span>{label}</span>}
            </Link>
        </li>
    );
}
