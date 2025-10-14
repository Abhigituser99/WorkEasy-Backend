import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  // Points to the folder that contains schema.prisma (and split files)
  schema: './prisma/schema'
});
