const projectController = require('../controllers/projectController');
const { validateProjectBody } = require('../middlewares/validationMiddleware');

const router = express.Router();

router
  .route('/')
  .get(projectController.getAllProjects)
  .post(validateProjectBody, projectController.createProject);

router
  .route('/:id')
  .get(projectController.getProject)
  .patch(projectController.updateProject)
  .delete(projectController.deleteProject);

module.exports = router;
