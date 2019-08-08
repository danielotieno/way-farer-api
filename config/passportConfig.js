import passport from 'passport'
import UserModel from '../app/models/User'
import EncryptData from '../lib/helpers/EncryptPassword'
import config from './config'

const LocalStrategy = require('passport-local').Strategy
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const user = await UserModel.getUserByEmail(email)
      if (!user) return done('Invalid email or password')
      const passwordMatch = await EncryptData.comparePassword(
        password,
        user.password,
      )
      if (passwordMatch) return done(null, user)
      return done('Invalid email or Password')
    },
  ),
)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.secretKey,
      jsonWebTokenOptions: { maxAge: config.jwtExpiration },
    },
    (jwtPayload, done) => done(null, jwtPayload),
  ),
)

const localAuthentication = (req, res, next) => {
  passport.authenticate(
    'local',
    { session: false, failWithError: true },
    (err, user) => {
      if (err)
        return res.status(401).json({
          status: 401,
          error: err,
        })
      req.user = user
      return next()
    },
  )(req, res, next)
}

const jwtAuthentication = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) return next(err)
    if (!user)
      return res.status(401).json({
        status: 401,
        error:
          'Unauthorized, You do not have permission to access this resource',
      })
    req.user = user
    next()
  })(req, res, next)
}

module.exports = {
  localAuthentication,
  jwtAuthentication,
}
