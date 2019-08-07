import { Router } from 'express'
import UserController from '../../../controller/UsersController'

const {
  signupValidation,
  loginValidation,
} = require('../../../../lib/middlewares/validations')

const { localAuthentication } = require('../../../../config/passportConfig')

const router = Router()

router.post('/auth/signup', signupValidation, UserController.createUser)
router.post('/auth/signup/admin', signupValidation, UserController.createAdmin)
router.post(
  '/auth/login',
  loginValidation,
  localAuthentication,
  UserController.loginUser,
)

export default router
