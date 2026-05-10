import { MobileHeader } from "@/components/layout/mobile-header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { requireRole } from "@/lib/session";
import { adminNavItems } from "@/lib/sidebar-nav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole("MANAGER");

  return (
    <SidebarProvider>
      <AppSidebar
        userFirstName={session.user.firstName}
        userType="admin"
        navItems={adminNavItems}
      />
      <main className="flex-1 min-w-0">
        <MobileHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
