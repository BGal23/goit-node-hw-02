const Joi = require("joi");

const personSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.string().min(9).max(15).required(),
  favorite: Joi.bool(),
});

const validate = (schema, obj) => {
  return schema.validate(obj);
};

module.exports = {
  validatePerson: (body) => validate(personSchema, body),
};
