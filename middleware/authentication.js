// Check JWT in Authorization header
// Redirect to auth service
const jwt = require("jsonwebtoken");

const hasToken = (req) =>
  req.headers.authorization &&
  req.headers.authorization.split(" ")[0] === "Bearer";
const getToken = (req) => req.headers.authorization.split(" ")[1];
const log = require("../log");

exports.authentication = (req, res, next) => {
  const logger = log.getLogger("Local Authentication Middleware >");

  logger.info("Checking JWT");

  try {
    if (hasToken(req)) {
      logger.info("User has token");
      const token = getToken(req);
      const decoded = jwt.decode(token, { complete: true });
      const verifyOptions = {
        issuer: process.env.JWT_ISSUER,
        audience: process.env.JWT_AUDIENCE,
        subject: decoded.username,
        expiresIn: process.env.JWT_EXPIRY,
        algorithm: ["RS256"],
      };
      const verifiedToken = jwt.verify(
        token,
        process.env.PUBLIC_KEY,
        verifyOptions
      );

      logger.info("Token is verified");

      req.session.verifiedToken = verifiedToken;
      next(req, res, next);
    } else {
      logger.info("No Token provided");
      res.redirect(`${process.env.AUTH_URL}/api/users/authenticate-for-site`);
    }
  } catch (err) {
    const errorMessage = `Error occurred: ${err.msg}`;

    logger.error(errorMessage);
    next({ msg: errorMessage, status: err.status });
  }
};
