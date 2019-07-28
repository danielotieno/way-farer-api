import TripModel from '../models/Trip'

const { tripValidation } = require('../../helpers/validations')

class TripsController {
  // Post a trip

  static async createTrip(req, res) {
    // Validate fields before creating a trip
    const { error } = tripValidation(req.body)
    if (error)
      return res.status(400).send({ status: 'error', error: error.details })
    const trip = await TripModel.createTrip(req.body)
    return res
      .status(201)
      .send({ status: 'trip created successfully', data: trip })
  }

  // Get all trip

  static async getAllTrips(req, res) {
    const trips = TripModel.allTrips()
    return res.status(200).send({ status: 'success', trips })
  }

  // Get a specific trip

  static async getSingleTrip(req, res) {
    const trip = await TripModel.singleTrip(req.params.id)
    if (!trip) {
      return res.status(404).send({ status: 'error', error: 'trip not found' })
    }
    return res.status(200).send({ status: 'success', trip })
  }
}

export default TripsController
