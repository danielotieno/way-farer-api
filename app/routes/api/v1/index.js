import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from '../../../swagger.json'
import trips from './trips'
import auth from './auth'
import bookings from './bookings'

const apiPrefix = '/api/v1'

const routes = app => {
  app.use(apiPrefix, trips)
  app.use(apiPrefix, auth)
  app.use(apiPrefix, bookings)

  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  app.use('*', (req, res) =>
    res.status(404).json({ message: 'Kindly, check if your URL is correct' }),
  )

  return app
}

export default routes
