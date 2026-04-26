const express = require('express');
const projectController = require('../controllers/projectController');

const router = express.Router();

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(projectController.createProject);

router
  .route('/:id')
  .get(projectController.getProject);

module.exports = router;
