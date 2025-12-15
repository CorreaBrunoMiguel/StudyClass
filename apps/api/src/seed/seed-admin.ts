import 'dotenv/config';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error('DATABASE_URL missing');

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPassword)
    throw new Error('ADMIN_EMAIL/ADMIN_PASSWORD missing');

  const pool = new Pool({ connectionString: url });
  const prisma = new PrismaClient({ adapter: new PrismaPg(pool) });

  // garante whitelist do admin
  await prisma.emailWhitelist.upsert({
    where: { email: adminEmail },
    update: { enabled: true },
    create: { email: adminEmail, enabled: true },
  });

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: 'ADMIN', passwordHash },
    create: { email: adminEmail, passwordHash, role: 'ADMIN' },
  });

  await prisma.$disconnect();
  await pool.end();

  console.log('Seed ADMIN OK:', adminEmail);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
