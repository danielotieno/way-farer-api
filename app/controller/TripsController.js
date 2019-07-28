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
}

export default TripsController
