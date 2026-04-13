import { Sidebar } from "@/components/layout/Sidebar";
import { adminNavItems } from "@/lib/sidebar-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar userType="admin" navItems={adminNavItems} />
      <main className="flex-1 min-w-0">{children}</main>
    </div>
  );
}
