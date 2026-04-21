import prisma from "../lib/prisma";
import type { User, Building } from "../app/generated/prisma/client";
import { auth } from "@/lib/auth";

const buildings: Pick<Building, "id" | "name" | "street" | "city">[] = [
  { id: "1", name: "מכון מופת", street: "שושנה פרסיץ 15", city: "תל אביב" },
  { id: "2", name: "בית אמות", street: "ז'בוטינסקי 7", city: "תל אביב" },
  { id: "3", name: "מגדל משה אביב", street: "ז'בוטינסקי 7", city: "רמת גן" },
  {
    id: "4",
    name: "מגדלי עזריאלי",
    street: "דרך מנחם בגין 132",
    city: "תל אביב",
  },
];

async function createBuilding(
  building: Pick<Building, "id" | "name" | "street" | "city">,
) {
  return prisma.building.create({
    data: {
      id: building.id,
      name: building.name,
      street: building.street,
      city: building.city,
    },
  });
}

const guards: Pick<User, "firstName" | "lastName" | "username" | "role">[] = [
  {
    firstName: "יוסי",
    lastName: "כהן",
    username: "yossicoh123",
    role: "GUARD",
  },
  {
    firstName: "דני",
    lastName: "לוי",
    username: "danilev456",
    role: "GUARD",
  },
  {
    firstName: "משה",
    lastName: "אברהם",
    username: "mosheabr789",
    role: "GUARD",
  },
  {
    firstName: "אבי",
    lastName: "ישראלי",
    username: "aviisr321",
    role: "GUARD",
  },
  {
    firstName: "עומר",
    lastName: "חיים",
    username: "omercha987",
    role: "GUARD",
  },
  {
    firstName: "שקד",
    lastName: "אריאל",
    username: "shakedari123",
    role: "MANAGER",
  },
];

async function createGuard(
  guard: Pick<User, "firstName" | "lastName" | "username" | "role">,
) {
  const buildingId = String(Math.floor(Math.random() * buildings.length) + 1);

  const signUpResult = await auth.api.signUpEmail({
    body: {
      email: `${guard.username}@emun.local`,
      firstName: guard.firstName,
      lastName: guard.lastName,
      name: `${guard.firstName} ${guard.lastName}`,
      username: guard.username,
      password: "123456",
      role: guard.role,
    },
  });

  await prisma.user.update({
    where: { id: signUpResult.user.id },
    data: { buildings: { connect: { id: buildingId } } },
  });
}

async function main() {
  for (const building of buildings) {
    await createBuilding(building);
  }
  console.log(`✅ Created ${buildings.length} buildings`);

  for (const guard of guards) {
    await createGuard(guard);
  }
  console.log(`✅ Created ${guards.length} guards`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
