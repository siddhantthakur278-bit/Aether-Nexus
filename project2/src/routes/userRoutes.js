const express = require('express');
const userController = require('../controllers/userController');
const { validate } = require('../middlewares/validationMiddleware');
const { protect, restrictTo } = require('../middlewares/authMiddleware');
const { createUserSchema, updateUserSchema } = require('../validators/userValidator');

const router = express.Router();

/**
 * API Routes mapping for User entity
 * - RESTful Design (GET / POST / PUT / DELETE)
 * - Middleware injected per route (Auth & Joi Validation)
 */

// 1. GET ALL USERS & 3. CREATE USER
router.route('/')
  .get(userController.getAllUsers) // Public endpoint (with pagination)
  .post(protect, validate(createUserSchema), userController.createUser); // Protected + Validated endpoint

// 2. GET USER BY ID, 4. UPDATE USER, 5. DELETE USER
router.route('/:id')
  .get(userController.getUserById) // Public single read
  .put(protect, validate(updateUserSchema), userController.updateUser) // Protected + Validated update
  .delete(protect, restrictTo('admin'), userController.deleteUser); // Protected + Admin-only delete

module.exports = router;
