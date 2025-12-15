import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  private async assertWhitelisted(email: string) {
    const row = await this.prisma.emailWhitelist.findUnique({
      where: { email },
    });
    if (!row || !row.enabled)
      throw new ForbiddenException('Email não autorizado para o Beta.');
  }

  async signup(email: string, password: string) {
    await this.assertWhitelisted(email);

    const existing = await this.prisma.user.findUnique({ where: { email } });
    if (existing) throw new BadRequestException('Usuário já existe.');

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, passwordHash, role: 'ALUNO' },
      select: { id: true, email: true, role: true },
    });

    return this.signToken(user.id, user.email, user.role);
  }

  async login(email: string, password: string) {
    await this.assertWhitelisted(email);

    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash)
      throw new UnauthorizedException('Credenciais inválidas.');

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Credenciais inválidas.');

    return this.signToken(user.id, user.email, user.role);
  }

  signToken(userId: string, email: string, role: string) {
    const accessToken = this.jwt.sign({ sub: userId, email, role });
    return { accessToken };
  }
}
