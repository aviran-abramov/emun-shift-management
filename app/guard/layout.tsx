import { MobileHeader } from "@/components/layout/mobile-header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { requireRole } from "@/lib/session";
import { guardNavItems } from "@/lib/sidebar-nav";

export default async function GuardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireRole("GUARD");

  return (
    <SidebarProvider>
      <AppSidebar
        userFirstName={session.user.firstName}
        userType="guard"
        navItems={guardNavItems}
      />
      <main className="flex-1 min-w-0">
        <MobileHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
