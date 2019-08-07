import UserModel from '../models/User'
import AdminModel from '../models/Admin'
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

  static async registerAdmin(req, res) {
    const adminExist = await AdminModel.getAdminEmail(req.body.email)
    if (adminExist)
      return res
        .status(400)
        .send({ status: 400, error: 'Admin already exists' })
    req.body.password = EncryptData.generateHash(req.body.password)
    const message = await AdminModel.createAdmin(req.body)
    return res.status(201).send({ status: 201, message })
  }
}

export default UserService
