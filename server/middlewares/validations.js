/* eslint-disable camelcase */
// VALIDATIONS
import Joi from '@hapi/joi'

// Trip Fields Validations
const tripValidation = (req, res, next) => {
  const schema = {
    seating_capacity: Joi.number()
      .min(3)
      .max(50)
      .integer()
      .positive()
      .required(),
    bus_number: Joi.string()
      .alphanum()
      .trim()
      .required(),
    origin: Joi.string()
      .alphanum()
      .trim()
      .required(),
    destination: Joi.string()
      .alphanum()
      .trim()
      .required(),
    fare: Joi.number()
      .integer()
      .min(1000)
      .precision(2)
      .required(),
    trip_date: Joi.date()
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
  const {
    seating_capacity,
    bus_number,
    origin,
    destination,
    fare,
    trip_date,
  } = req.body
  const tripData = {
    seating_capacity,
    bus_number: bus_number.trim(),
    origin: origin.trim(),
    destination: destination.trim(),
    fare,
    trip_date,
  }
  req.body = tripData
  return next()
}

const signupValidation = (req, res, next) => {
  const schema = {
    first_name: Joi.string()
      .alphanum()
      .trim()
      .min(3)
      .max(30)
      .required(),
    last_name: Joi.string()
      .alphanum()
      .trim()
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
  const {
    first_name: firstName,
    last_name: lastName,
    email,
    password,
  } = req.body
  const userData = {
    first_name: firstName.trim(),
    last_name: lastName.trim(),
    email,
    password,
  }
  req.body = userData
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
    trip_id: Joi.number()
      .integer()
      .required(),
    number_of_seats: Joi.number()
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
