import express from 'express'
import morgan from 'morgan'
import passport from 'passport'
import routes from './routes/api/v2'
import UserModel from './models/User'

const app = express()

// Body Parser middleware

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

if (app.get('env') === 'development') {
  app.use(morgan('dev'))
}
app.use(passport.initialize())
routes(app)

const start = async () => {
  await UserModel.createAdmin()
  return app
}
export default start
