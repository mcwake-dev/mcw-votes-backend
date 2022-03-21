const Joi = require("joi");

module.exports = Joi.object({
  entity_type: Joi.string().required(),
  entity_id: Joi.any().required(),
  subject: Joi.any().required(),
});
