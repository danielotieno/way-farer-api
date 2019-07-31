import app from '../../index'

const request = require('supertest')

describe('Test Authentication', () => {
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
    expect(JSON.parse(response.text).status).toEqual(
      'User created successfully',
    )
    expect(response.status).toBe(201)
  })

  test('That firstName is required when creating a user', async () => {
    const payload = {
      lastName: 'Otieno',
      email: 'oti@gmail.com',
      password: '123456789',
    }
    const response = await request(app)
      .post('/api/v1/auth/signup')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error[0].message).toEqual(
      '"firstName" is required',
    )
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
    expect(JSON.parse(response.text).error[0].message).toEqual(
      '"lastName" is required',
    )
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
    expect(JSON.parse(response.text).error[0].message).toEqual(
      '"email" is required',
    )
    expect(response.status).toBe(400)
  })
})
