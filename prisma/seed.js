import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1️⃣ Seed the admin user (ensure at least one admin always exists)
  const adminHash = await bcrypt.hash('Admin@123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@workeasy.io' },
    update: {},
    create: {
      email: 'admin@workeasy.io',
      password: adminHash,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });
  console.log('✅ Admin user ensured');

  // 2️⃣ Generate 200 random users
  const usersData = [];
  for (let i = 0; i < 200; i++) {
    const role = faker.helpers.arrayElement(['CLIENT', 'SERVICE_PROVIDER']);
    const name = faker.person.fullName();
    const email = faker.internet.email({ firstName: name.split(' ')[0] });
    const passwordHash = await bcrypt.hash('User@123', 10);

    usersData.push({
      email,
      password: passwordHash,
      name,
      role,
    });
  }

  // 3️⃣ Insert all at once
  await prisma.user.createMany({
    data: usersData,
    skipDuplicates: true, // avoids re-inserting if emails already exist
  });

  console.log('✅ 200 random users seeded successfully');
}

main()
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
