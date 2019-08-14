/* eslint-disable class-methods-use-this */
import EncryptData from '../helpers/EncryptPassword'
import db from '../database/dbConnection'

class UserModel {
  // class constructor

  async createAdmin() {
    const admin = {
      firstName: 'super',
      lastName: 'admin',
      role: 'admin',
      email: 'super@lorem.com',
      password: EncryptData.generateHash('pass123456'),
    }
    try {
      const existingAdmin = await this.getUserByEmail(admin.email)
      if (!existingAdmin) {
        return await db.none(
          'INSERT INTO users(first_name, last_name, role, email, password) VALUES($[firstName], $[lastName], $[role], $[email], $[password])',
          admin,
        )
      }
    } catch (error) {
      return error
    }
  }

  async createUser(data) {
    const newUser = {
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role || 'user',
      email: data.email,
      password: data.password,
    }
    try {
      return await db.one(
        'INSERT INTO users(first_name, last_name, role, email, password) VALUES($[firstName], $[lastName], $[role], $[email], $[password]) RETURNING user_id',
        newUser,
      )
    } catch (error) {
      return error
    }
  }

  // Return an user with userId
  async getUserById(userId) {
    console.log('User ID:', userId)
    return db.oneOrNone('select * from users where user_id = $1', userId)
  }

  // Return an user with an email
  async getUserByEmail(email) {
    return db.oneOrNone('select * from users where email = $1', email)
  }
}
export default new UserModel()
