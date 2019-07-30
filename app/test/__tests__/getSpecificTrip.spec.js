import app from '../../index'

const request = require('supertest')

describe('Test get a specific Trip', () => {
  // eslint-disable-next-line prettier/prettier
  test('It should respond with not found when passing wrong id', async() => {
    const response = await request(app).get('/api/v1/trips/1')
    expect(JSON.parse(response.text).error).toEqual('trip not found')
    expect(response.status).toBe(404)
  })

  // eslint-disable-next-line prettier/prettier
  test('It should retrive back a trip with specific ID', async() => {
    const payload = {
      seating_capacity: 24,
      bus_number: 'RAD 264 K',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4600.0,
    }
    const { body } = await request(app)
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    const response = await request(app).get(`/api/v1/trips/${body.data.id}`)
    expect(response.body.trip).toHaveProperty('seating_capacity', 24)
    expect(JSON.parse(response.text).status).toEqual('success')
    expect(response.status).toBe(200)
  })
})
