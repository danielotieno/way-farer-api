import UserService from '../services/UserService'

class UserController {
  static async createUser(req, res) {
    UserService.registerUser(req, res)
  }

  static async createAdmin(req, res) {
    UserService.registerAdmin(req, res)
  }

  static async loginUser(req, res) {
    UserService.login(req, res)
  }
}

export default UserController
