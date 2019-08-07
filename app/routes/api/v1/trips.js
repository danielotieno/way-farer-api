import { Router } from 'express'
import TripsController from '../../../controller/TripsController'

const { tripValidation } = require('../../../../lib/middlewares/validations')

const router = Router()

router.post('/trips', tripValidation, TripsController.createTrip)
router.get('/trips', TripsController.getAllTrips)
router.get('/trips/:id', TripsController.getSingleTrip)
router.patch('/trips/:id/cancel', TripsController.cancelTrip)

export default router
