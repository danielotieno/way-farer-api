import passport from 'passport'
import UserModel from '../app/models/User'
import EncryptData from '../helpers/EncryptPassword'

const LocalStrategy = require('passport-local').Strategy
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')
const { secretKey, jwtExpiration } = require('./config')

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
    },
    async (email, password, done) => {
      const user = await UserModel.getUserEmail(email)
      if (!user) return done('User does not exist')
      const passwordMatch = await EncryptData.comparePassword(
        password,
        user.password,
      )
      if (passwordMatch) return done(null, user)
      return done('Incorrect email or Password')
    },
  ),
)

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secretKey,
      jsonWebTokenOptions: { maxAge: jwtExpiration },
    },
    (jwtPayload, done) => done(null, jwtPayload),
  ),
)

const localAuthentication = passport.authenticate('local', {
  session: false,
})

const jwtAuthentication = passport.authenticate('jwt', { session: false })

module.exports = {
  localAuthentication,
  jwtAuthentication,
}
