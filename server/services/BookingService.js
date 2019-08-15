/* eslint-disable no-else-return */
import Booking from '../models/Booking'
import UserModel from '../models/User'
import TripModel from '../models/Trip'
import formatBooking from '../helpers/formatBookings'

class BookingService {
  static checkSeatingCapacity(seatingCapacity, bookedSeats) {
    return seatingCapacity >= bookedSeats
  }

  static async postBooking(req, res) {
    const { trip_id: tripId, number_of_seats: numberOfSeats } = req.body
    const user = await UserModel.getUserById(req.user.id)
    const trip = await TripModel.getTripById(tripId)
    if (!user && !trip) {
      return res.status(400).send({
        status: 400,
        message: 'User or Trip must exist ',
      })
    }
    const isBookedTrip = await Booking.getTripIdAndNumberOfSeats(
      tripId,
      numberOfSeats,
    )
    if (isBookedTrip && user) {
      return res.status(400).send({
        status: 400,
        message: 'You have already Booked this Trip',
      })
    }
    const { seating_capacity: seatingCapacity } = trip
    const isSeatsAvailable = this.checkSeatingCapacity(
      seatingCapacity,
      numberOfSeats,
    )
    if (!isSeatsAvailable) {
      return res.status(202).send({
        status: 202,
        message: `Booking failed, only ${seatingCapacity} seats available`,
      })
    }
    const userId = req.user.id
    const booking = await Booking.createBooking({
      userId,
      tripId,
      numberOfSeats,
    })
    const updatedSeatingCapacity = seatingCapacity - numberOfSeats
    await TripModel.updateSeatingCapacity(updatedSeatingCapacity, tripId)
    const bookedTrip = {
      booking_id: booking.booking_id,
      bus_number: trip.bus_number,
      trip_date: trip.trip_date,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      number_of_seats: numberOfSeats,
      date_created: booking.date_created,
    }
    return res.status(201).send({
      status: 201,
      message: 'Booking created successfully',
      data: bookedTrip,
    })
  }

  static async getAll(req, res) {
    let bookings
    if (req.user.role === 'admin') {
      bookings = await Booking.getAllBookings()
    } else {
      bookings = await Booking.getBookingsByUserId(req.user.id)
    }
    if (!bookings) {
      return res.status(200).send({
        status: 200,
        message: 'There are no bookings',
      })
    }
    let formattedBookings
    if (bookings instanceof Array) {
      formattedBookings = await Promise.all(
        bookings.map(booking => formatBooking(booking)),
      )
    } else {
      formattedBookings = await formatBooking(bookings)
    }
    return res.status(200).send({
      status: 200,
      message: 'Successfully retrieve all bookings',
      data: formattedBookings,
    })
  }

  static async deleteBooking(req, res) {
    const booking = await Booking.getSpecificBooking(req.params.id)
    if (!booking) {
      return res.status(404).send({ status: 404, error: 'Booking not found' })
    }
    const { trip_id: tripId, number_of_seats: numberOfSeats } = booking
    const trip = await TripModel.getTripById(tripId)
    const updatedSeatingCapacity = trip.seating_capacity + numberOfSeats
    await Booking.deleteBooking(req.params.id)
    await TripModel.updateSeatingCapacity(updatedSeatingCapacity, tripId)
    return res.status(200).send({
      status: 200,
      message: 'Booking deleted successfully',
    })
  }
}
export default BookingService
