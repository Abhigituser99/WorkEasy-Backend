import bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';

export const seedUsers = async (prisma) => {
  console.log('🌱 Seeding users...');

  // 1️⃣ Seed the admin user
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
  console.log('✅ Admin user ensured.');

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
    skipDuplicates: true,
  });

  console.log('✅ 200 random users seeded.');
};