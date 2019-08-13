import { Router } from 'express'
import UserController from '../../../controller/UsersController'
import isAdmin from '../../../middlewares/isAdmin'

const { jwtAuthentication } = require('../../../config/passportConfig')

const {
  signupValidation,
  loginValidation,
} = require('../../../middlewares/validations')

const { localAuthentication } = require('../../../config/passportConfig')

const router = Router()

router.post('/auth/signup', signupValidation, UserController.createUser)
router.post(
  '/auth/signup/admin',
  jwtAuthentication,
  isAdmin,
  signupValidation,
  UserController.createAdmin,
)
router.post(
  '/auth/login',
  loginValidation,
  localAuthentication,
  UserController.loginUser,
)

export default router
