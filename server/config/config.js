// Variables configuration
import dotenv from 'dotenv'
import Joi from '@hapi/joi'

dotenv.config()

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .required(),
  PORT: Joi.number().default(8080),
  DATABASE: Joi.string().required(),
  TEST_DB: Joi.string().default('wayfarer_test_db'),
  DATABASE_PASSWORD: Joi.string().default(null),
  DATABASE_USER: Joi.string().default('postgres'),
  DATABASE_URL: Joi.string().default(null),
  HOST: Joi.string().required(),
  SECRET_KEY: Joi.string().required(),
  JWT_EXPIRATION: Joi.string().required(),
})
  .unknown()
  .required()

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV || 'development',
  port: envVars.PORT,
  databaseName: envVars.DATABASE,
  testDbName: envVars.TEST_DB,
  dbUsername: envVars.DATABASE_USER,
  dbPassword: envVars.DATABASE_PASSWORD,
  databaseUrl: envVars.DATABASE_URL,
  host: envVars.HOST,
  secretKey: envVars.SECRET_KEY,
  jwtExpiration: envVars.JWT_EXPIRATION,
}

export default config
