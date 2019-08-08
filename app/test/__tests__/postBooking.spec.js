import request from 'supertest'
import app from '../../index'
import getToken from '../testHelper'

describe('Test POST a Booking', () => {
  let token
  beforeEach(async () => {
    token = await getToken()
  })

  test('It should be able to create a booking', async () => {
    const payload = {
      seatingCapacity: 24,
      busNumber: 'RAD 254 J',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4500.0,
      tripDate: '2019-08-27',
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
    const res = await request(app)
      .post('/api/v1/bookings')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(booking)

    expect(JSON.parse(res.text).status).toEqual(201)
    expect(JSON.parse(res.text).message).toEqual('Booking created successfully')
    expect(res.status).toBe(201)
  })
})
