import TripService from '../services/TripService'

class TripsController {
  static async createTrip(req, res) {
    TripService.postTrip(req, res)
  }

  static async getAllTrips(req, res) {
    TripService.getAll(req, res)
  }

  static async getSingleTrip(req, res) {
    TripService.getTripById(req, res)
  }

  static async cancelTrip(req, res) {
    TripService.updateTripStatus(req, res)
  }

  static async search(req, res) {
    TripService.searchTrip(req, res)
  }

  static async updateTrip(req, res) {
    TripService.updatedTrip(req, res)
  }
}

export default TripsController
