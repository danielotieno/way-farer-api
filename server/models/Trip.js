// Trip Model
import uuid from 'uuid'

class Trip {
  constructor() {
    this.trips = []
  }

  createTrip(data) {
    const newTrip = {
      tripId: uuid.v4(),
      seatingCapacity: data.seatingCapacity,
      busNumber: data.busNumber,
      origin: data.origin,
      destination: data.destination,
      fare: data.fare,
      status: data.status || 'active',
      tripDate: data.tripDate,
    }
    const {
      tripId,
      seatingCapacity,
      busNumber,
      origin,
      destination,
      fare,
      status,
      tripDate,
    } = newTrip
    const formattedNewTrip = {
      trip_id: tripId,
      seating_capacity: seatingCapacity,
      bus_number: busNumber,
      origin,
      destination,
      fare,
      status,
      trip_date: tripDate,
    }
    this.trips.push(formattedNewTrip)
    return formattedNewTrip
  }

  getAllTrips() {
    return this.trips.filter(trip => trip.status === 'active')
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

  getTripByBusNumberAndDate(busNumber, tripDate) {
    return this.trips.find(
      trip => trip.bus_number === busNumber && trip.trip_date === tripDate,
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
