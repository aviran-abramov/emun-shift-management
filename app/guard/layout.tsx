import { MenuTrigger } from "@/components/layout/menu-trigger";
import { AppSidebar } from "@/components/layout/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { guardNavItems } from "@/lib/sidebar-nav";
import Image from "next/image";
import Link from "next/link";

export default function GuardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar userType="guard" navItems={guardNavItems} />
      <main className="flex-1 min-w-0">
        <div className="relative flex items-center justify-between md:hidden border-b bg-primary px-2 py-1">
          <MenuTrigger />
          <span className="absolute left-1/2 -translate-x-1/2 font-semibold">
            מוקד אמון
          </span>
          <Link href={`/guard/dashboard`}>
            <Image src="/favicon.ico" height={30} width={30} alt="emun logo" />
          </Link>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
