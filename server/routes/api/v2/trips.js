import { Router } from 'express'
import TripsController from '../../../controller/TripsController'
import isAdmin from '../../../middlewares/isAdmin'

const { tripValidation } = require('../../../middlewares/validations')
const { jwtAuthentication } = require('../../../config/passportConfig')

const router = Router()

router.post(
  '/trips',
  jwtAuthentication,
  isAdmin,
  tripValidation,
  TripsController.createTrip,
)
router.get('/trips', jwtAuthentication, TripsController.getAllTrips)
router.get('/trips/:id', jwtAuthentication, TripsController.getSingleTrip)
router.put(
  '/trips/:id',
  jwtAuthentication,
  isAdmin,
  tripValidation,
  TripsController.updateTrip,
)
router.patch(
  '/trips/:id/cancel',
  jwtAuthentication,
  isAdmin,
  TripsController.cancelTrip,
)

export default router
