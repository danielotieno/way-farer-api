import request from 'supertest'
import start from '../../index'
import getToken from '../testHelper'
import tables from '../../database/tableSql'

jest.setTimeout(10000)

describe('Test delete a booking', () => {
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
  test('It should respond with not found when passing wrong id', async () => {
    const response = await request(app)
      .delete('/api/v2/bookings/1')
      .set('Authorization', `Bearer ${token}`)
    expect(JSON.parse(response.text).status).toEqual(404)
    expect(JSON.parse(response.text).error).toEqual('Booking not found')
    expect(response.status).toBe(404)
  })

  test('It should be able to delete all bookings', async () => {
    const payload = {
      seating_capacity: 24,
      bus_number: 'RAD 254 J',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4500.0,
      trip_date: '2019-08-27',
    }
    const response = await request(app)
      .post('/api/v2/trips')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    const result = JSON.parse(response.text)
    const { trip_id: tripId } = result.data
    const booking = {
      trip_id: tripId,
      number_of_seats: 4,
    }
    const { body } = await request(app)
      .post('/api/v2/bookings')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(booking)
    const res = await request(app)
      .delete(`/api/v2/bookings/${body.data.booking_id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(JSON.parse(res.text).status).toEqual(200)
    expect(JSON.parse(res.text).message).toEqual('Booking deleted successfully')
    expect(res.status).toBe(200)
  })
})
