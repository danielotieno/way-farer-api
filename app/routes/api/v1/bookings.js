import { Router } from 'express'
import BookingsController from '../../../controller/BookingsController'

const { bookingValidation } = require('../../../../lib/middlewares/validations')

const router = Router()

router.post('/bookings', bookingValidation, BookingsController.createBooking)

export default router
