import prisma from "../lib/prisma";
import type { Building } from "../app/generated/prisma/client";
import { auth } from "@/lib/auth";

const buildings: Pick<Building, "id" | "name" | "street" | "city">[] = [
  { id: "1", name: "מכון מופת", street: "שושנה פרסיץ 15", city: "תל אביב" },
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

interface User {
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  password: string;
}

const users: User[] = [
  {
    firstName: "אבירן",
    lastName: "אברמוב",
    username: "aviranabr123",
    role: "GUARD",
    password: "356985",
  },
  {
    firstName: "מיכאל",
    lastName: "זלצר",
    username: "michael636",
    role: "GUARD",
    password: "486587",
  },
  {
    firstName: "אמיר",
    lastName: "ארבל",
    username: "amir427",
    role: "GUARD",
    password: "252566",
  },
  {
    firstName: "ערן",
    lastName: "פלג",
    username: "eran943",
    role: "GUARD",
    password: "743569",
  },
  {
    firstName: "שקד",
    lastName: "ספקטור",
    username: "shakedspector",
    role: "MANAGER",
    password: "994367",
  },
];

async function createUser(user: User) {
  const signUpResult = await auth.api.signUpEmail({
    body: {
      email: `${user.username}@emun.local`,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`,
      username: user.username,
      password: user.password,
      role: user.role,
    },
  });

  await prisma.user.update({
    where: { id: signUpResult.user.id },
    data: { buildings: { connect: { id: "1" } } },
  });
}

async function main() {
  for (const building of buildings) {
    await createBuilding(building);
  }
  console.log(`✅ Created ${buildings.length} buildings`);

  for (const user of users) {
    await createUser(user);
  }
  console.log(`✅ Created ${users.length} users`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
