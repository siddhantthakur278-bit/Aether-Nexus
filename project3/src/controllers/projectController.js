const Project = require('../models/Project');

exports.getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().populate('owner', 'name email');
    res.status(200).json({
      status: 'success',
      results: projects.length,
      data: { projects }
    });
  } catch (err) {
    next(err);
  }
};

exports.createProject = async (req, res, next) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { project: newProject }
    });
  } catch (err) {
    next(err);
  }
};

exports.getProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ status: 'fail', message: 'No project found' });
    
    res.status(200).json({
      status: 'success',
      data: { project }
    });
  } catch (err) {
    next(err);
  }
};

exports.updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!project) return res.status(404).json({ status: 'fail', message: 'No project found' });

    res.status(200).json({
      status: 'success',
      data: { project }
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) return res.status(404).json({ status: 'fail', message: 'No project found' });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    next(err);
  }
};
