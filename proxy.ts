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
  runtime: "nodejs", // Required for auth.api calls
  matcher: ["/admin/:path*", "/guard/:path*"], // Specify the routes the middleware applies to
};
