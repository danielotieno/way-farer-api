import app from '../../index'

const request = require('supertest')

describe('Test get all Trips', () => {
  test('It should reponse the GET method', async () => {
    const response = await request(app).get('/api/v1/trips')
    expect(JSON.parse(response.text).status).toEqual(200)
    expect(JSON.parse(response.text).message).toEqual(
      'Trips retrieved successfully',
    )

    expect(response.status).toBe(200)
  })
})
