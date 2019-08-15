import TripModel from '../models/Trip'

class TripService {
  static async postTrip(req, res) {
    const {
      seating_capacity: seatingCapacity,
      bus_number: busNumber,
      origin,
      destination,
      fare,
      trip_date: tripDate,
    } = req.body
    const isTrip = await TripModel.getTripByBusNumberAndDate(
      busNumber,
      tripDate,
    )
    if (isTrip) {
      return res.status(400).send({ status: 400, error: 'Trip already exists' })
    }
    const createdTrip = await TripModel.createTrip({
      seatingCapacity,
      busNumber,
      origin,
      destination,
      fare,
      tripDate,
    })
    const returnTrip = {
      trip_id: createdTrip.trip_id,
      seating_capacity: seatingCapacity,
      bus_number: busNumber,
      origin,
      destination,
      fare,
      trip_date: tripDate,
    }
    return res.status(201).send({
      status: 201,
      message: 'Trip created successfully',
      data: returnTrip,
    })
  }

  static async getAll(req, res) {
    let trips
    if (req.user.role === 'admin') {
      trips = await TripModel.getAllTrips()
    } else {
      trips = await TripModel.getTripsByStatus('active')
    }
    if (!trips.length) {
      return res.status(200).send({
        status: 200,
        message: 'No Trips available',
      })
    }
    return res.status(200).send({
      status: 200,
      message: 'Trips retrieved successfully',
      data: trips,
    })
  }

  static async getTripById(req, res) {
    const trip = await TripModel.getTripById(req.params.id)
    if (!trip) {
      return res.status(404).send({ status: 404, error: 'Trip not found' })
    }
    return res.status(200).send({
      status: 200,
      message: 'Successfully retrieved a Trip',
      data: trip,
    })
  }

  static async searchTrip(req, res) {
    let filteredTrips
    let searchParameter
    if (req.query.origin) {
      let { origin } = req.query
      searchParameter = `origin ${origin}`
      origin = `%${origin}%`
      filteredTrips = await TripModel.filterByOrigin({ origin })
    } else if (req.query.destination) {
      searchParameter = 'destination'
      let { destination } = req.query
      searchParameter = `destination ${destination}`
      destination = `%${destination}%`
      filteredTrips = await TripModel.filterByDestination({ destination })
    } else {
      return res.status(400).send({
        status: 400,
        error: 'You can only search by origin and destination',
      })
    }
    if (filteredTrips.length) {
      return res.status(200).send({ Trips: filteredTrips })
    }
    return res
      .status(404)
      .send({ message: `no trips with ${searchParameter} found` })
  }

  static async updateTripStatus(req, res) {
    const trip = await TripModel.getTripById(req.params.id)
    if (!trip) {
      return res.status(404).send({ status: 404, error: 'Trip not found' })
    }
    if (trip.status !== 'active') {
      return res
        .status(400)
        .send({ status: 400, error: 'Trip already cancelled' })
    }
    const tripStatus = await TripModel.cancelTrip(req.params.id, req.body)
    if (tripStatus === 'active') {
      return res
        .status(200)
        .send({ status: 200, message: 'Trip is still active' })
    }
    return res.status(200).send({
      status: 200,
      message: 'Trip cancelled successfully',
    })
  }

  static async updatedTrip(req, res) {
    const trip = TripModel.getTripById(req.params.id)
    if (!trip) {
      return res.status(404).send({ message: 'Trip not found' })
    }
    const updatedTrip = TripModel.updateTrip(req.params.id, req.body)
    return res
      .status(200)
      .send({ message: 'Trip Updated successfully', updatedTrip })
  }
}
export default TripService
