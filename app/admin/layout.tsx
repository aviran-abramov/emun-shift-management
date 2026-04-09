import {Sidebar} from "@/components/layout/Sidebar";
import {adminNavItems} from "@/lib/sidebar-nav";

export default function AdminLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex min-h-screen">
            <Sidebar navItems={adminNavItems} />
            <main className="flex-1">{children}</main>
        </div>
    );
}
