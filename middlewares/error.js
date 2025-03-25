const handleErrors = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong!";
  console.error(`Error ${status}: ${message}`);
  res.status(status).json({ message });
};

module.exports = handleErrors;
