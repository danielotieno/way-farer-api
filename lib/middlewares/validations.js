// VALIDATIONS
import Joi from '@hapi/joi'

// Trip Fields Validations
const tripValidation = (req, res, next) => {
  const schema = {
    seatingCapacity: Joi.number()
      .min(3)
      .max(24)
      .integer()
      .positive()
      .required(),
    busNumber: Joi.string().required(),
    origin: Joi.string().required(),
    destination: Joi.string().required(),
    fare: Joi.number()
      .precision(2)
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

// Register User Validations
const signupValidation = (req, res, next) => {
  const schema = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
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

// Login User Validations
const loginValidation = (req, res, next) => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
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

// Login User Validations
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
