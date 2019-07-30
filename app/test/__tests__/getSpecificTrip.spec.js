import app from '../../index'

const request = require('supertest')

describe('Test get a specific Trip', () => {
  // eslint-disable-next-line prettier/prettier
  test('It should respond with not found when passing wrong id', async() => {
    const response = await request(app).get('/api/v1/trips/1')
    expect(JSON.parse(response.text).error).toEqual('Trip not found')
    expect(response.status).toBe(404)
  })

  // eslint-disable-next-line prettier/prettier
  test('It should retrive back a trip with specific ID', async() => {
    const payload = {
      seatingCapacity: 24,
      busNumber: 'RAD 264 K',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4600.0,
    }
    const { body } = await request(app)
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    const response = await request(app).get(`/api/v1/trips/${body.data.id}`)
    expect(response.body.data).toHaveProperty('seatingCapacity', 24)
    expect(response.body.data).toHaveProperty('busNumber', 'RAD 264 K')
    expect(response.body.data).toHaveProperty('origin', 'Mombasa')
    expect(response.body.data).toHaveProperty('destination', 'Kigali')
    expect(response.body.data).toHaveProperty('fare', 4600.0)
    expect(JSON.parse(response.text).status).toEqual('success')
    expect(response.status).toBe(200)
  })
})
