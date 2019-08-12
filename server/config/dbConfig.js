import config from './config'

const defaultConfig = {
  database: config.databaseName,
  username: config.dbUsername,
  password: config.dbPassword,
  host: config.host,
}

const databaseConfig = {
  development: {
    ...defaultConfig,
  },
  test: {
    ...defaultConfig,
    database: config.testDbName,
  },
  production: {
    ...defaultConfig,
  },
}

if (!config.databaseUrl) {
  const envDb = databaseConfig[config.env]
  const { database, username, password, host } = envDb
  config.databaseUrl = `postgres://${username}:${password}@${host}:5432/${database}`
}

export default config.databaseUrl
