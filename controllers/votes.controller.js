const voteSchema = require("../schemas/vote");
const voteModel = require("../models/vote");
const log = require("../log");

exports.upvote = async (req, res, next) => {
  const logger = log.getLogger("Votes Controller > upvote");

  logger.info("Attempting to upvote");
  try {
    const vote = {
      ...req.params,
      subject: req.user.username
    };
    const validated = await voteSchema.validateAsync(vote);

    logger.info("Vote data validated");

    const updatedVotes = await voteModel.upvote(validated);

    logger.info("Vote logged");

    res.status(201).send({ votes: updatedVotes });
  } catch (err) {
    const errorMessage = `Error occurred while adding upvote: ${err}`;
    logger.warn(errorMessage);
    next({ status: 400, msg: errorMessage });
  }
};

exports.downvote = async (req, res, next) => {
  const logger = log.getLogger("Votes Controller > downvote");

  logger.info("Attempting to downvote");

  try {
    const vote = {
      ...req.params,
      subject: req.user.username
    };
    const validated = await voteSchema.validateAsync(vote);

    logger.info("Vote data validated");

    const updatedVotes = await voteModel.downvote(validated);

    logger.info("Vote logged");

    res.status(201).send({ votes: updatedVotes });
  } catch (err) {
    const errorMessage = `Error occurred while adding downvote: ${err}`;

    logger.warn(errorMessage);
    next({ status: 400, msg: err });
  }
};

exports.unvote = async (req, res, next) => {
  const logger = log.getLogger("Votes Controller > unvote");

  logger.info("Attempting to remove vote");

  try {
    const vote = {
      ...req.params,
      subject: req.user.username
    };
    const validated = await voteSchema.validateAsync(vote);

    logger.info("Vote data validated");

    await voteModel.unvote(validated);

    logger.info("Vote removed");

    res.sendStatus(204);
  } catch (err) {
    const errorMessage = `Error occurred while removing vote: ${err}`;

    logger.warn(errorMessage);
    next({ status: 400, msg: err });
  }
};

exports.getVotes = async (req, res, next) => {};
