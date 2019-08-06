import Booking from '../models/Booking'
import UserModel from '../models/User'

const { bookingValidation } = require('../../helpers/validations')

class BookingsController {
  static async createBooking(req, res) {
    // Validate fields before booking a seat
    const { error } = bookingValidation(req.body)
    if (error)
      return res.status(400).send({ status: 'error', error: error.details })

    const user = await UserModel.getUserById(req.body.userId)

    const booking = await Booking.createBooking(req.body)
    return res
      .status(201)
      .send({ status: 'Booking created successfully', data: booking, user })
  }
}

export default BookingsController
