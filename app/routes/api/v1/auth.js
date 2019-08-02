import { Router } from 'express'
import UserController from '../../../controller/UsersController'

const router = Router()

router.post('/auth/signup', UserController.createUser)
router.post('/auth/login', UserController.loginUser)

export default router
