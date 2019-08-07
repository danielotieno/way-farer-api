import { Router } from 'express'
import BookingsController from '../../../controller/BookingsController'

const router = Router()

router.post('/bookings', BookingsController.createBooking)

export default router
