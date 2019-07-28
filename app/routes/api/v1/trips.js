import { Router } from 'express'
import TripsController from '../../../controller/TripsController'

const router = Router()

router.post('/trips', TripsController.createTrip)
router.get('/trips', TripsController.getAllTrips)
router.get('/trips/:id', TripsController.getSingleTrip)

export default router
