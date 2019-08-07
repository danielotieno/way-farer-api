import createToken from '../../lib/helpers/jwtToken'
import config from '../../config/config'
import UserService from '../services/UserService'

class UserController {
  static async createUser(req, res) {
    UserService.registerUser(req, res)
  }

  static async createAdmin(req, res) {
    UserService.registerAdmin(req, res)
  }

  static async loginUser(req, res) {
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
