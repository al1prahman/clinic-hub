/**
 * Standard API Response Helper
 * Ensures consistent response format across all endpoints
 */

const success = (res, message = 'Success', data = null, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

const error = (res, message = 'Error', errors = null, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    message,
    errors,
  });
};

module.exports = { success, error };
