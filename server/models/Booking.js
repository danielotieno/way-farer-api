/* eslint-disable class-methods-use-this */
// Booking Model
import db from '../database/dbConnection'

class Booking {
  // Create a new booking object
  async createBooking(data) {
    const newBooking = {
      userId: data.userId,
      tripId: data.tripId,
      numberOfSeats: data.numberOfSeats,
    }
    try {
      return await db.one(
        'INSERT INTO bookings(user_id, trip_id, number_of_seats) VALUES($[userId], $[tripId], $[numberOfSeats]) RETURNING booking_id, date_created',
        newBooking,
      )
    } catch (error) {
      return error
    }
  }

  async getAllBookings() {
    return db.any('select * from bookings')
  }

  async getSpecificBooking(bookingId) {
    return db.oneOrNone(
      'select * from bookings where booking_id = $1',
      bookingId,
    )
  }

  async getBookingsByUserId(userId) {
    return db.any('select * from bookings where user_id = $1', userId)
  }

  async getTripIdAndNumberOfSeats(tripId, numberOfSeats) {
    return db.oneOrNone(
      'select * from bookings where trip_id = $1 AND number_of_seats = $2',
      [tripId, numberOfSeats],
    )
  }

  async deleteBooking(bookingId) {
    await db.result('delete from bookings where booking_id = $1', bookingId)
  }
}
export default new Booking()
