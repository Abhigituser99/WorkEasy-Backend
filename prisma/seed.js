import { PrismaClient } from '@prisma/client';
import { seedCountries } from './seed/countries.js';
import { seedUsers } from './seed/users.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🚀 Starting the seed process...');
  
  // Run your seed functions sequentially
  await seedCountries(prisma);
  // await seedUsers(prisma);

  console.log('🎉 Seeding process completed successfully!');
}

main()
  .catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });