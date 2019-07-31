import UserModel from '../models/User'

const { signupValidation } = require('../../helpers/validations')

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

    const user = await UserModel.createUser(req.body)
    return res
      .status(201)
      .send({ status: 'User created successfully', data: user })
  }
}

export default UserController
