import TripModel from '../models/Trip'

class TripService {
  static async postTrip(req, res) {
    const isTrip = await TripModel.getBusNumber(req.body.busNumber)
    if (isTrip) {
      return res.status(400).send({ status: 400, error: 'Trip already exists' })
    }
    const trip = await TripModel.createTrip(req.body)
    return res
      .status(201)
      .send({ status: 201, message: 'Trip created successfully', data: trip })
  }

  static async getAll(req, res) {
    const trips = TripModel.getAllTrips()
    return res.status(200).send({
      status: 200,
      message: 'Trips retrieved successfully',
      data: trips,
    })
  }

  static async getSpecificTrip(req, res) {
    const trip = await TripModel.getSpecificTrip(req.params.id)
    if (!trip) {
      return res.status(404).send({ status: 404, error: 'Trip not found' })
    }
    return res.status(200).send({
      status: 200,
      message: 'Successfully retrieved a Trip',
      data: trip,
    })
  }

  static async updateTripStatus(req, res) {
    const trip = await TripModel.getSpecificTrip(req.params.id)
    if (!trip) {
      return res.status(404).send({ status: 404, error: 'Trip not found' })
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
      data: tripStatus,
    })
  }
}
export default TripService
