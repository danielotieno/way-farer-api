import request from 'supertest'
import start from '../../index'
import getToken from '../testHelper'
import tables from '../../database/tableSql'

jest.setTimeout(10000)

describe('Test get a specific Trip', () => {
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
      .get('/api/v2/trips/1')
      .set('Authorization', `Bearer ${token}`)
    expect(JSON.parse(response.text).error).toEqual('Trip not found')
    expect(response.status).toBe(404)
  })

  test('It should retrive back a trip with specific ID', async () => {
    const payload = {
      seatingCapacity: 24,
      busNumber: 'RAD 264 K',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4600.0,
      tripDate: '2019-08-27',
    }
    const { body } = await request(app)
      .post('/api/v2/trips')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    const response = await request(app)
      .get(`/api/v2/trips/${body.data.trip_id}`)
      .set('Authorization', `Bearer ${token}`)
    expect(response.body.data).toHaveProperty('seating_capacity', 24)
    expect(response.body.data).toHaveProperty('bus_number', 'RAD 264 K')
    expect(response.body.data).toHaveProperty('origin', 'Mombasa')
    expect(response.body.data).toHaveProperty('destination', 'Kigali')
    expect(response.body.data).toHaveProperty('fare', 4600.0)
    expect(JSON.parse(response.text).status).toEqual(200)
    expect(JSON.parse(response.text).message).toEqual(
      'Successfully retrieved a Trip',
    )
    expect(response.status).toBe(200)
  })
})
