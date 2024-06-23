import * as dotenv from "dotenv";
import * as joi from "joi";

process.env.ENV_PATH
  ? dotenv.config({ path: process.env.ENV_PATH })
  : dotenv.config();

const schemaValidate = joi
  .object({
    NODE_ENV: joi
      .string()
      .valid("development", "staging", "production")
      .required(),
    // REDIS_URL: joi.string(),
    // REDIS_HOST: joi.string(),
    // REDIS_PORT: joi.number(),
    // REDIS_PASSWORD: joi.string(),
    PORT: joi.number().required(),
    DB_NAME: joi.string(),
    DB_URL: joi.string(),
    DB_HOST: joi.string(),
    DB_PORT: joi.number(),
    DB_USER: joi.string(),
    DB_PASSWORD: joi.string(),
    DB_DATABASE: joi.string(),
    JWT_SECRET: joi.string()
  })
  .unknown()
  .required();

const { error, value: envVars } = schemaValidate.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export const config = {
  port: envVars.PORT ?? 8081,
  NODE_ENV: envVars.NODE_ENV,
  DB_URL: envVars.DB_URL,

  // redis: {
  //   HOST: envVars.REDIS_HOST,
  //   PORT: envVars.REDIS_PORT,
  //   PASSWORD: envVars.REDIS_PASSWORD
  // },
  DB: {
    NAME: envVars.DB_NAME,
    HOST: envVars.DB_HOST,
    PORT: envVars.DB_PORT,
    USER: envVars.DB_USER,
    PASSWORD: envVars.DB_PASSWORD,
    DATABASE: envVars.DB_DATABASE
  },
  secret: envVars.JWT_SECRET
};
