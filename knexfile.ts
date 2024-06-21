import type { Knex } from "knex";
import * as dotenv from "dotenv";
import { config } from "./src/config";
import path from "path";

process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH })
  : dotenv.config();
// Update with your config settings.

const knexConfig: { [key: string]: Knex.Config } = {
  development: {
    client: config.DB.NAME,
    connection: {
      host: config.DB.HOST,
      port: config.DB.PORT,
      user: config.DB.USER,
      password: config.DB.PASSWORD,
      database: config.DB.DATABASE,
      charset: 'utf8'
    },
    // connection: process.env.DB_URL,
    searchPath: ['knex', 'public'],
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  testing: {
    client: 'pg',
    connection: process.env.DB_URL,
    searchPath: ['knex', 'public'],
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds'
    }
  },

  production: {
    client: 'pg',
    connection: process.env.DB_URL,
    searchPath: ['knex', 'public'],
    migrations: {
      directory: './src/database/migrations',
    },
    seeds: {
      directory: './src/database/seeds'
    }
  }

};

export default knexConfig;
