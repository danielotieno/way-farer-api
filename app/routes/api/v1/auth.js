import { Router } from 'express'
import UserController from '../../../controller/UsersController'

const { localAuthentication } = require('../../../../config/passportConfig')

const router = Router()

router.post('/auth/signup', UserController.createUser)
router.post('/auth/signup/admin', UserController.createAdmin)
router.post('/auth/login', localAuthentication, UserController.loginUser)

export default router
