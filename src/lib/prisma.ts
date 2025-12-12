import { PrismaClient } from "../generated/prisma";
import { Pool } from "pg";
import { PrismaPostgres } from "@prisma/adapter-postgresql";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPostgres(pool);

export const prisma = new PrismaClient({ adapter });