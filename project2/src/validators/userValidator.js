const Joi = require('joi');

// User Schema for Creation
exports.createUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Name must be a string',
      'string.empty': 'Name cannot be an empty field',
      'string.min': 'Name should have a minimum length of {#limit}',
      'any.required': 'Name is a required field'
    }),
  email: Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .messages({
      'string.email': 'Please provide a valid email format',
      'any.required': 'Email is a required field'
    }),
  age: Joi.number()
    .integer()
    .min(18)
    .max(120)
    .required()
    .messages({
      'number.base': 'Age must be a number',
      'number.min': 'Age must be at least {#limit}',
      'number.max': 'Age must be less than or equal to {#limit}',
      'any.required': 'Age is a required field'
    }),
  role: Joi.string()
    .valid('user', 'admin')
    .default('user')
});

// User Schema for Updating (All fields optional)
exports.updateUserSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email({ minDomainSegments: 2 }),
  age: Joi.number().integer().min(18).max(120),
  role: Joi.string().valid('user', 'admin')
}).min(1); // At least one field must be provided to update
