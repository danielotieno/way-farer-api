import app from '../../index'

const request = require('supertest')

describe('Test get all Bookings', () => {
  test('It should return all the bookings successfully', async () => {
    const response = await request(app).get('/api/v1/bookings')
    expect(JSON.parse(response.text).status).toEqual(200)
    expect(JSON.parse(response.text).message).toEqual(
      'Successfully retrieve all bookings',
    )

    expect(response.status).toBe(200)
  })
})
