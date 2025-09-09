const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Multer errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({
      status: 'error',
      message: 'File size too large. Maximum size is 5MB.'
    });
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    return res.status(400).json({
      status: 'error',
      message: 'Too many files uploaded.'
    });
  }

  // Database errors
  if (err.code === '23505') { // Unique constraint violation
    return res.status(400).json({
      status: 'error',
      message: 'Resource already exists'
    });
  }

  if (err.code === '23503') { // Foreign key constraint violation
    return res.status(400).json({
      status: 'error',
      message: 'Referenced resource does not exist'
    });
  }

  // Validation errors
  if (err.isJoi) {
    return res.status(400).json({
      status: 'error',
      message: 'Validation error',
      details: err.details.map(detail => detail.message)
    });
  }

  // Default error
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;