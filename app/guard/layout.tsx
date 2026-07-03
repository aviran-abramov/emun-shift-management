import { MobileHeader } from "@/components/layout/mobile-header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { requireRole } from "@/lib/session";
import { guardNavItems } from "@/lib/sidebar-nav";
import { cn } from "@/lib/utils";

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
