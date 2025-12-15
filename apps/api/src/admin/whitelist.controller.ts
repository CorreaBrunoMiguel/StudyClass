import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Roles } from 'src/auth/roles';
import { RolesGuard } from 'src/auth/roles.guard';
import { z } from 'zod';

const AddSchema = z.object({
  email: z.string().email(),
});

const PatchSchema = z.object({
  enabled: z.boolean(),
});

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Controller('admin/whitelist')
export class WhitelistController {
  constructor(private prisma: PrismaService) {}

  @Get()
  list() {
    return this.prisma.emailWhitelist.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  @Post()
  async add(@Body() body: any) {
    const { email } = AddSchema.parse(body);
    return this.prisma.emailWhitelist.upsert({
      where: { email },
      update: { enabled: true },
      create: { email, enabled: true },
    });
  }

  @Patch(':email')
  async setEnabled(@Param('email') email: string, @Body() body: any) {
    const { enabled } = PatchSchema.parse(body);
    return this.prisma.emailWhitelist.update({
      where: { email },
      data: { enabled },
    });
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.prisma.emailWhitelist.delete({ where: { email } });
  }
}
