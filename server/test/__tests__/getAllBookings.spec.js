import request from 'supertest'
import app from '../../index'
import getToken from '../testHelper'

describe('Test get all Bookings', () => {
  let token
  beforeEach(async () => {
    token = await getToken()
  })
  test('It should return no bookings when booking array is empty', async () => {
    const response = await request(app)
      .get('/api/v2/bookings')
      .set('Authorization', `Bearer ${token}`)
    expect(JSON.parse(response.text).status).toEqual(200)
    expect(JSON.parse(response.text).message).toEqual('There are no bookings')

    expect(response.status).toBe(200)
  })

  test('It should be able to get all bookings', async () => {
    const payload = {
      seatingCapacity: 24,
      busNumber: 'RAD 254 J',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4500.0,
      tripDate: '2019-08-27',
    }
    const response = await request(app)
      .post('/api/v2/trips')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    const result = JSON.parse(response.text)
    const { trip_id: tripId } = result.data

    const booking = {
      tripId,
      numberOfSeats: 4,
    }
    await request(app)
      .post('/api/v2/bookings')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(booking)
    const res = await request(app)
      .get('/api/v2/bookings')
      .set('Authorization', `Bearer ${token}`)
    expect(JSON.parse(res.text).status).toEqual(200)
    expect(JSON.parse(res.text).message).toEqual(
      'Successfully retrieve all bookings',
    )
    expect(res.status).toBe(200)
  })
})
