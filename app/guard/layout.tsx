import { MobileHeader } from "@/components/layout/mobile-header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { guardNavItems } from "@/lib/sidebar-nav";

export default function GuardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar userType="guard" navItems={guardNavItems} />
      <main className="flex-1 min-w-0">
        <MobileHeader />
        {children}
      </main>
    </SidebarProvider>
  );
}
