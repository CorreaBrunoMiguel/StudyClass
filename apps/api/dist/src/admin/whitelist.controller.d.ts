import { PrismaService } from '../../prisma/prisma.service';
export declare class WhitelistController {
    private prisma;
    constructor(prisma: PrismaService);
    list(): import("@prisma/client").Prisma.PrismaPromise<{
        email: string;
        enabled: boolean;
        createdAt: Date;
    }[]>;
    add(body: any): Promise<{
        email: string;
        enabled: boolean;
        createdAt: Date;
    }>;
    setEnabled(email: string, body: any): Promise<{
        email: string;
        enabled: boolean;
        createdAt: Date;
    }>;
    remove(email: string): import("@prisma/client").Prisma.Prisma__EmailWhitelistClient<{
        email: string;
        enabled: boolean;
        createdAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
}
