/**
 * Universal Validation Middleware for Joi Schemas
 */
exports.validate = (schema) => {
  return (req, res, next) => {
    // Validate request body against schema
    const { error, value } = schema.validate(req.body, {
      abortEarly: false, // Include all errors
      allowUnknown: true, // Ignore unknown props
      stripUnknown: true // Remove unknown props
    });

    if (error) {
      // Format detailed specific field-level errors
      const errors = error.details.map((detail) => ({
        field: detail.context.key,
        message: detail.message.replace(/"/g, '')
      }));

      return res.status(400).json({
        status: 'fail',
        message: 'Validation failed',
        errors
      });
    }

    // Re-assign validated value (stripped of unknown props, preventing mass assignment)
    req.body = value;
    next();
  };
};
