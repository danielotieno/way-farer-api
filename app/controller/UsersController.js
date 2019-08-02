import UserModel from '../models/User'
import AdminModel from '../models/Admin'
import EncryptData from '../../helpers/EncryptPassword'
import createToken from '../../helpers/jwtToken'
import config from '../../config/config'

const {
  signupValidation,
  loginValidation,
} = require('../../helpers/validations')

class UserController {
  static async createUser(req, res) {
    // Validate fields before creating User
    const { error } = signupValidation(req.body)
    if (error)
      return res.status(400).send({ status: 'error', error: error.details })

    const userExist = await UserModel.getUserEmail(req.body.email)
    if (userExist)
      return res
        .status(400)
        .send({ status: 'error', error: 'User already exists' })
    req.body.password = EncryptData.generateHash(req.body.password)
    const message = await UserModel.createUser(req.body)
    return res.status(201).send({ status: 'success', message })
  }

  static async createAdmin(req, res) {
    // Validate fields before creating Admin
    const { isError } = signupValidation(req.body)
    if (isError)
      return res.status(400).send({ status: 'error', error: isError.details })

    const adminExist = await AdminModel.getAdminEmail(req.body.email)
    if (adminExist)
      return res
        .status(400)
        .send({ status: 'error', error: 'Admin already exists' })
    req.body.password = EncryptData.generateHash(req.body.password)
    const message = await AdminModel.createAdmin(req.body)
    return res.status(201).send({ status: 'success', message })
  }

  static async loginUser(req, res) {
    // Validate fields before creating User
    const { error } = loginValidation(req.body)
    if (error)
      return res.status(400).send({ status: 'error', error: error.details })

    const token = createToken(
      { id: req.user.id, role: req.user.role },
      config.secretKey,
      { expiresIn: config.jwtExpiration },
    )
    return res
      .status(200)
      .send({ status: 'success', message: 'LoggedIn successfully', token })
  }
}

export default UserController
