import request from 'supertest'
import app from '../../index'
import getToken from '../testHelper'

describe('Test creating a trip', () => {
  let token
  beforeEach(async () => {
    token = await getToken()
  })
  test('Create a trip without seating capacity', async () => {
    const payload = {
      busNumber: 'RAD 254 J',
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
      '"seatingCapacity" is required',
    )
    expect(response.status).toBe(400)
  })

  test('Create a trip without bus number', async () => {
    const payload = {
      seatingCapacity: 10,
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4500.0,
    }
    const response = await request(app)
      .post('/api/v2/trips')
      .set('Authorization', `Bearer ${token}`)
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error).toEqual('"busNumber" is required')
    expect(response.status).toBe(400)
  })

  test('Create a trip without origin', async () => {
    const payload = {
      seatingCapacity: 10,
      busNumber: 'RAD 264 K',
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
      seatingCapacity: 10,
      busNumber: 'RAD 264 K',
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
      seatingCapacity: 10,
      busNumber: 'RAD 264 K',
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
      seatingCapacity: 10,
      busNumber: 'RAD 264 K',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4600.0,
      tripDate: '2019-10-15',
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
