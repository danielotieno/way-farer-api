import { Router } from 'express'
import BookingsController from '../../../controller/BookingsController'

const { bookingValidation } = require('../../../middlewares/validations')
const { jwtAuthentication } = require('../../../config/passportConfig')

const router = Router()

router.post(
  '/bookings',
  jwtAuthentication,
  bookingValidation,
  BookingsController.createBooking,
)
router.get('/bookings', jwtAuthentication, BookingsController.getBookings)
router.delete(
  '/bookings/:id',
  jwtAuthentication,
  BookingsController.deleteSpecificBooking,
)

export default router
