import { MobileHeader } from "@/components/layout/mobile-header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { requireRole } from "@/lib/session";
import { adminNavItems } from "@/lib/sidebar-nav";
import { cn } from "@/lib/utils";

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
      <main
        className={cn(
          "flex-1 min-w-0",
          process.env.NEXT_PUBLIC_IS_DEMO === "true" && "pt-10",
        )}
      >
        <MobileHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
