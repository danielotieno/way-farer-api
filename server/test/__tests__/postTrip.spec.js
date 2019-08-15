import request from 'supertest'
import start from '../../index'
import getToken from '../testHelper'
import tables from '../../database/tableSql'

jest.setTimeout(10000)

describe('Test creating a trip', () => {
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
  test('Create a trip without seating capacity', async () => {
    const payload = {
      bus_number: 'RAD 254 J',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4500.0,
    }
    const response = await request(app)
      .post('/api/v2/trips')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error).toEqual(
      '"seating_capacity" is required',
    )
    expect(response.status).toBe(400)
  })

  test('Create a trip without bus number', async () => {
    const payload = {
      seating_capacity: 10,
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4500.0,
    }
    const response = await request(app)
      .post('/api/v2/trips')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error).toEqual('"bus_number" is required')
    expect(response.status).toBe(400)
  })

  test('Create a trip without origin', async () => {
    const payload = {
      seating_capacity: 10,
      bus_number: 'RAD 264 K',
      destination: 'Kigali',
      fare: 4500.0,
    }

    const response = await request(app)
      .post('/api/v2/trips')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error).toEqual('"origin" is required')
    expect(response.status).toBe(400)
  })

  test('Create a trip without destination', async () => {
    const payload = {
      seating_capacity: 10,
      bus_number: 'RAD 264 K',
      origin: 'Mombasa',
      fare: 4500.0,
    }
    const response = await request(app)
      .post('/api/v2/trips')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error).toEqual('"destination" is required')
    expect(response.status).toBe(400)
  })

  test('Create a trip without fare', async () => {
    const payload = {
      seating_capacity: 10,
      bus_number: 'RAD 264 K',
      origin: 'Mombasa',
      destination: 'Kigali',
    }
    const response = await request(app)
      .post('/api/v2/trips')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error).toEqual('"fare" is required')
    expect(response.status).toBe(400)
  })

  test('Create a trip successfully', async () => {
    const payload = {
      seating_capacity: 10,
      bus_number: 'RAD 264 K',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4600.0,
      trip_date: '2019-10-15',
    }
    const response = await request(app)
      .post('/api/v2/trips')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).status).toEqual(201)
    expect(JSON.parse(response.text).message).toEqual(
      'Trip created successfully',
    )
    expect(response.status).toBe(201)
  })
})
