import TripModel from '../models/Trip'

const { tripValidation } = require('../../helpers/validations')

class TripsController {
  // Post a trip

  static async createTrip(req, res) {
    // Validate fields before creating a trip
    const { error } = tripValidation(req.body)
    if (error)
      return res.status(400).send({ status: 'error', error: error.details })

    const isTrip = await TripModel.getBusNumber(req.body.busNumber)
    if (isTrip) {
      return res
        .status(400)
        .send({ status: 'error', error: 'Trip already exists' })
    }
    const trip = await TripModel.createTrip(req.body)
    return res
      .status(201)
      .send({ status: 'Trip created successfully', data: trip })
  }

  // Get all trip

  static async getAllTrips(req, res) {
    const trips = TripModel.allTrips()
    return res.status(200).send({ status: 'success', data: trips })
  }

  // Get a specific trip

  static async getSingleTrip(req, res) {
    const trip = await TripModel.singleTrip(req.params.id)
    if (!trip) {
      return res.status(404).send({ status: 'error', error: 'Trip not found' })
    }
    return res.status(200).send({ status: 'success', data: trip })
  }

  // Patch a trip

  static async cancelTrip(req, res) {
    const trip = await TripModel.singleTrip(req.params.id)
    if (!trip) {
      return res.status(404).send({ status: 'error', error: 'Trip not found' })
    }
    const tripStatus = await TripModel.cancelTrip(req.params.id, req.body)
    if (tripStatus === 'active') {
      return res.status(200).send({ message: 'Trip is still active' })
    }
    return res.status(200).send({
      status: 'success',
      data: { message: 'Trip cancelled successfully' },
      tripStatus,
    })
  }
}

export default TripsController
