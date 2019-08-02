import UserModel from '../models/User'
import EncryptData from '../../helpers/EncryptPassword'
import createToken from '../../helpers/jwtToken'

const { secretKey, jwtExpiration } = require('../../config/config')

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

  static async loginUser(req, res) {
    // Validate fields before creating User
    const { error } = loginValidation(req.body)
    if (error)
      return res.status(400).send({ status: 'error', error: error.details })

    const token = createToken(
      { id: req.user.id, role: req.user.role },
      secretKey,
      { expiresIn: jwtExpiration },
    )
    return res
      .status(200)
      .send({ status: 'success', message: 'LoggedIn successfully', token })
  }
}

export default UserController
