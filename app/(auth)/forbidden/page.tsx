import { Role } from "@/app/generated/prisma/enums";
import { SectionTitle } from "@/components/layout/section-title";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { DEFAULT_PATHS } from "@/lib/paths";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ForbiddenPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  const role = session.user.role as Role;
  const href = DEFAULT_PATHS[role];

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <SectionTitle>אין גישה</SectionTitle>
        <p>העמוד שביקשת זמין רק למשתמשים מורשים.</p>
      </div>
      <Button variant="outline" asChild>
        <Link href={href}>חזרה לדשבורד</Link>
      </Button>
    </div>
  );
}
