// VALIDATIONS
import Joi from '@hapi/joi'

// Trip Fields Validations
const tripValidation = data => {
  const schema = {
    seating_capacity: Joi.number()
      .min(3)
      .max(24)
      .integer()
      .positive()
      .required(),
    bus_number: Joi.string().required(),
    origin: Joi.string().required(),
    destination: Joi.string().required(),
    fare: Joi.number()
      .precision(2)
      .required(),
  }
  return Joi.validate(data, schema, { abortEarly: false })
}

module.exports.tripValidation = tripValidation
