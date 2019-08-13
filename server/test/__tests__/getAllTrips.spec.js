import request from 'supertest'
import start from '../../index'
import getToken from '../testHelper'
import tables from '../../database/tableSql'

jest.setTimeout(10000)

describe('Test get all Trips', () => {
  let token
  let app
  beforeAll(async () => {
    await tables.createTables()
    app = await start()
    token = await getToken(app)
  })
  afterAll(async () => {
    await tables.dropTables()
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
