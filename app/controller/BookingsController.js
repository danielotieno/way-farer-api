import Booking from '../models/Booking'
import UserModel from '../models/User'
import TripModel from '../models/Trip'

const { bookingValidation } = require('../../helpers/validations')

class BookingsController {
  static async createBooking(req, res) {
    // Validate fields before booking a seat
    const { error } = bookingValidation(req.body)
    if (error)
      return res.status(400).send({ status: 'error', error: error.details })

    const user = await UserModel.getUserById(req.body.userId)
    const trip = await TripModel.singleTrip(req.body.tripId)
    const booking = await Booking.createBooking(req.body)

    const bookedTrip = {
      bookingId: booking.bookingId,
      busNumber: trip.busNumber,
      tripDate: trip.tripDate,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      numberOfSeats: booking.numberOfSeats,
      createdOn: booking.createdOn,
    }
    return res
      .status(201)
      .send({ status: 'Booking created successfully', data: bookedTrip })
  }
}

export default BookingsController
