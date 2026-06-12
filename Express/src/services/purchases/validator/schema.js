import Joi from 'joi';

export const purchaseSchema = Joi.object({
  title: Joi.string().required(),
  category_id: Joi.string().required(),
  date: Joi.date().required(),
  price: Joi.number().required(),
})
