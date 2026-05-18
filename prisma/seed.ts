import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient({
  adapter: new PrismaPg(process.env.DATABASE_URL ?? ""),
});

async function main() {
  const password = await bcrypt.hash("password123", 12);

  await prisma.user.upsert({
    where: { email: "admin@barbershop.local" },
    update: {},
    create: {
      name: "Admin Noir",
      email: "admin@barbershop.local",
      password,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: "user@barbershop.local" },
    update: {},
    create: {
      name: "Customer Demo",
      email: "user@barbershop.local",
      password,
      role: Role.USER,
    },
  });

  const services = [
    ["Haircut", "Precision cut, styling, and hot towel finish.", 85000, 45],
    ["Beard Trim", "Clean beard shaping with premium balm.", 45000, 25],
    ["Hair Coloring", "Modern coloring consultation and application.", 250000, 120],
    ["Creambath", "Relaxing scalp treatment and nourishing creambath.", 110000, 60],
    ["Hair Wash", "Deep wash, massage, and quick styling.", 35000, 20],
  ] as const;

  for (const [name, description, price, duration] of services) {
    await prisma.service.upsert({
      where: { id: name.toLowerCase().replace(/\s/g, "-") },
      update: { description, price, duration },
      create: {
        id: name.toLowerCase().replace(/\s/g, "-"),
        name,
        description,
        price,
        duration,
      },
    });
  }

  const barbers = [
    ["Raka Steel", "/images/barber-raka.png", "Classic fade & executive cuts"],
    ["Dimas Noir", "/images/barber-dimas.png", "Beard sculpting & modern crop"],
    ["Arman Vale", "/images/barber-arman.png", "Coloring & texture styling"],
  ] as const;

  for (const [name, image, specialty] of barbers) {
    await prisma.barber.upsert({
      where: { id: name.toLowerCase().replace(/\s/g, "-") },
      update: { image, specialty },
      create: {
        id: name.toLowerCase().replace(/\s/g, "-"),
        name,
        image,
        specialty,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
