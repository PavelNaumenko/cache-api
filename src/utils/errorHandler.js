module.exports = (err, req, res, next) => {
  res.status(500).json({
    code: 'InternalError',
    message: err.message,
  });
}