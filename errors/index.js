const log = require("../log");

exports.handleCustomErrors = (err, req, res, next) => {
  const logger = log.getLogger("Custom Error");

  if (err.status && err.msg) {
    logger.error(`${err.status} ${err.msg}`);
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
};

exports.handleServerErrors = (err, req, res, next) => {
  const logger = log.getLogger("Server Error");

  logger.error(JSON.stringify(err));
  res.status(500).send({ msg: "Internal Server Error" });
};
