const { v4: uuidv4 } = require('uuid');

// Mock In-Memory Database for Users
let users = [
  { id: uuidv4(), name: 'John Doe', email: 'john@example.com', age: 28, role: 'user', createdAt: new Date().toISOString() },
  { id: uuidv4(), name: 'Jane Smith', email: 'jane@example.com', age: 34, role: 'admin', createdAt: new Date().toISOString() },
  { id: uuidv4(), name: 'Sam Green', email: 'sam@example.com', age: 22, role: 'user', createdAt: new Date().toISOString() },
  { id: uuidv4(), name: 'Martina Plantijn', email: 'martina@example.com', age: 30, role: 'admin', createdAt: new Date().toISOString() }
];

/**
 * 1. GET ALL USERS (Read)
 * Implements pagination with limit & offset
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    // Pagination logic
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = parseInt(req.query.offset, 10) || 0;

    // Slicing array to simulate SQL OFFSET and LIMIT
    const paginatedUsers = users.slice(offset, offset + limit);

    res.status(200).json({
      status: 'success',
      results: paginatedUsers.length,
      pagination: {
        total: users.length,
        offset,
        limit
      },
      data: {
        users: paginatedUsers
      }
    });
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

/**
 * 2. GET USER BY ID (Read Single)
 */
exports.getUserById = async (req, res, next) => {
  try {
    const user = users.find(u => u.id === req.params.id);

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
 * Requires auth and validation
 */
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, age, role } = req.body; // Validation middleware already validated and sanitized

    // Check if email already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({
        status: 'fail',
        message: 'User with this email already exists'
      });
    }

    const newUser = {
      id: uuidv4(),
      name,
      email,
      age,
      role: role || 'user',
      createdAt: new Date().toISOString()
    };

    users.push(newUser);

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
 * Requires auth and validation
 */
exports.updateUser = async (req, res, next) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.params.id);

    if (userIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }

    // Merge existing user with updated fields from request body
    const updatedUser = { ...users[userIndex], ...req.body };
    users[userIndex] = updatedUser;

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
 * Requires auth
 */
exports.deleteUser = async (req, res, next) => {
  try {
    const userIndex = users.findIndex(u => u.id === req.params.id);

    if (userIndex === -1) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user found with that ID'
      });
    }

    // Remove user from array
    users.splice(userIndex, 1);

    // 204 No Content for successful deletion
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};

// Helper for testing to reset DB
exports.resetDB = () => {
  users = [];
};
