import { Role } from "@/app/generated/prisma/enums";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function ForbiddenPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const role = session?.user.role as Role | undefined;

  const dashboardHref =
    role === "GUARD" ? "/guard/dashboard" : "/admin/dashboard";

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex flex-col items-center gap-1">
        <h2>אין גישה</h2>
        <p>העמוד שביקשת זמין רק למשתמשים מורשים.</p>
      </div>
      <Button variant="outline" asChild>
        {session ? (
          <Link href={dashboardHref}>חזרה לדשבורד</Link>
        ) : (
          <Link href="/sign-in">עבור לדף ההתחברות</Link>
        )}
      </Button>
    </div>
  );
}
