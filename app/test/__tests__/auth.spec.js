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
})
