// Trip Model
import moment from 'moment'
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
      tripDate: moment().format('DD-MM-YYYY'),
    }
    this.trips.push(newTrip)
    return newTrip
  }

  getAllTrips() {
    return this.trips
  }

  getTripById(tripId) {
    return this.trips.find(trip => trip.tripId === tripId)
  }

  cancelTrip(tripId, data) {
    const trip = this.getTripById(tripId)
    const index = this.trips.indexOf(trip)
    this.trips[index].status = data.status
    return this.trips[index].status
  }

  getBusNumber(busNumber) {
    return this.trips.find(trip => trip.busNumber === busNumber)
  }
}
export default new Trip()
