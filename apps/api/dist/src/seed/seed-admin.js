"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const bcrypt = __importStar(require("bcrypt"));
const client_1 = require("@prisma/client");
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = require("pg");
async function main() {
    const url = process.env.DATABASE_URL;
    if (!url)
        throw new Error('DATABASE_URL missing');
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminEmail || !adminPassword)
        throw new Error('ADMIN_EMAIL/ADMIN_PASSWORD missing');
    const pool = new pg_1.Pool({ connectionString: url });
    const prisma = new client_1.PrismaClient({ adapter: new adapter_pg_1.PrismaPg(pool) });
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
//# sourceMappingURL=seed-admin.js.map