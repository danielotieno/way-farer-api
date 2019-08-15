import request from 'supertest'
import start from '../../index'
import getToken from '../testHelper'
import tables from '../../database/tableSql'

jest.setTimeout(10000)

describe('Test PATCH a specific Trip', () => {
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
  test('It should respond with trip not found when passing wrong id', async () => {
    const response = await request(app)
      .patch('/api/v2/trips/1/cancel')
      .set('Authorization', `Bearer ${token}`)
    expect(JSON.parse(response.text).error).toEqual('Trip not found')
    expect(response.status).toBe(404)
  })

  test('It should retrive back a cancelled trip', async () => {
    const payload = {
      seating_capacity: 24,
      bus_number: 'RAD 264 K',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4600,
      trip_date: '2019-08-27',
    }
    const { body } = await request(app)
      .post('/api/v2/trips')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    const response = await request(app)
      .patch(`/api/v2/trips/${body.data.trip_id}/cancel`)
      .set('Authorization', `Bearer ${token}`)
    expect(JSON.parse(response.text).status).toEqual(200)
    expect(JSON.parse(response.text).message).toEqual(
      'Trip cancelled successfully',
    )
    expect(response.status).toBe(200)
  })
})
