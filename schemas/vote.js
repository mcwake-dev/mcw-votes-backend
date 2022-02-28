const Joi = require("joi");

module.exports = Joi.object({
  entity_type: Joi.string().required(),
  entity_id: Joi.any().required(),
  voter_id: Joi.any().required(),
});
