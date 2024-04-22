const Joi = require('joi');

const createStoreSchema = Joi.object({
  name: Joi.string().required(),
  location: Joi.string().required(),
});

module.exports = {
  createStoreSchema,
};
