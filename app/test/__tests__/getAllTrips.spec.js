import app from '../../index'

const request = require('supertest')

describe('Test get all Trips', () => {
  // eslint-disable-next-line prettier/prettier
  test('It should reponse the GET method', async() => {
    const response = await request(app).get('/api/v1/trips')
    expect(JSON.parse(response.text).status).toEqual('success')
    expect(response.status).toBe(200)
  })
})
