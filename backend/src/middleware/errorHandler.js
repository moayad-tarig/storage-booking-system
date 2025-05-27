const errorHandler = (err, req, res, next) => {
  // Handle validation errors
  if (err.name === 'ValidationError' || err.errors) {
    return res.status(400).json({
      status: 'fail',
      statusCode: 400,
      errors: err.errors
    });
  }

  const statusCode = err.statusCode || 500;
  const status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    res.status(statusCode).json({
      status,
      statusCode,
      message: err.message,
      stack: err.stack
    });
  } else {
    // Production mode - don't expose error details
    res.status(statusCode).json({
      status,
      statusCode,
      message: statusCode === 500 ? 'Something went wrong' : err.message
    });
  }
};

module.exports = errorHandler; 