// eslint-disable-next-line import/no-useless-path-segments
// eslint-disable-next-line import/named
import app from '../../index'

const request = require('supertest')

describe('Test the root path', () => {
  // eslint-disable-next-line prettier/prettier
  test('Can create trip', async() => {
    const payload = {
      bus_number: 'RAD 254 J',
      origin: 'Mombasa',
      destination: 'Kigali',
      // eslint-disable-next-line prettier/prettier
      fare: 4500.0,
    }
    const response = await request(app)
      .post('/api/v1/trips')
      .set('Content-Type', 'application/json')
      .send(payload)
    expect(JSON.parse(response.text).error[0].message).toEqual(
      // eslint-disable-next-line prettier/prettier
      '"seating_capacity" is required',
    )
  })
})
