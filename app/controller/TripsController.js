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
}

export default TripsController
