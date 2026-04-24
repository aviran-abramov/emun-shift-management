import { MobileHeader } from "@/components/layout/mobile-header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { adminNavItems } from "@/lib/sidebar-nav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar userType="admin" navItems={adminNavItems} />
      <main className="flex-1 min-w-0">
        <MobileHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
