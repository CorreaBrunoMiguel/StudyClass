import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly pool: Pool;

  constructor(config: ConfigService) {
    const url = config.get<string>('DATABASE_URL');
    if (!url) throw new Error('DATABASE_URL não definido em apps/api/.env');

    const pool = new Pool({ connectionString: url });
    const adapter = new PrismaPg(pool);

    super({ adapter }); // Prisma 7: obrigatório usar adapter ou accelerateUrl :contentReference[oaicite:1]{index=1}
    this.pool = pool;
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    await this.pool.end();
  }
}
