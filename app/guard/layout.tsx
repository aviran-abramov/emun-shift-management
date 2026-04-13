import { Sidebar } from "@/components/layout/Sidebar";
import { guardNavItems } from "@/lib/sidebar-nav";

export default function GuardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar userType="guard" navItems={guardNavItems} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
