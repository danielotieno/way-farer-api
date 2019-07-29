import app from '../../index'

const request = require('supertest')

describe('Test get a specific Trip', () => {
  // eslint-disable-next-line prettier/prettier
  test('It should reponse the GET method with ID', async() => {
    const response = await request(app).get('/api/v1/trips/1')
    expect(JSON.parse(response.text).error).toEqual('trip not found')
    expect(response.status).toBe(404)
  })
})
