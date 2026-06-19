import { UserRole } from "@/app/generated/prisma/enums";
import { SectionTitle } from "@/components/layout/section-title";
import { Button } from "@/components/ui/button";
import { DEFAULT_PATHS } from "@/lib/paths";
import { requireSession } from "@/lib/session";
import Link from "next/link";

export default async function ForbiddenPage() {
  const session = await requireSession();

  const role = session.user.role as UserRole;
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
