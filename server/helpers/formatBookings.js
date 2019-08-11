import UserModel from '../models/User'
import TripModel from '../models/Trip'

const formatBooking = async booking => {
  const user = await UserModel.getUserById(booking.userId)
  const trip = await TripModel.getTripById(booking.tripId)

  const formattedBooking = {
    booking_id: booking.bookingId,
    bus_number: trip.busNumber,
    trip_date: trip.tripDate,
    first_name: user.firstName,
    last_name: user.lastName,
    email: user.email,
    number_of_seats: booking.numberOfSeats,
    created_on: booking.createdOn,
  }

  return formattedBooking
}

export default formatBooking
