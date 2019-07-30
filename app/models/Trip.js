// Trip Model
import moment from 'moment'
import uuid from 'uuid'

const now = moment()

class Trip {
  // class constructor
  constructor() {
    this.trips = []
  }

  // Create a new trip object
  createTrip(data) {
    const newTrip = {
      id: uuid.v4(),
      seating_capacity: data.seating_capacity,
      bus_number: data.bus_number,
      origin: data.origin,
      destination: data.destination,
      fare: data.fare,
      status: data.status || 'active',
      trip_date: now.format('DD-MM-YYYY'),
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
    return this.trips.find(trip => trip.id === id)
  }

  // PATCH a specific trip
  cancelTrip(id, data) {
    const trip = this.singleTrip(id)
    const index = this.trips.indexOf(trip)
    this.trips[index].status = data.status || trip.status

    return this.trips[index]
  }
}
export default new Trip()
