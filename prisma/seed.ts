import prisma from "../lib/prisma";
import type { User } from "../app/generated/prisma/client";

const employees: Pick<User, "firstName" | "lastName" | "username" | "role">[] = [
  { firstName: "יוסי", lastName: "כהן", username: "yossicoh123", role: "GUARD" },
  { firstName: "דני", lastName: "לוי", username: "danilev456", role: "GUARD" },
  { firstName: "משה", lastName: "אברהם", username: "mosheabr789", role: "GUARD" },
  { firstName: "אבי", lastName: "ישראלי", username: "aviisr321", role: "GUARD" },
  { firstName: "רון", lastName: "דוד", username: "rondav654", role: "GUARD" },
  { firstName: "עומר", lastName: "חיים", username: "omercha987", role: "GUARD" },
  { firstName: "איתי", lastName: "שלום", username: "itaysha246", role: "GUARD" },
  { firstName: "נועם", lastName: "ברק", username: "noambar135", role: "GUARD" },
  { firstName: "גל", lastName: "מזרחי", username: "galmiz864", role: "GUARD" },
  { firstName: "תומר", lastName: "אלון", username: "tomeralo753", role: "GUARD" },
  { firstName: "שקד", lastName: "ספקטור", username: "shakedspector", role: "MANAGER" },
];

async function createEmployee(
  employee: Pick<User, "firstName" | "lastName" | "username" | "role">,
) {
  return prisma.user.create({
    data: {
      firstName: employee.firstName,
      lastName: employee.lastName,
      name: `${employee.firstName} ${employee.lastName}`,
      username: employee.username,
      password: "123456",
      role: employee.role,
    },
  });
}

async function main() {
  for (const employee of employees) {
    await createEmployee(employee);
  }

  console.log(`✅ Created ${employees.length} employees`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
