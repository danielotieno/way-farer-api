import AdminModel from '../models/Admin'
import EncryptData from '../../helpers/EncryptPassword'

const { signupValidation } = require('../../helpers/validations')

class AdminController {
  static async createUser(req, res) {
    // Validate fields before creating Admin
    const { error } = signupValidation(req.body)
    if (error)
      return res.status(400).send({ status: 'error', error: error.details })

    const adminExist = await AdminModel.getAdminEmail(req.body.email)
    if (adminExist)
      return res
        .status(400)
        .send({ status: 'error', error: 'User already exists' })
    req.body.password = EncryptData.generateHash(req.body.password)
    const message = await AdminModel.createUser(req.body)
    return res.status(201).send({ status: 'success', message })
  }
}

export default AdminController
