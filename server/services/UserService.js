import UserModel from '../models/User'
import EncryptData from '../helpers/EncryptPassword'
import createToken from '../helpers/jwtToken'
import config from '../config/config'

class UserService {
  static async registerUser(req, res) {
    try {
      const existingUser = await UserModel.getUserByEmail(req.body.email)
      if (existingUser)
        return res
          .status(400)
          .send({ status: 400, error: 'User already exists' })
      req.body.password = EncryptData.generateHash(req.body.password)
      req.body.role = 'user'
      await UserModel.createUser(req.body)
      const user = {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email,
      }
      return res
        .status(201)
        .send({ status: 201, message: 'User created successfully', data: user })
    } catch (error) {
      return error
    }
  }

  static async registerAdmin(req, res) {
    const userExist = UserModel.getUserByEmail(req.body.email)
    if (userExist)
      return res.status(400).send({ status: 400, error: 'User already exists' })
    req.body.password = EncryptData.generateHash(req.body.password)
    req.body.role = 'admin'
    const message = UserModel.createUser(req.body)
    return res.status(201).send({ status: 201, message })
  }

  static async login(req, res) {
    const token = createToken(
      { id: req.user.userId, role: req.user.role },
      config.secretKey,
      { expiresIn: config.jwtExpiration },
    )
    const loggedInUser = {
      token,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
    }
    return res.status(200).send({
      status: 200,
      message: 'Logged In successfully',
      data: loggedInUser,
    })
  }
}

export default UserService
