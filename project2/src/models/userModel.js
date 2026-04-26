const { v4: uuidv4 } = require('uuid');

/**
 * Mock User Model representing the "Noun" in our RESTful system.
 * In a production app, this would be a Mongoose or Sequelize model.
 */
class UserModel {
  constructor() {
    this.users = [
      { id: uuidv4(), name: 'John Doe', email: 'john@example.com', age: 28, role: 'user', createdAt: new Date().toISOString() },
      { id: uuidv4(), name: 'Jane Smith', email: 'jane@example.com', age: 34, role: 'admin', createdAt: new Date().toISOString() },
      { id: uuidv4(), name: 'Sam Green', email: 'sam@example.com', age: 22, role: 'user', createdAt: new Date().toISOString() },
      { id: uuidv4(), name: 'Martina Plantijn', email: 'martina@example.com', age: 30, role: 'admin', createdAt: new Date().toISOString() }
    ];
  }

  findAll(offset = 0, limit = 10) {
    return {
      data: this.users.slice(offset, offset + limit),
      total: this.users.length
    };
  }

  findById(id) {
    return this.users.find(u => u.id === id);
  }

  findByEmail(email) {
    return this.users.find(u => u.email === email);
  }

  create(userData) {
    const newUser = {
      id: uuidv4(),
      ...userData,
      role: userData.role || 'user',
      createdAt: new Date().toISOString()
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id, updateData) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return null;

    this.users[index] = { ...this.users[index], ...updateData };
    return this.users[index];
  }

  delete(id) {
    const index = this.users.findIndex(u => u.id === id);
    if (index === -1) return false;

    this.users.splice(index, 1);
    return true;
  }
}

module.exports = new UserModel();
