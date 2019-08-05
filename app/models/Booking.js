// Booking Model
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
      busNumber: data.busNumber,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      numberOfSeat: data.numberOfSeat,
      tripDate: data.tripDate,
    }
    this.bookings.push(newBooking)
    return newBooking
  }
}
export default new Booking()
