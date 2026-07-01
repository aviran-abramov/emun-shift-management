import prisma from "../lib/prisma";
import { auth } from "@/lib/auth";
import { createBuildingWithSlots } from "@/lib/buildings/create-building-with-slots";
import { buildings, admins, guards } from "./data";

export interface SeedUser {
  firstName: string;
  lastName: string;
  username: string;
  role: "GUARD" | "MANAGER";
  password: string;
  buildingIds: string[];
}

async function createUser(user: SeedUser) {
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
    data: { buildings: { connect: user.buildingIds.map((id) => ({ id })) } },
  });
}

async function main() {
  for (const building of buildings) {
    await createBuildingWithSlots(building);
  }
  console.log(`✅ Created ${buildings.length} buildings`);

  for (const admin of admins) {
    await createUser(admin);
  }
  console.log(`✅ Created ${admins.length} admins`);

  for (const guard of guards) {
    await createUser(guard);
  }
  console.log(`✅ Created ${guards.length} guards`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
