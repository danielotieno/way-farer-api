import moment from 'moment'
import uuid from 'uuid'

const now = moment()

class AdminModel {
  // class constructor

  constructor() {
    this.admins = []
  }

  // Create a new Normal User
  createAdmin(data) {
    const newAdmin = {
      id: uuid.v4(),
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role || 'admin',
      email: data.email,
      password: data.password,
      date_created: now.format('DD-MM-YYYY'),
    }
    this.admins.push(newAdmin)
    return 'Admin created successfully'
  }

  // Return an admin with an email
  getAdminEmail(email) {
    return this.admins.find(admin => admin.email === email)
  }

  // Return an admin with the role
  getAdminRole(role) {
    return this.admins.find(admin => admin.role === role)
  }
}
export default new AdminModel()