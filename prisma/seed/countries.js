export const seedCountries = async (prisma) => {
  console.log('🌱 Seeding countries...');
  const countries = [
  { name: 'Afghanistan', code: 'AF' },
  { name: 'United States', code: 'US' },
  { name: 'United Kingdom', code: 'GB' },
  { name: 'India', code: 'IN' },
  { name: 'Canada', code: 'CA' },
  { name: 'Australia', code: 'AU' },
  // --- New countries added below ---
  { name: 'Germany', code: 'DE' },
  { name: 'Japan', code: 'JP' },
  { name: 'Brazil', code: 'BR' },
  { name: 'South Africa', code: 'ZA' },
  { name: 'China', code: 'CN' },
  // ... add more countries as needed
];

  for (const country of countries) {
    await prisma.country.upsert({
      where: { code: country.code },
      update: {},
      create: country,
    });
  }
  console.log('✅ Country seeding finished.');
};