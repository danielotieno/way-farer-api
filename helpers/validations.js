// VALIDATIONS
import Joi from '@hapi/joi'

// Trip Fields Validations
const tripValidation = data => {
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
  return Joi.validate(data, schema, { abortEarly: false })
}

// Register User Validations
const signupValidation = data => {
  const schema = {
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .required(),
  }
  return Joi.validate(data, schema, { abortEarly: false })
}

module.exports.tripValidation = tripValidation
module.exports.signupValidation = signupValidation
