import Joi from 'joi';

export const authSchema=Joi.object({
  email:Joi.string().email().required(),
  password:Joi.string().required()
});

export const refreshSchema=Joi.object({
  refreshToken:Joi.string().required()
});