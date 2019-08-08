import request from 'supertest'
import app from '../../index'
import getToken from '../testHelper'

describe('Test delete a booking', () => {
  let token
  beforeEach(async () => {
    token = await getToken()
  })
  test('It should respond with not found when passing wrong id', async () => {
    const response = await request(app)
      .delete('/api/v1/bookings/1')
      .set('Authorization', `Bearer ${token}`)
    expect(JSON.parse(response.text).status).toEqual(404)
    expect(JSON.parse(response.text).error).toEqual('Booking not found')
    expect(response.status).toBe(404)
  })

  test('It should be able to delete all bookings', async () => {
    const payload = {
      seatingCapacity: 24,
      busNumber: 'RAD 254 J',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4500.0,
    }
    const response = await request(app)
      .post('/api/v1/trips')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    const result = JSON.parse(response.text)
    const { tripId } = result.data

    const booking = {
      tripId,
      numberOfSeats: 4,
    }
    const { body } = await request(app)
      .post('/api/v1/bookings')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(booking)
    const res = await request(app)
      .delete(`/api/v1/bookings/${body.data.bookingId}`)
      .set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(204)
  })
})
