import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.item.deleteMany();

  await prisma.item.createMany({
    data: [
      { title: "Set up CI/CD pipeline", description: "Configure GitHub Actions for automated testing and deployment", status: "DONE" },
      { title: "Design database schema", description: "Define tables for users, items, and audit logs", status: "DONE" },
      { title: "Implement authentication", description: "Add login/signup with session management", status: "IN_PROGRESS" },
      { title: "Build dashboard UI", description: "Create the main dashboard with stats and item table", status: "IN_PROGRESS" },
      { title: "Add search and filtering", description: "Allow users to filter items by status and search by title", status: "TODO" },
      { title: "Write API documentation", description: "Document all endpoints with request/response examples", status: "TODO" },
    ],
  });

  console.log("Seeded 6 items");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
