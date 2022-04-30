import Joi from "joi";

export const createOneToDoSchema = Joi.object({
  title: Joi.string().max(100).required(),
  description: Joi.string().max(500),
  status: Joi.string().valid("in_progress", "done"),
  dueDate: Joi.date(),
});
export const createSeveralToDoSchema = Joi.array().items(createOneToDoSchema);
export const updateToDoDueDateSchema = Joi.object({
  dueDate: Joi.date().required(),
});
export const updateToDoStatusSchema = Joi.object({
  status: Joi.date().valid("in_progress", "done").required(),
});
export const searchToDoByFilterSchema = Joi.object({
  status: Joi.string().valid("in_progress", "done"),
  dueDate: Joi.object({
    specificDate: Joi.date(),
    range: Joi.object({
      from_date: Joi.date(),
      to_date: Joi.date(),
    }),
  }),
});
export const getSeveralToDoSchema = Joi.object({
  ids: Joi.array().items(Joi.string()),
});
