import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import type { Metadata } from "next";
import { PageTitle } from "@/components/layout/page-title";
import SignInForm from "@/app/(auth)/sign-in/_components/sign-in-form";

export const metadata: Metadata = { title: "התחברות" };

export default function SignInPage() {
  return (
    <Card className="w-full max-w-sm shadow-md">
      <CardHeader className="flex flex-col items-center">
        <PageTitle title="התחברות" />
        <CardDescription>מערכת לניהול משמרות</CardDescription>
      </CardHeader>

      <SignInForm />
    </Card>
  );
}
