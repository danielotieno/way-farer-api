import moment from 'moment'
import uuid from 'uuid'

class UserModel {
  // class constructor

  constructor() {
    this.users = []
  }

  // Create a new Normal User
  createUser(data) {
    const newUser = {
      userId: uuid.v4(),
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role || 'user',
      email: data.email,
      password: data.password,
      date_created: moment().format('DD-MM-YYYY'),
    }
    this.users.push(newUser)
    return newUser.userId
  }

  // Return an user with userId
  getUserById(userId) {
    return this.users.find(user => user.userId === userId)
  }

  // Return an user with an email
  getUserByEmail(email) {
    return this.users.find(user => user.email === email)
  }
}
export default new UserModel()
