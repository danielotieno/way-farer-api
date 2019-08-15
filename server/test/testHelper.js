import request from 'supertest'

const signupUser = async app => {
  const payload = {
    first_name: 'super',
    last_name: 'lorem',
    email: 'super@lorem.com',
    password: 'pass123456',
  }
  await request(app)
    .post('/api/v2/auth/signup/admin')
    .set('Content-Type', 'application/json')
    .send(payload)
}

const loginUser = async app => {
  const payload = {
    email: 'super@lorem.com',
    password: 'pass123456',
  }
  const response = await request(app)
    .post('/api/v2/auth/login')
    .set('Content-Type', 'application/json')
    .send(payload)
  const { token } = JSON.parse(response.text).data
  return token
}

const getToken = async app => {
  await signupUser(app)
  const token = await loginUser(app)
  return token
}

export default getToken
