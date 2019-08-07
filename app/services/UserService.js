import UserModel from '../models/User'
import EncryptData from '../../lib/helpers/EncryptPassword'

class UserService {
  static async registerUser(req, res) {
    const userExist = UserModel.getUserByEmail(req.body.email)
    if (userExist)
      return res.status(400).send({ status: 400, error: 'User already exists' })
    req.body.password = EncryptData.generateHash(req.body.password)
    const userId = UserModel.createUser(req.body)
    return res
      .status(201)
      .send({ status: 201, message: 'User created successfully', userId })
  }
}

export default UserService
