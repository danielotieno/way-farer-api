import { Router } from 'express'
import UserController from '../../../controller/UsersController'
import AdminController from '../../../controller/AdminsController'

const { localAuthentication } = require('../../../../config/passportConfig')

const router = Router()

router.post('/auth/signup', UserController.createUser)
router.post('/auth/signup/admin', AdminController.createAdmin)
router.post('/auth/login', localAuthentication, UserController.loginUser)

export default router
