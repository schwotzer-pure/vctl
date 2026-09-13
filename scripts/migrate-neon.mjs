#!/usr/bin/env node
// Spielt alle SQL-Dateien aus neon/migrations/ in die Datenbank aus DATABASE_URL ein.
// Bereits angewendete Dateien werden in schema_migrations gemerkt und übersprungen.
//
//   DATABASE_URL="postgres://…?sslmode=require" npm run db:migrate
//
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import pg from "pg";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL ist nicht gesetzt.");
  process.exit(1);
}

const dir = join(process.cwd(), "neon", "migrations");
const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();

const client = new pg.Client({ connectionString: url });
await client.connect();

try {
  await client.query(`
    create table if not exists schema_migrations (
      name text primary key,
      applied_at timestamptz not null default now()
    )
  `);
  const { rows } = await client.query("select name from schema_migrations");
  const applied = new Set(rows.map((r) => r.name));

  let count = 0;
  for (const file of files) {
    if (applied.has(file)) {
      console.log(`  übersprungen  ${file}`);
      continue;
    }
    const sql = await readFile(join(dir, file), "utf8");
    await client.query("begin");
    try {
      await client.query(sql);
      await client.query("insert into schema_migrations (name) values ($1)", [file]);
      await client.query("commit");
      console.log(`  angewendet    ${file}`);
      count += 1;
    } catch (err) {
      await client.query("rollback");
      throw err;
    }
  }
  console.log(count === 0 ? "Alles aktuell." : `${count} Migration(en) angewendet.`);
} finally {
  await client.end();
}
