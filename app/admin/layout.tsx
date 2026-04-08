import {Badge} from "@/components/ui/badge";
import {adminNavItems} from "@/lib/sidebar-nav";
import Link from "next/link";

export default function AdminLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1">{children}</main>
        </div>
    );
}

function Sidebar() {
    return (
        <aside className="hidden md:block bg-[#FCFAF8] w-72 p-4">
            <div className="flex items-center justify-between px-2 py-2 mb-3 border-b">
                <p className="font-semibold">שקד</p>
                <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    מנהל
                </Badge>
            </div>

            <nav>
                <ul>
                    {adminNavItems.map(item => (
                        <SidebarNavItem key={item.href} {...item} />
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

interface SidebarNavItemProps {
    label: string;
    href: string;
    icon: React.ComponentType<{className?: string}>;
}

function SidebarNavItem({label, href, icon: Icon}: SidebarNavItemProps) {
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
