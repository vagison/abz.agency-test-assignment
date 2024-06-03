import consola from 'consola';

import { dbConfig } from '../configs';

const { Client } = require('pg');

const db = new Client({
  host: dbConfig.dbHost,
  port: dbConfig.dbPort,
  user: dbConfig.dbUser,
  password: dbConfig.dbPassword,
  database: dbConfig.dbName,
  ssl: dbConfig.ssl,
});

async function connectToDb() {
  try {
    // Connect to the PostgreSQL server
    await db.connect();
    consola.success({ message: 'DB connection established', badge: true });
  } catch (err) {
    consola.error({ message: `DB connection error: "${err}"`, badge: true });
    process.exit();
  }
}

export { connectToDb, db };
