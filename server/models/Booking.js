// Booking Model
import moment from 'moment'
import uuid from 'uuid'

class Booking {
  // class constructor
  constructor() {
    this.bookings = []
  }

  // Create a new booking object
  createBooking(data) {
    const newBooking = {
      bookingId: uuid.v4(),
      userId: data.userId,
      tripId: data.tripId,
      numberOfSeats: data.numberOfSeats,
      createdOn: moment().format('DD-MM-YYYY'),
    }
    this.bookings.push(newBooking)
    return newBooking
  }

  getAllBookings() {
    return this.bookings
  }

  getSpecificBooking(bookingId) {
    return this.bookings.find(booking => booking.bookingId === bookingId)
  }

  async getBookingsByUserId(userId) {
    return this.bookings.filter(booking => booking.userId === userId)
  }

  deleteBooking(bookingId) {
    const booking = this.getSpecificBooking(bookingId)
    const index = this.bookings.indexOf(booking)
    this.bookings.splice(index, 1)
    return 'Booking deleted successfully'
  }
}
export default new Booking()
