import app from '../../index'

const request = require('supertest')

describe('Test creating a trip', () => {
  test('Create a trip without seating capacity', async () => {
    const payload = {
      busNumber: 'RAD 254 J',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4500.0,
    }
    const response = await request(app)
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error[0].message).toEqual(
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
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error[0].message).toEqual(
      '"busNumber" is required',
    )
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
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error[0].message).toEqual(
      '"origin" is required',
    )
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
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error[0].message).toEqual(
      '"destination" is required',
    )
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
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error[0].message).toEqual(
      '"fare" is required',
    )
    expect(response.status).toBe(400)
  })

  test('Create a trip successfully', async () => {
    const payload = {
      seatingCapacity: 10,
      busNumber: 'RAD 264 K',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4600.0,
    }
    const response = await request(app)
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).status).toEqual(
      'Trip created successfully',
    )
    expect(response.status).toBe(201)
  })
})
