import { Pool } from "pg";

// Direkter Postgres-Zugriff (z.B. Neon). Nur serverseitig verwenden.
// Verbindungsstring aus DATABASE_URL, bei Neon inkl. "?sslmode=require".
// Der Pool wird pro Serverprozess einmal angelegt und wiederverwendet.

declare global {
  // eslint-disable-next-line no-var
  var __vctlPgPool: Pool | undefined;
}

export function isPostgresConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

export function getPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL ist nicht gesetzt.");
  }
  if (!globalThis.__vctlPgPool) {
    globalThis.__vctlPgPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Serverless-freundlich: wenige Verbindungen, kurze Leerlaufzeit.
      max: 3,
      idleTimeoutMillis: 10_000,
      connectionTimeoutMillis: 8_000,
    });
  }
  return globalThis.__vctlPgPool;
}
