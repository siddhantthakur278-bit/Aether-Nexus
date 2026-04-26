const Joi = require('joi');

const projectSchema = Joi.object({
  name: Joi.string().min(3).required(),
  description: Joi.string().min(10).required(),
  owner: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required() // MongoDB ObjectID format
});

const taskSchema = Joi.object({
  title: Joi.string().min(5).required(),
  status: Joi.string().valid('todo', 'in-progress', 'completed'),
  project: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
  labels: Joi.array().items(Joi.string().regex(/^[0-9a-fA-F]{24}$/)),
  dueDate: Joi.date()
});

module.exports = {
  validateProject: (data) => projectSchema.validate(data),
  validateTask: (data) => taskSchema.validate(data)
};
