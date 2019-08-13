// VALIDATIONS
import Joi from '@hapi/joi'

// Trip Fields Validations
const tripValidation = (req, res, next) => {
  const schema = {
    seatingCapacity: Joi.number()
      .min(3)
      .max(50)
      .integer()
      .positive()
      .required(),
    busNumber: Joi.string()
      .trim()
      .required(),
    origin: Joi.string()
      .trim()
      .required(),
    destination: Joi.string()
      .trim()
      .required(),
    fare: Joi.number()
      .precision(2)
      .required(),
    tripDate: Joi.date()
      .min('now')
      .raw()
      .required()
      .label('Date must be of format YYYY-MM-DD'),
  }
  const { error } = Joi.validate(req.body, schema, { abortEarly: false })

  if (error) {
    return res
      .status(400)
      .send({ status: 'error', error: error.details[0].message })
  }

  return next()
}

const signupValidation = (req, res, next) => {
  const schema = {
    first_name: Joi.string()
      .regex(/^\S+$/)
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .label('first_name should not be empty or have whitespaces'),
    last_name: Joi.string()
      .regex(/^\S+$/)
      .alphanum()
      .min(3)
      .max(30)
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .min(8)
      .required(),
  }
  const { error } = Joi.validate(req.body, schema, { abortEarly: false })

  if (error) {
    return res
      .status(400)
      .send({ status: 'error', error: error.details[0].message })
  }

  return next()
}

const loginValidation = (req, res, next) => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9]{3,30}$/)
      .min(8)
      .required(),
  }
  const { error } = Joi.validate(req.body, schema, { abortEarly: false })

  if (error) {
    return res
      .status(400)
      .send({ status: 'error', error: error.details[0].message })
  }

  return next()
}

const bookingValidation = (req, res, next) => {
  const schema = {
    tripId: Joi.string().required(),
    numberOfSeats: Joi.number()
      .integer()
      .required(),
  }
  const { error } = Joi.validate(req.body, schema, { abortEarly: false })

  if (error) {
    return res
      .status(400)
      .send({ status: 'error', error: error.details[0].message })
  }
  next()
}

module.exports = {
  tripValidation,
  signupValidation,
  loginValidation,
  bookingValidation,
}
