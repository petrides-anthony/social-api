const { HttpError } = require("http-errors");

const errorHandler = (error, req, res, next) => {
  if (error instanceof HttpError) {
    return res.status(error.status).send(error.message);
  }

  res.status(500).send(error.message);
};

module.exports = errorHandler;