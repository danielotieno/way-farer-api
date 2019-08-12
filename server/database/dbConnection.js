import Promise from 'bluebird'
import dbUrl from '../config/dbConfig'

const initOptions = {
  promiseLib: Promise,
}

const pgp = require('pg-promise')(initOptions)

// Creating a new database instance from the connection details:
const db = pgp(dbUrl)

export default db
