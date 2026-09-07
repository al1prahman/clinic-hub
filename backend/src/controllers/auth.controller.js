const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const { success, error } = require('../utils/response');

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return error(res, 'Username and password are required', null, 400);
    }

    // Find user
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return error(res, 'Invalid username or password', null, 401);
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return error(res, 'Invalid username or password', null, 401);
    }

    // Check if active
    if (!user.isActive) {
      return error(res, 'Account has been deactivated', null, 403);
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role, fullName: user.fullName },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      success: true,
      message: 'Login successful',
      data: { token, user: { id: user.id, username: user.username, role: user.role, fullName: user.fullName } },
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    // In a production app, you'd blacklist the token here
    // For now, just return success
    res.json({
      success: true,
      message: 'Logout successful',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};
