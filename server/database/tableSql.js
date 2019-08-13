import logger from 'fancy-log'
import db from './dbConnection'

const createTables = async () => {
  const userTable = `CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(250) NOT NULL,
    last_name VARCHAR(250) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    role VARCHAR(250) NOT NULL DEFAULT 'user',
    date_created TIMESTAMP with time zone DEFAULT now()
)`
  const tripTable = `CREATE TABLE IF NOT EXISTS trips (
    trip_id SERIAL PRIMARY KEY,
    seating_capacity INT NOT NULL,
    bus_number VARCHAR(250) NOT NULL,
    origin VARCHAR(250) NOT NULL,
    destination VARCHAR(50) NOT NULL,
    fare NUMERIC NOT NULL,
    status VARCHAR(250) NOT NULL DEFAULT 'active',
    trip_date date NOT NULL

)`
  const bookingTable = `CREATE TABLE IF NOT EXISTS bookings (
    booking_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(user_id),
    trip_id INTEGER REFERENCES trips(trip_id),
    number_of_seat INTEGER NOT NULL
)`
  try {
    await db.none(userTable)
    logger.info('User Table Created')
    await db.none(tripTable)
    logger.info('Trip Table Created')
    await db.none(bookingTable)
    logger.info('Booking Table Created')
  } catch (error) {
    logger.info(
      'error occurred while creating tables closing db connection',
      error,
    )
    await db.$pool.end()
    logger.info('db connection pool closed')
  }
}

const dropTables = async () => {
  const dropAllTables = `
    DROP TABLE bookings;
    DROP TABLE users;
    DROP TABLE trips;
  `
  try {
    await db.none(dropAllTables)
    logger.info('All Tables Dropped')
  } catch (error) {
    logger.info('error occurred while creating tables', error)
  } finally {
    db.$pool.end()
  }
}

export default {
  createTables,
  dropTables,
}
