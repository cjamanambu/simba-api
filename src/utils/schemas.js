import Joi from 'joi';

export const accountValidation = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

export const accountAuthValidation = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});
