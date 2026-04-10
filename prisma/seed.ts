import prisma from "../lib/prisma";
import type {User, Building} from "../app/generated/prisma/client";

const buildings: Pick<Building, "name" | "street" | "city">[] = [
    {name: "מגדל אלקטרה", street: "רוטשילד 22", city: "תל אביב"},
    {name: "בית אמות", street: "ז'בוטינסקי 7", city: "תל אביב"},
    {name: "מתחם שבעת הכוכבים", street: "אבא אבן 10", city: "הרצליה"},
    {name: "מגדל ויטה", street: "הסדנאות 3", city: "הרצליה"},
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
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
