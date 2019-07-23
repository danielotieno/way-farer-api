// Variables configuration
import dotenv from 'dotenv'
import Joi from '@hapi/joi'

dotenv.config()

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow(['development', 'production', 'test'])
    .required(),
  PORT: Joi.number().default(8080),
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
}

export default config
