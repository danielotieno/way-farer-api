import Booking from '../models/Booking'

class BookingsController {
  // Post a trip

  static async createBooking(req, res) {
    const booking = await Booking.createBooking(req.body)
    return res
      .status(201)
      .send({ status: 'Booking created successfully', data: booking })
  }
}

export default BookingsController
