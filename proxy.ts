import { Role } from "@/app/generated/prisma/enums";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const role = session.user.role as Role;
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    if (role === "MANAGER")
      return NextResponse.redirect(new URL("/admin", request.url));
    if (role === "GUARD")
      return NextResponse.redirect(new URL("/guard", request.url));
  }

  if (pathname.startsWith("/admin") && role !== "MANAGER") {
    return NextResponse.rewrite(new URL("/forbidden", request.url), {
      status: 403,
    });
  }

  if (pathname.startsWith("/guard") && role !== "GUARD") {
    return NextResponse.rewrite(new URL("/forbidden", request.url), {
      status: 403,
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/guard/:path*"],
};
