import app from '../../index'

const request = require('supertest')

describe('Test PATCH a specific Trip', () => {
  test('It should respond with trip not found when passing wrong id', async () => {
    const response = await request(app).patch('/api/v1/trips/1/cancel')
    expect(JSON.parse(response.text).error).toEqual('Trip not found')
    expect(response.status).toBe(404)
  })

  test('It should retrive back a cancelled trip', async () => {
    const payload = {
      seatingCapacity: 24,
      busNumber: 'RAD 264 K',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4600.0,
    }
    const { body } = await request(app)
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    const response = await request(app).patch(
      `/api/v1/trips/${body.data.tripId}/cancel`,
    )
    expect(JSON.parse(response.text).status).toEqual(200)
    expect(JSON.parse(response.text).message).toEqual(
      'Trip cancelled successfully',
    )
    expect(response.status).toBe(200)
  })
})
