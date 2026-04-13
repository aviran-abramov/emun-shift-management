import { Metadata } from "next";
import { columns, Guard } from "./columns";
import prisma from "@/lib/prisma";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { PageContainer } from "@/components/layout/page-container";
import { PageTitle } from "@/components/layout/page-title";

export const metadata: Metadata = { title: "שומרים" };

async function getGuards(): Promise<Guard[]> {
  return await prisma.user.findMany({
    select: {
      id: true,
      isActive: true,
      firstName: true,
      lastName: true,
      username: true,
      createdAt: true,
    },
  });
}

export default async function GuardsPage() {
  const guards = await getGuards();

  return (
    <PageContainer>
      <section>
        <PageTitle title="רשימת שומרים" count={guards.length} />
        <DataTable columns={columns} data={guards} />
      </section>

      <section>
        <Card className="w-full max-w-sm shadow-md">
          <CardHeader className="flex flex-col items-center">
            <h2 className="text-2xl font-bold">הוסף שומר</h2>
          </CardHeader>

          <form className="flex flex-col gap-4">
            <CardContent className="flex flex-col">
              <Field>
                <FieldLabel htmlFor="firstName" className="px-1">
                  שם פרטי
                </FieldLabel>
                <Input type="text" id="firstName" />
              </Field>

              <Field>
                <FieldLabel htmlFor="lastName" className="px-1">
                  שם משפחה
                </FieldLabel>
                <Input type="text" id="lastName" />
              </Field>

              <Field>
                <FieldLabel htmlFor="username" className="px-1">
                  שם משתמש
                </FieldLabel>
                <Input type="text" id="username" />
              </Field>

              <Field>
                <FieldLabel htmlFor="password" className="px-1">
                  סיסמה
                </FieldLabel>
                <Input type="password" id="password" />
              </Field>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-2">
              <Button type="submit" className="self-stretch">
                הוסף
              </Button>
              <Button
                type="reset"
                variant={"outline"}
                className="self-stretch border-primary"
              >
                איפוס טופס
              </Button>
            </CardFooter>
          </form>
        </Card>
      </section>
    </PageContainer>
  );
}
