const User = require('../models/userModel');

/**
 * 1. GET ALL USERS (Read)
 * Implements pagination with limit & offset
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    const { data: users, total } = User.findAll(offset, limit);

    res.status(200).json({
      status: 'success',
      results: users.length,
      pagination: {
        total,
        offset,
        limit
      },
      data: { users }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 2. GET USER BY ID (Read Single)
 */
exports.getUserById = async (req, res, next) => {
  try {
    const user = User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { user }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 3. CREATE USER (Create)
 */
exports.createUser = async (req, res, next) => {
  try {
    const existingUser = User.findByEmail(req.body.email);
    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'User with this email already exists'
      });
    }

    const newUser = User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { user: newUser }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 4. UPDATE USER (Update)
 */
exports.updateUser = async (req, res, next) => {
  try {
    const updatedUser = User.update(req.params.id, req.body);

    if (!updatedUser) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }

    res.status(200).json({
      status: 'success',
      data: { user: updatedUser }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 5. DELETE USER (Delete)
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const deleted = User.delete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};
