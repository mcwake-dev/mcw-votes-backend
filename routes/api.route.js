const router = require("express").Router();

const voteRouter = require("./vote.route");

router.use("/votes", voteRouter);

module.exports = router;
