const taskController = require('../controllers/taskController');
const { validateTaskBody } = require('../middlewares/validationMiddleware');

const router = express.Router();

router
  .route('/')
  .get(taskController.getAllTasks)
  .post(validateTaskBody, taskController.createTask);

router
  .route('/:id')
  .patch(taskController.updateTask)
  .delete(taskController.deleteTask);

module.exports = router;
