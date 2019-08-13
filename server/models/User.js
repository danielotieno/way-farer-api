/* eslint-disable class-methods-use-this */
import EncryptData from '../helpers/EncryptPassword'
import db from '../database/dbConnection'

class UserModel {
  // class constructor

  createAdmin() {
    const admin = {
      firstName: 'super',
      lastName: 'admin',
      role: 'admin',
      email: 'super@lorem.com',
      password: EncryptData.generateHash('pass123456'),
    }
    try {
      db.none(
        'INSERT INTO users(first_name, last_name, role, email, password) VALUES($[firstName], $[lastName], $[role], $[email], $[password])',
        admin,
      )
    } catch (error) {
      return error
    }
  }

  // Create a new Normal User
  async createUser(data) {
    const newUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role || 'user',
      email: data.email,
      password: data.password,
    }
    try {
      return await db.none(
        'INSERT INTO users(first_name, last_name, role, email, password) VALUES($[firstName], $[lastName], $[role], $[email], $[password])',
        newUser,
      )
    } catch (error) {
      return error
    }
  }

  // Return an user with userId
  getUserById(userId) {
    return this.users.find(user => user.userId === userId)
  }

  // Return an user with an email
  async getUserByEmail(email) {
    return db.oneOrNone('select * from users where email = $1', email)
  }
}
export default new UserModel()
