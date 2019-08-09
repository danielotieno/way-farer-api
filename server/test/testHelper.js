import request from 'supertest'
import app from '..'

const signupUser = async () => {
  const payload = {
    firstName: 'Daniel',
    lastName: 'Otieno',
    email: 'oti@gmail.com',
    password: '123456789',
  }
  await request(app)
    .post('/api/v1/auth/signup/admin')
    .set('Content-Type', 'application/json')
    .send(payload)
}

const loginUser = async () => {
  const payload = {
    email: 'super@lorem.com',
    password: 'pass123456',
  }
  const response = await request(app)
    .post('/api/v1/auth/login')
    .set('Content-Type', 'application/json')
    .send(payload)
  const { token } = JSON.parse(response.text).data
  return token
}

const getToken = async () => {
  await signupUser()
  const token = await loginUser()
  return token
}

export default getToken
