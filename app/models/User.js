import moment from 'moment'
import uuid from 'uuid'

const now = moment()

class UserModel {
  // class constructor

  constructor() {
    this.users = []
  }

  // Create a new Normal User
  createUser(data) {
    const newUser = {
      id: uuid.v4(),
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role || 'user',
      email: data.email,
      password: data.password,
      date_created: now.format('DD-MM-YYYY'),
    }
    this.users.push(newUser)
    return newUser
  }

  // Return an user with an email
  getUserEmail(email) {
    return this.users.find(user => user.email === email)
  }

  // Return an user with id
  getUserPassword(password) {
    return this.users.find(user => user.password === password)
  }

  // Return an user with the role
  getUserRole(role) {
    return this.users.find(user => user.role === role)
  }
}
export default new UserModel()
