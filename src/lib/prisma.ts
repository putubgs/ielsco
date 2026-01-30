import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg"; // <--- 1. Import Pool dari pg

const connectionString = process.env.DATABASE_URL;

// 2. Buat instance Pool terlebih dahulu
const pool = new Pool({ 
  connectionString 
});

// 3. Masukkan pool ke dalam adapter
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter, // <--- Sekarang ini akan valid
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}