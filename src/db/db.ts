import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

/**
 * Initialize a Postgres connection for server-side database access.
 */
const sql = postgres(process.env.POSTGRES_URL ?? "", {
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: true }
      : false,
});

export const db = drizzle(sql);
