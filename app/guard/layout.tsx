import { MobileHeader } from "@/components/layout/mobile-header";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { guardNavItems } from "@/lib/sidebar-nav";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function GuardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

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
