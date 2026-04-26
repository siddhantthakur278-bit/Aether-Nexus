const User = require('../models/userModel');

exports.getSystemStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    
    // Simulating system health metrics
    const stats = {
      totalUsers,
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage().heapUsed,
      status: 'Healthy',
      latency: '24ms' // Mock for now
    };

    res.status(200).json({
      status: 'success',
      data: stats
    });
  } catch (err) {
    next(err);
  }
};
