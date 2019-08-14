import UserModel from '../models/User'
import TripModel from '../models/Trip'

const formatBooking = async booking => {
  const user = await UserModel.getUserById(booking.user_id)
  const trip = await TripModel.getTripById(booking.trip_id)

  const formattedBooking = {
    booking_id: booking.booking_id,
    bus_number: trip.bus_number,
    trip_date: trip.trip_date,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    number_of_seats: booking.number_of_seats,
    date_created: booking.date_created,
  }

  return formattedBooking
}

export default formatBooking
