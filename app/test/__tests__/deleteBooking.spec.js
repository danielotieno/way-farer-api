import app from '../../index'

const request = require('supertest')

describe('Test delete a booking', () => {
  test('It should respond with not found when passing wrong id', async () => {
    const response = await request(app).delete('/api/v1/bookings/1')
    expect(JSON.parse(response.text).status).toEqual(404)
    expect(JSON.parse(response.text).error).toEqual('Booking not found')
    expect(response.status).toBe(404)
  })
})
