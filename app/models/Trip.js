// Trip Model
import moment from 'moment'
import uuid from 'uuid'

class Trip {
  // class constructor
  constructor() {
    this.trips = []
  }

  // Create a new trip object
  createTrip(data) {
    const newTrip = {
      tripId: uuid.v4(),
      seatingCapacity: data.seatingCapacity,
      busNumber: data.busNumber,
      origin: data.origin,
      destination: data.destination,
      fare: data.fare,
      status: data.status || 'active',
      tripDate: moment.now.format('DD-MM-YYYY'),
    }
    this.trips.push(newTrip)
    return newTrip
  }

  // Returns all trips
  allTrips() {
    return this.trips
  }

  // Return a Single trip
  singleTrip(id) {
    return this.trips.find(trip => trip.tripId === id)
  }

  // PATCH a specific trip
  cancelTrip(id, data) {
    const trip = this.singleTrip(id)
    const index = this.trips.indexOf(trip)
    this.trips[index].status = data.status
    return this.trips[index].status
  }

  // Return a Bus number
  getBusNumber(busNumber) {
    return this.trips.find(trip => trip.busNumber === busNumber)
  }
}
export default new Trip()
