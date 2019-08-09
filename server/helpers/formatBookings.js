import UserModel from '../models/User'
import TripModel from '../models/Trip'

const formatBooking = async booking => {
  const user = await UserModel.getUserById(booking.userId)
  const trip = await TripModel.getTripById(booking.tripId)

  const formattedBooking = {
    bookingId: booking.bookingId,
    busNumber: trip.busNumber,
    tripDate: trip.tripDate,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    numberOfSeats: booking.numberOfSeats,
    createdOn: booking.createdOn,
  }

  return formattedBooking
}

export default formatBooking
