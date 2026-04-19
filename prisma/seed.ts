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
  { id: "5", name: "מגדל שלום", street: "אחד העם 9", city: "תל אביב" },
  { id: "6", name: "מתחם שבעת הכוכבים", street: "אבא אבן 10", city: "הרצליה" },
  { id: "7", name: "מגדל ויטה", street: "הסדנאות 3", city: "הרצליה" },
  { id: "8", name: "בית הדר דפנה", street: "הנחושת 4", city: "תל אביב" },
  { id: "9", name: "מגדל אלרוב", street: "ויצמן 2", city: "תל אביב" },
  { id: "10", name: "מגדל רוטשילד", street: "רוטשילד 46", city: "תל אביב" },
  { id: "11", name: "בית אמריקה", street: "המרד 25", city: "תל אביב" },
  { id: "12", name: "מגדל דיסקונט", street: "יהודה הלוי 23", city: "תל אביב" },
  { id: "13", name: "בית קלקא", street: "ויצמן 14", city: "תל אביב" },
  { id: "14", name: "מגדל גיבור ספורט", street: "מנחם בגין 7", city: "רמת גן" },
  { id: "15", name: "מגדל אמות ביטוח", street: "ויצמן 48", city: "תל אביב" },
  { id: "16", name: "בית אפריקה ישראל", street: "דרך החורש 4", city: "יהוד" },
  {
    id: "17",
    name: "מגדל הכשרת הישוב",
    street: "דרך מנחם בגין 9",
    city: "רמת גן",
  },
  { id: "18", name: "מגדל צ'מפיון", street: "הברזל 38", city: "תל אביב" },
  { id: "19", name: "בית אוסישקין", street: "ארלוזורוב 17", city: "תל אביב" },
  { id: "20", name: "מגדל אלון", street: "אבן גבירול 54", city: "תל אביב" },
  { id: "21", name: "בית גיבור", street: "מנחם בגין 11", city: "רמת גן" },
  { id: "22", name: "מגדל לוינשטיין", street: "ויצמן 23", city: "תל אביב" },
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
  { firstName: "רון", lastName: "דוד", username: "rondav654", role: "GUARD" },
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
    lastName: "אריאל",
    username: "shakedspector",
    role: "MANAGER",
  },
  {
    firstName: "יואב",
    lastName: "קליין",
    username: "yoavkl01",
    role: "GUARD",
  },
  {
    firstName: "אורי",
    lastName: "פרץ",
    username: "uriperetz",
    role: "GUARD",
  },
  {
    firstName: "אלון",
    lastName: "אוחנה",
    username: "alonohana",
    role: "GUARD",
  },
  { firstName: "עידו", lastName: "חדד", username: "idohadad", role: "GUARD" },
  {
    firstName: "עמית",
    lastName: "אשכנזי",
    username: "amitashk",
    role: "GUARD",
  },
  { firstName: "דור", lastName: "סגל", username: "dorsegal", role: "GUARD" },
  {
    firstName: "שחר",
    lastName: "גולן",
    username: "shahargolan",
    role: "GUARD",
  },
  {
    firstName: "יהונתן",
    lastName: "דהן",
    username: "yonatandan",
    role: "GUARD",
  },
  {
    firstName: "אסף",
    lastName: "מלכה",
    username: "asafmalka",
    role: "GUARD",
  },
  { firstName: "ליאור", lastName: "בר", username: "liorbar", role: "GUARD" },
  {
    firstName: "ארז",
    lastName: "שמש",
    username: "erezshemesh",
    role: "GUARD",
  },
  { firstName: "ניר", lastName: "אלבז", username: "niralbaz", role: "GUARD" },
  { firstName: "אדם", lastName: "חזן", username: "adamhazan", role: "GUARD" },
  { firstName: "עדי", lastName: "עמר", username: "adiamar", role: "GUARD" },
  {
    firstName: "רועי",
    lastName: "אטיאס",
    username: "roeiattias",
    role: "GUARD",
  },
  {
    firstName: "מתן",
    lastName: "שוורץ",
    username: "matanshvarts",
    role: "GUARD",
  },
  { firstName: "שי", lastName: "גרין", username: "shaigreen", role: "GUARD" },
  {
    firstName: "יניב",
    lastName: "פרידמן",
    username: "yanivfried",
    role: "GUARD",
  },
  {
    firstName: "אופיר",
    lastName: "רוזן",
    username: "ofirrozen",
    role: "GUARD",
  },
  {
    firstName: "גיא",
    lastName: "ויינברג",
    username: "guywein",
    role: "GUARD",
  },
  {
    firstName: "איל",
    lastName: "לוין",
    username: "eylalevin",
    role: "GUARD",
  },
  {
    firstName: "רונן",
    lastName: "אדרי",
    username: "ronenadri",
    role: "GUARD",
  },
  {
    firstName: "בן",
    lastName: "אמסלם",
    username: "benamsalem",
    role: "GUARD",
  },
  {
    firstName: "אמיר",
    lastName: "בוזגלו",
    username: "amirbuz",
    role: "GUARD",
  },
  {
    firstName: "הלל",
    lastName: "עזרן",
    username: "hillelazran",
    role: "GUARD",
  },
  { firstName: "חן", lastName: "רווה", username: "henrave", role: "GUARD" },
  {
    firstName: "יהב",
    lastName: "סעדון",
    username: "yahavsaadon",
    role: "GUARD",
  },
  {
    firstName: "כפיר",
    lastName: "יוסף",
    username: "kfiryosef",
    role: "GUARD",
  },
  {
    firstName: "מיכאל",
    lastName: "טוויטו",
    username: "michaeltov",
    role: "GUARD",
  },
  {
    firstName: "נדב",
    lastName: "סויסה",
    username: "nadavsuissa",
    role: "GUARD",
  },
  {
    firstName: "עדן",
    lastName: "גרוס",
    username: "edengross",
    role: "GUARD",
  },
  {
    firstName: "פלג",
    lastName: "שרעבי",
    username: "pelegsharabi",
    role: "GUARD",
  },
  {
    firstName: "קובי",
    lastName: "ביטון",
    username: "kobybiton",
    role: "GUARD",
  },
  {
    firstName: "רפי",
    lastName: "הלוי",
    username: "rafihalevi",
    role: "GUARD",
  },
  { firstName: "שגיא", lastName: "כץ", username: "sagikatz", role: "GUARD" },
  {
    firstName: "תמיר",
    lastName: "פינטו",
    username: "tamirpinto",
    role: "GUARD",
  },
  {
    firstName: "ירין",
    lastName: "שטרן",
    username: "yarinstern",
    role: "GUARD",
  },
  {
    firstName: "יובל",
    lastName: "דדון",
    username: "yuvaldadon",
    role: "GUARD",
  },
  {
    firstName: "אילן",
    lastName: "הראל",
    username: "ilanharel",
    role: "GUARD",
  },
  { firstName: "זיו", lastName: "ורדי", username: "zivvardi", role: "GUARD" },
  { firstName: "טל", lastName: "זוהר", username: "talzohar", role: "GUARD" },
  {
    firstName: "יגאל",
    lastName: "חייט",
    username: "yigalhayat",
    role: "GUARD",
  },
  {
    firstName: "לירון",
    lastName: "טובי",
    username: "lirontobi",
    role: "GUARD",
  },
  {
    firstName: "מאיר",
    lastName: "יעקובי",
    username: "meiryaak",
    role: "GUARD",
  },
  {
    firstName: "נחום",
    lastName: "כספי",
    username: "nahumkaspi",
    role: "GUARD",
  },
  { firstName: "סער", lastName: "לביא", username: "saarlavi", role: "GUARD" },
  { firstName: "עידן", lastName: "מור", username: "idanmor", role: "GUARD" },
  {
    firstName: "צביקה",
    lastName: "נהון",
    username: "tsvikanahon",
    role: "GUARD",
  },
  {
    firstName: "שלמה",
    lastName: "סבן",
    username: "shlomosaban",
    role: "GUARD",
  },
  { firstName: "רם", lastName: "עמרם", username: "ramamram", role: "GUARD" },
  {
    firstName: "אביב",
    lastName: "פדידה",
    username: "avivpedida",
    role: "GUARD",
  },
  {
    firstName: "אורן",
    lastName: "צדוק",
    username: "orentzadok",
    role: "GUARD",
  },
  {
    firstName: "בועז",
    lastName: "קאפח",
    username: "boazkafah",
    role: "GUARD",
  },
  { firstName: "גד", lastName: "רגב", username: "gadregev", role: "GUARD" },
  {
    firstName: "דוד",
    lastName: "שפר",
    username: "davidshafer",
    role: "GUARD",
  },
  { firstName: "הרן", lastName: "פז", username: "haranpaz", role: "GUARD" },
  {
    firstName: "זוהר",
    lastName: "ארזי",
    username: "zoharerez",
    role: "GUARD",
  },
  {
    firstName: "חיים",
    lastName: "בלומנטל",
    username: "haimblum",
    role: "GUARD",
  },
  {
    firstName: "יהורם",
    lastName: "ברנס",
    username: "yorambarnes",
    role: "GUARD",
  },
  {
    firstName: "כרמי",
    lastName: "קופמן",
    username: "karmikop",
    role: "GUARD",
  },
  {
    firstName: "מיקי",
    lastName: "אקוה",
    username: "mikyakva",
    role: "GUARD",
  },
  {
    firstName: "נמרוד",
    lastName: "חכים",
    username: "nimrodhakim",
    role: "GUARD",
  },
  {
    firstName: "סיון",
    lastName: "אלחרר",
    username: "sivanalharar",
    role: "GUARD",
  },
  {
    firstName: "עמי",
    lastName: "בן-שושן",
    username: "amybenshoshan",
    role: "GUARD",
  },
  { firstName: "פז", lastName: "גבאי", username: "pazgabay", role: "GUARD" },
  { firstName: "צבי", lastName: "דרור", username: "tsvidror", role: "GUARD" },
  {
    firstName: "קדם",
    lastName: "הוכמן",
    username: "kedemhokh",
    role: "GUARD",
  },
  {
    firstName: "רז",
    lastName: "ולדמן",
    username: "razweldman",
    role: "GUARD",
  },
  {
    firstName: "שאול",
    lastName: "זוסמן",
    username: "shaulzus",
    role: "GUARD",
  },
  { firstName: "תום", lastName: "חן", username: "tomhen", role: "GUARD" },
  {
    firstName: "אלי",
    lastName: "טסלר",
    username: "elitesler",
    role: "GUARD",
  },
  {
    firstName: "גדי",
    lastName: "לוינסון",
    username: "gadilev",
    role: "GUARD",
  },
];

async function createGuard(
  guard: Pick<User, "firstName" | "lastName" | "username" | "role">,
) {
  const buildingId = String(Math.floor(Math.random() * buildings.length) + 1);

  return auth.api.signUpEmail({
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
