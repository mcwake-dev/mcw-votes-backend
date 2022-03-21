const jwt = require("jsonwebtoken");

const log = require("../log");

const verifyToken = async (req, res, next) => {
  const logger = log.getLogger("Token Middleware > Verify");

  try {
    logger.info("Attempting to retrieve token");

    const token = req.headers.authorization.split(" ")[1];

    logger.info("Token found, verifying");

    const verified = jwt.verify(token, process.env.JWT_PUBLIC_KEY);

    logger.info("Token verified");

    req.user = verified;
    next();
  } catch (err) {
    const errorMessage = `Token Verification Failed: ${err}`;

    log.warn(errorMessage);
    next({ status: 401, msg: errorMessage });
  }
};

module.exports = { verifyToken };
