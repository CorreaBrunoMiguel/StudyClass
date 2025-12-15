import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    private assertWhitelisted;
    signup(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    login(email: string, password: string): Promise<{
        accessToken: string;
    }>;
    signToken(userId: string, email: string, role: string): {
        accessToken: string;
    };
}
