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
}
export default new Booking()
