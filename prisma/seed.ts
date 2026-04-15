import prisma from "../lib/prisma";
import type { User, Building } from "../app/generated/prisma/client";

const buildings: Pick<Building, "name" | "street" | "city">[] = [
  { name: "מגדל אלקטרה", street: "רוטשילד 22", city: "תל אביב" },
  { name: "בית אמות", street: "ז'בוטינסקי 7", city: "תל אביב" },
  { name: "מגדל משה אביב", street: "ז'בוטינסקי 7", city: "רמת גן" },
  { name: "מגדלי עזריאלי", street: "דרך מנחם בגין 132", city: "תל אביב" },
  { name: "מגדל שלום", street: "אחד העם 9", city: "תל אביב" },
  { name: "מתחם שבעת הכוכבים", street: "אבא אבן 10", city: "הרצליה" },
  { name: "מגדל ויטה", street: "הסדנאות 3", city: "הרצליה" },
  { name: "בית הדר דפנה", street: "הנחושת 4", city: "תל אביב" },
  { name: "מגדל אלרוב", street: "ויצמן 2", city: "תל אביב" },
  { name: "מגדל רוטשילד", street: "רוטשילד 46", city: "תל אביב" },
  { name: "בית אמריקה", street: "המרד 25", city: "תל אביב" },
  { name: "מגדל דיסקונט", street: "יהודה הלוי 23", city: "תל אביב" },
  { name: "בית קלקא", street: "ויצמן 14", city: "תל אביב" },
  { name: "מגדל גיבור ספורט", street: "מנחם בגין 7", city: "רמת גן" },
  { name: "מגדל אמות ביטוח", street: "ויצמן 48", city: "תל אביב" },
  { name: "בית אפריקה ישראל", street: "דרך החורש 4", city: "יהוד" },
  { name: "מגדל הכשרת הישוב", street: "דרך מנחם בגין 9", city: "רמת גן" },
  { name: "מגדל צ'מפיון", street: "הברזל 38", city: "תל אביב" },
  { name: "בית אוסישקין", street: "ארלוזורוב 17", city: "תל אביב" },
  { name: "מגדל אלון", street: "אבן גבירול 54", city: "תל אביב" },
  { name: "בית גיבור", street: "מנחם בגין 11", city: "רמת גן" },
  { name: "מגדל לוינשטיין", street: "ויצמן 23", city: "תל אביב" },
];

async function createBuilding(
  building: Pick<Building, "name" | "street" | "city">,
) {
  return prisma.building.create({
    data: {
      name: building.name,
      street: building.street,
      city: building.city,
    },
  });
}

const employees: Pick<User, "firstName" | "lastName" | "username" | "role">[] =
  [
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
      firstName: "רון",
      lastName: "דוד",
      username: "rondav654",
      role: "GUARD",
    },
    {
      firstName: "עומר",
      lastName: "חיים",
      username: "omercha987",
      role: "GUARD",
    },
    {
      firstName: "איתי",
      lastName: "שלום",
      username: "itaysha246",
      role: "GUARD",
    },
    {
      firstName: "נועם",
      lastName: "ברק",
      username: "noambar135",
      role: "GUARD",
    },
    {
      firstName: "גל",
      lastName: "מזרחי",
      username: "galmiz864",
      role: "GUARD",
    },
    {
      firstName: "תומר",
      lastName: "אלון",
      username: "tomeralo753",
      role: "GUARD",
    },
    {
      firstName: "שקד",
      lastName: "ספקטור",
      username: "shakedspector",
      role: "MANAGER",
    },
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
  for (const building of buildings) {
    await createBuilding(building);
  }
  console.log(`✅ Created ${buildings.length} buildings`);

  for (const employee of employees) {
    await createEmployee(employee);
  }
  console.log(`✅ Created ${employees.length} employees`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
