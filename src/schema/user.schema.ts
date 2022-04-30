import Joi from "joi";

export const userRegistrationSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).max(20).required(),
  first_name: Joi.string(),
  last_name: Joi.string(),
});
export const userLogInSchema = Joi.object({
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().min(5).max(20).required(),
});
