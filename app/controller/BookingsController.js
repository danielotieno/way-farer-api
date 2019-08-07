import BookingService from '../services/BookingService'

class BookingsController {
  static async createBooking(req, res) {
    BookingService.postBooking(req, res)
  }
}

export default BookingsController
