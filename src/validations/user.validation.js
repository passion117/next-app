const Joi = require('joi');


const createOrUpdateUserAsPinInfo = {
  body: Joi.object().keys({
    pins: Joi.array().required()
  }),
}

module.exports = {
  createOrUpdateUserAsPinInfo,
};
