import request from 'supertest'
import start from '../../index'
import getToken from '../testHelper'
import tables from '../../database/tableSql'

jest.setTimeout(10000)

describe('Test get all Bookings', () => {
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
  test('It should return all bookings', async () => {
    const response = await request(app)
      .get('/api/v2/bookings')
      .set('Authorization', `Bearer ${token}`)
    expect(JSON.parse(response.text).status).toEqual(200)
    expect(JSON.parse(response.text).message).toEqual(
      'Successfully retrieve all bookings',
    )
    expect(response.status).toBe(200)
  })
})
