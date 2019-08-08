import { Router } from 'express'
import BookingsController from '../../../controller/BookingsController'

const { bookingValidation } = require('../../../../lib/middlewares/validations')

const router = Router()

router.post('/bookings', bookingValidation, BookingsController.createBooking)
router.get('/bookings', BookingsController.getBookings)
router.delete('/bookings/:id', BookingsController.deleteSpecificBooking)

export default router
