import trips from './trips'

const apiPrefix = '/api/v1'

const routes = app => {
  app.use(apiPrefix, trips)
  return app
}

export default routes
