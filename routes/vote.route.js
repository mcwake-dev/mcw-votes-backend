const router = require("express").Router();

const { verifyToken } = require("../middleware/token");
const {
  upvote,
  downvote,
  unvote,
  getVotes,
} = require("../controllers/votes.controller");

router.route("/upvote/:entity_type/:entity_id").post(verifyToken, upvote);
router.route("/downvote/:entity_type/:entity_id").post(verifyToken, downvote);
router.route("/unvote/:entity_type/:entity_id").delete(verifyToken, unvote);
router.route("/votes/:entity_type/:entity_id").get(getVotes);

module.exports = router;
