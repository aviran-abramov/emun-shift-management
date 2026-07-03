import prisma from "../lib/prisma";
import { auth } from "../lib/auth";
import { createBuildingWithSlots } from "../lib/buildings/create-building-with-slots";
import { data } from "./data";

const isDemo = process.env.SEED_DEMO === "true";
const { buildings, admins, guards } = isDemo ? data.mock : data.real;

export interface SeedUser {
  firstName: string;
  lastName: string;
  username: string;
  role: "GUARD" | "MANAGER";
  password: string;
}

export interface SeedGuard extends SeedUser {
  role: "GUARD";
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

  return signUpResult.user.id;
}

async function createGuard(guard: SeedGuard) {
  const userId = await createUser(guard);

  await prisma.user.update({
    where: { id: userId },
    data: { buildings: { connect: guard.buildingIds.map((id) => ({ id })) } },
  });
}

async function main() {
  console.log(`🌱 Seeding with ${isDemo ? "MOCK" : "REAL"} data`);

  for (const building of buildings) {
    await createBuildingWithSlots(building);
  }
  console.log(`✅ Created ${buildings.length} buildings`);

  for (const admin of admins) {
    await createUser(admin);
  }
  console.log(`✅ Created ${admins.length} admins`);

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
