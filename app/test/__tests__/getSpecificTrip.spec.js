import app from '../../index'

const request = require('supertest')

describe('Test get a specific Trip', () => {
  // eslint-disable-next-line prettier/prettier
  test('It should reponse the GET method with ID', async() => {
    const response = await request(app).get('/api/v1/trips/1')
    expect(JSON.parse(response.text).error).toEqual('trip not found')
    expect(response.status).toBe(404)
  })

  // eslint-disable-next-line prettier/prettier
  test('It should reponse the GET method with ID', async() => {
    const payload = {
      seating_capacity: 10,
      bus_number: 'RAD 264 K',
      origin: 'Mombasa',
      destination: 'Kigali',
      fare: 4600.0,
    }
    await request(app)
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    const response = await request(app).get('/api/v1/trips')
    expect(JSON.parse(response.text).status).toBe('success')
    expect(response.status).toBe(200)
  })
})
