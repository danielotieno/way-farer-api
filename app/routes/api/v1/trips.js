import { Router } from 'express'
import TripsController from '../../../controller/TripsController'

const router = Router()

router.post('/trips', TripsController.createTrip)

export default router
