import request from 'supertest'
import app from '../../index'
import getToken from '../testHelper'

describe('Test get all Trips', () => {
  let token
  beforeEach(async () => {
    token = await getToken()
  })
  test('It should reponse the GET method', async () => {
    const response = await request(app)
      .get('/api/v2/trips')
      .set('Authorization', `Bearer ${token}`)
    expect(JSON.parse(response.text).status).toEqual(200)
    expect(JSON.parse(response.text).message).toEqual(
      'Trips retrieved successfully',
    )

    expect(response.status).toBe(200)
  })
})
