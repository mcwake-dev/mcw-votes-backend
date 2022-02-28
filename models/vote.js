const db = require("../db/db");

exports.upvote = async ({ entity_type, entity_id, voter_id }) => {
  await db
    .multi()
    .srem(`downvoted:${entity_type}:${entity_id}`, voter_id)
    .srem(`upvoted:${entity_type}:${entity_id}`, voter_id)
    .sadd(`upvoted:${entity_type}:${entity_id}`, voter_id)
    .exec();

  return this.getVotes({ entity_type, entity_id, voter_id });
};

exports.downvote = async ({ entity_type, entity_id, voter_id }) => {
  await db
    .multi()
    .srem(`downvoted:${entity_type}:${entity_id}`, voter_id)
    .srem(`upvoted:${entity_type}:${entity_id}`, voter_id)
    .sadd(`downvoted:${entity_type}:${entity_id}`, voter_id)
    .exec();

  return this.getVotes({ entity_type, entity_id, voter_id });
};

exports.unvote = async ({ entity_type, entity_id, voter_id }) => {
  await db
    .multi()
    .srem(`downvoted:${entity_type}:${entity_id}`, voter_id)
    .srem(`upvoted:${entity_type}:${entity_id}`, voter_id)
    .exec();

  return this.getVotes({ entity_type, entity_id, voter_id });
};

exports.getVotes = async ({ entity_type, entity_id, voter_id }) => {
  const upvotes = (await db.smembers(`upvoted:${entity_type}:${entity_id}`))
    .length;
  const downvotes = (await db.smembers(`downvoted:${entity_type}:${entity_id}`))
    .length;
  const userHasUpvoted = await db.sismember(
    `upvoted:${entity_type}:${entity_id}`,
    voter_id
  );
  const userHasDownvoted = await db.sismember(
    `downvoted:${entity_type}:${entity_id}`,
    voter_id
  );

  return {
    upvotes,
    downvotes,
    userHasUpvoted,
    userHasDownvoted,
  };
};
