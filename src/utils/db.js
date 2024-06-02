import consola from 'consola';

import { dbConfig } from '../config';

const { Client } = require('pg');

const client = new Client({
  host: dbConfig.dbHost,
  port: dbConfig.dbPort,
  user: dbConfig.dbUser,
  password: dbConfig.dbPassword,
  database: dbConfig.dbName,
});

async function connectToDb() {
  try {
    // Connect to the PostgreSQL server
    await client.connect();
    consola.success({ message: 'DB connection established', badge: true });
  } catch (err) {
    consola.error({ message: `DB connection error: "${err}"`, badge: true });
    process.exit();
  }
}

export default connectToDb;
