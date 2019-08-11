import request from 'supertest'
import app from '../../index'
import getToken from '../testHelper'

describe('Test Authentication', () => {
  let token
  beforeEach(async () => {
    token = await getToken()
  })
  test('It should register user successfully', async () => {
    const payload = {
      firstName: 'Daniel',
      lastName: 'Otieno',
      email: 'oti@gmail.com',
      password: '123456789',
    }
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(response.body.data).toHaveProperty('first_name', 'Daniel')
    expect(response.body.data).toHaveProperty('last_name', 'Otieno')
    expect(response.body.data).toHaveProperty('email', 'oti@gmail.com')
    expect(JSON.parse(response.text).status).toEqual(201)
    expect(JSON.parse(response.text).message).toEqual(
      'User created successfully',
    )
    expect(response.status).toBe(201)
  })

  test('It should register admin successfully', async () => {
    const payload = {
      firstName: 'Daniel',
      lastName: 'Otieno',
      email: 'oti@gmail.com',
      password: '123456789',
    }
    const response = await request(app)
      .post('/api/v1/auth/signup/admin')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).status).toEqual(400)
    expect(JSON.parse(response.text).error).toEqual('User already exists')
    expect(response.status).toBe(400)
  })

  test('Admin already exists when creating admin with the same email', async () => {
    const payload = {
      lastName: 'Otieno',
      email: 'oti@gmail.com',
      password: '123456789',
    }
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error).toEqual('"firstName" is required')
    expect(response.status).toBe(400)
  })

  test('That lastName is required when creating a user', async () => {
    const payload = {
      firstName: 'Daniel',
      email: 'oti@gmail.com',
      password: '123456789',
    }
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error).toEqual('"lastName" is required')
    expect(response.status).toBe(400)
  })

  test('That email is required to register user', async () => {
    const payload = {
      firstName: 'Daniel',
      lastName: 'Otieno',
      password: '123456789',
    }
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error).toEqual('"email" is required')
    expect(response.status).toBe(400)
  })

  test('That password is required to register user', async () => {
    const payload = {
      firstName: 'Daniel',
      lastName: 'Otieno',
      email: 'dan@gmail.com',
    }
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error).toEqual('"password" is required')
    expect(response.status).toBe(400)
  })

  test('That email is invalid', async () => {
    const payload = {
      firstName: 'Daniel',
      lastName: 'Otieno',
      email: 'dan@gmail',
      password: '123456789',
    }
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error).toEqual(
      '"email" must be a valid email',
    )
    expect(response.status).toBe(400)
  })

  test('That password is short', async () => {
    const payload = {
      firstName: 'Daniel',
      lastName: 'Otieno',
      email: 'dan@gmail.com',
      password: '12345',
    }
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error).toEqual(
      '"password" length must be at least 8 characters long',
    )
    expect(response.status).toBe(400)
  })

  test('It should return invalid when login with wrong credential', async () => {
    const payload = {
      email: 'dan@gmail.com',
      password: '123456789',
    }
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error).toEqual('Invalid email or password')
    expect(response.status).toBe(400)
  })

  test('It should login user successfully', async () => {
    const payload = {
      firstName: 'Daniel',
      lastName: 'Otieno',
      email: 'oti@gmail.com',
      password: '123456789',
    }
    await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(payload)
    const credentials = {
      email: 'oti@gmail.com',
      password: '123456789',
    }
    const response = await request(app)
      .post('/api/v1/auth/login')
      .set('Content-Type', 'application/json')
      .send(credentials)
    expect(JSON.parse(response.text).status).toEqual(200)
    expect(JSON.parse(response.text).message).toEqual('Logged In successfully')
    expect(response.status).toBe(200)
  })
})
