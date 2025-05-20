// database.ts
import { DB } from "https://deno.land/x/sqlite/mod.ts";

const db = new DB("data.db");

// Opret en tabel (kun første gang)
db.execute(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  );
`);

// Tilføj nogle testdata (valgfrit)
db.query("INSERT INTO users (name) VALUES (?)", ["Alice"]);
db.query("INSERT INTO users (name) VALUES (?)", ["Bob"]);

export default db;
