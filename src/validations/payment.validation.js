const Joi = require('joi');

const createPayment = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().required(),
    creditNumber: Joi.string().required(),
    year: Joi.string().required(),
    month: Joi.string().required()
  }),
};


module.exports = {
  createPayment
};
