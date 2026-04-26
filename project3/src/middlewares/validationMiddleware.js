const { validateProject, validateTask } = require('../validators/schemaValidator');

exports.validateProjectBody = (req, res, next) => {
  const { error } = validateProject(req.body);
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message
    });
  }
  next();
};

exports.validateTaskBody = (req, res, next) => {
  const { error } = validateTask(req.body);
  if (error) {
    return res.status(400).json({
      status: 'fail',
      message: error.details[0].message
    });
  }
  next();
};
