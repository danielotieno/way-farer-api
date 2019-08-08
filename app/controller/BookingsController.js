import BookingService from '../services/BookingService'

class BookingsController {
  static async createBooking(req, res) {
    BookingService.postBooking(req, res)
  }

  static async getBookings(req, res) {
    BookingService.getAll(req, res)
  }
}

export default BookingsController
