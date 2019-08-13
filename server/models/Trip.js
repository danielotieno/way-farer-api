/* eslint-disable class-methods-use-this */
// Trip Model
import db from '../database/dbConnection'

class Trip {
  async createTrip(data) {
    const newTrip = {
      seatingCapacity: data.seatingCapacity,
      busNumber: data.busNumber,
      origin: data.origin,
      destination: data.destination,
      fare: data.fare,
      status: data.status || 'active',
      tripDate: data.tripDate,
    }
    try {
      return await db.one(
        'INSERT INTO trips(seating_capacity, bus_number, origin, destination, fare, status, trip_date) VALUES($[seatingCapacity], $[busNumber], $[origin], $[destination], $[fare], $[status], $[tripDate]) RETURNING trip_id',
        newTrip,
      )
    } catch (error) {
      return error
    }
  }

  async getAllTrips() {
    return db.any('select * from trips')
  }

  getTripById(tripId) {
    return this.trips.find(trip => trip.trip_id === tripId)
  }

  cancelTrip(tripId) {
    const trip = this.getTripById(tripId)
    trip.status = 'cancelled'
    return trip.status
  }

  getBusNumber(busNumber) {
    return this.trips.find(trip => trip.bus_number === busNumber)
  }

  async getTripByBusNumberAndDate(busNumber, tripDate) {
    return db.oneOrNone(
      'select * from trips where bus_number = $1 AND trip_date = $2',
      [busNumber, tripDate],
    )
  }

  updateTrip(tripId, data) {
    const trip = this.getTripById(tripId)
    const index = this.trips.indexOf(trip)
    this.trips[index].seatingCapacity =
      data.seatingCapacity || trip.seatingCapacity
    this.trips[index].busNumber = data.busNumber || trip.busNumber
    this.trips[index].origin = data.origin || trip.origin
    this.trips[index].destination = data.destination || trip.destination
    this.trips[index].fare = data.fare || trip.fare
    return this.trips[index]
  }

  updateSeatingCapacity(tripId, bookedSeats) {
    const trip = this.getTripById(tripId)
    trip.seating_capacity -= bookedSeats
  }
}
export default new Trip()
