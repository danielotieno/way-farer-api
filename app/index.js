import express from 'express'
import morgan from 'morgan'

import routes from './routes/api/v1'

const app = express()

// Body Parser middleware

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if (app.get('env') === 'development') {
  app.use(morgan('dev'))
}

routes(app)

export default app
