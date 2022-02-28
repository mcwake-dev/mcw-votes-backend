const router = require("express").Router();

const {
  upvote,
  downvote,
  unvote,
  getVotes,
} = require("../controllers/votes.controller");

router.route("/upvote").post(upvote);
router.route("/downvote").post(downvote);
router.route("/unvote").delete(unvote);
router.route("/votes/:entity_type/:entity_id").get(getVotes);

module.exports = router;
