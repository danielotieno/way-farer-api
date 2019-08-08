import request from 'supertest'
import app from '../../index'
import getToken from '../testHelper'

describe('Test PATCH a specific Trip', () => {
  let token
  beforeEach(async () => {
    token = await getToken()
  })
  test('It should respond with trip not found when passing wrong id', async () => {
    const response = await request(app)
      .patch('/api/v1/trips/1/cancel')
      .set('Authorization', `Bearer ${token}`)
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
      tripDate: '2019-08-27',
    }
    const { body } = await request(app)
      .post('/api/v1/trips')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    const response = await request(app)
      .patch(`/api/v1/trips/${body.data.tripId}/cancel`)
      .set('Authorization', `Bearer ${token}`)
    expect(JSON.parse(response.text).status).toEqual(200)
    expect(JSON.parse(response.text).message).toEqual(
      'Trip cancelled successfully',
    )
    expect(response.status).toBe(200)
  })
})
