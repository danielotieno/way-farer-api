import logger from 'fancy-log'
import db from './dbConnection'

const createTables = async () => {
  const userTable = `CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_on TIMESTAMP
);`
  const tripTable = `CREATE TABLE IF NOT EXISTS trips (
    trip_id SERIAL PRIMARY KEY,
    seating_capacity INT NOT NULL,
    bus_number VARCHAR(250) NOT NULL,
    origin VARCHAR(250) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    trip_date date NOT NULL,
    fare NUMERIC NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'active',
);`
  try {
    await db.none(userTable)
    logger.info('User Table Created')
    await db.none(tripTable)
    logger.info('Trip Table Created')
  } catch (error) {
    logger.info('error occurred while creating tables', error)
  } finally {
    db.$pool.end()
  }
}
createTables()
