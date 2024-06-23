import type { Knex } from "knex";
import * as dotenv from "dotenv";
import { config } from "../config";

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
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    }
  },

  staging: {
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
      directory: './src/database/seeds'
    }
  },

  production: {
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
      directory: './migrations',
    },
    seeds: {
      directory: './seeds'
    }
  }

};

export default knexConfig;
