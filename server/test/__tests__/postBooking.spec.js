import request from 'supertest'
import start from '../../index'
import getToken from '../testHelper'
import tables from '../../database/tableSql'

jest.setTimeout(10000)

describe('Test POST a Booking', () => {
  let token
  let app
  beforeAll(async () => {
    await tables.createTables()
    app = await start()
    token = await getToken(app)
  })
  afterAll(async () => {
    await tables.dropTables()
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
    const res = await request(app)
      .post('/api/v2/bookings')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(booking)

    expect(JSON.parse(res.text).status).toEqual(201)
    expect(JSON.parse(res.text).message).toEqual('Booking created successfully')
    expect(res.status).toBe(201)
  })
})
