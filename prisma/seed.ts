import prisma from "../lib/prisma";
import type { User, Building } from "../app/generated/prisma/client";
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

const users: Pick<User, "firstName" | "lastName" | "username" | "role">[] = [
  {
    firstName: "אבירן",
    lastName: "אברמוב",
    username: "aviranabr123",
    role: "GUARD",
  },
  {
    firstName: "מיכאל",
    lastName: "לוי",
    username: "michael636",
    role: "GUARD",
  },
  {
    firstName: "אמיר",
    lastName: "אברהם",
    username: "amir427",
    role: "GUARD",
  },
  {
    firstName: "ערן",
    lastName: "ישראלי",
    username: "eran943",
    role: "GUARD",
  },
  {
    firstName: "שקד",
    lastName: "ספקטור",
    username: "shakedspector",
    role: "MANAGER",
  },
];

async function createUser(
  user: Pick<User, "firstName" | "lastName" | "username" | "role">,
) {
  const signUpResult = await auth.api.signUpEmail({
    body: {
      email: `${user.username}@emun.local`,
      firstName: user.firstName,
      lastName: user.lastName,
      name: `${user.firstName} ${user.lastName}`,
      username: user.username,
      password: "123456",
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
