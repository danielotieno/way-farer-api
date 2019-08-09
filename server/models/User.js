import moment from 'moment'
import uuid from 'uuid'
import EncryptData from '../helpers/EncryptPassword'

class UserModel {
  // class constructor

  constructor() {
    this.users = []
    this.createAdmin()
  }

  createAdmin() {
    const admin = {
      userId: uuid.v4(),
      firstName: 'super',
      lastName: 'admin',
      role: 'admin',
      email: 'super@lorem.com',
      password: EncryptData.generateHash('pass123456'),
      date_created: moment().format('DD-MM-YYYY'),
    }
    this.users.push(admin)
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
    return 'User created successfully'
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
