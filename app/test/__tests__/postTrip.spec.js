import app from '../../index'

const request = require('supertest')

describe('Test the root path', () => {
  // eslint-disable-next-line prettier/prettier
  test('Create a trip without seating capacity', async() => {
    const payload = {
      bus_number: 'RAD 254 J',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4500.0,
    }
    const response = await request(app)
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error[0].message).toEqual(
      '"seating_capacity" is required',
    )
    expect(response.status).toBe(400)
  })

  // eslint-disable-next-line prettier/prettier
  test('Create a trip without bus number', async() => {
    const payload = {
      seating_capacity: 10,
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4500.0,
    }
    const response = await request(app)
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error[0].message).toEqual(
      '"bus_number" is required',
    )
    expect(response.status).toBe(400)
  })

  // eslint-disable-next-line prettier/prettier
  test('Create a trip without origin', async() => {
    const payload = {
      seating_capacity: 10,
      bus_number: 'RAD 264 K',
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

  // eslint-disable-next-line prettier/prettier
  test('Create a trip without destination', async() => {
    const payload = {
      seating_capacity: 10,
      bus_number: 'RAD 264 K',
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

  // eslint-disable-next-line prettier/prettier
  test('Create a trip without fare', async() => {
    const payload = {
      seating_capacity: 10,
      bus_number: 'RAD 264 K',
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

  // eslint-disable-next-line prettier/prettier
  test('Create a trip successfully', async() => {
    const payload = {
      seating_capacity: 10,
      bus_number: 'RAD 264 K',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4600.0,
    }
    const response = await request(app)
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).status).toEqual(
      'trip created successfully',
    )
    expect(response.status).toBe(201)
  })
})
