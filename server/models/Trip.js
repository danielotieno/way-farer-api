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
    this.trips.push(newTrip)
    return newTrip
  }

  getAllTrips() {
    return this.trips.filter(trip => trip.status === 'active')
  }

  getTripById(tripId) {
    return this.trips.find(trip => trip.tripId === tripId)
  }

  cancelTrip(tripId) {
    const trip = this.getTripById(tripId)
    trip.status = 'cancelled'
    return trip.status
  }

  getBusNumber(busNumber) {
    return this.trips.find(trip => trip.busNumber === busNumber)
  }

  updateSeatingCapacity(tripId, bookedSeats) {
    const trip = this.getTripById(tripId)
    trip.seatingCapacity -= bookedSeats
  }
}
export default new Trip()
