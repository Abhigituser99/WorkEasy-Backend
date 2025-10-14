import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding initial users...');

  const adminHash  = await bcrypt.hash('Admin@123', 10);
  const clientHash = await bcrypt.hash('Client@123', 10);
  const sellerHash = await bcrypt.hash('Seller@123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@workeasy.io' },
    update: {},
    create: { email: 'admin@workeasy.io', password: adminHash, name: 'Admin User', role: 'ADMIN' }
  });

  await prisma.user.upsert({
    where: { email: 'client@workeasy.io' },
    update: {},
    create: { email: 'client@workeasy.io', password: clientHash, name: 'Demo Client', role: 'CLIENT' }
  });

  await prisma.user.upsert({
    where: { email: 'seller@workeasy.io' },
    update: {},
    create: { email: 'seller@workeasy.io', password: sellerHash, name: 'Demo Seller', role: 'SERVICE_PROVIDER' }
  });

  console.log('✅ Seed complete!');
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
