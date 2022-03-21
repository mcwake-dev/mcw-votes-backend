const db = require("../db/db");

exports.upvote = async ({ entity_type, entity_id, subject }) => {
  await db
    .multi()
    .srem(`downvoted:${entity_type}:${entity_id}`, subject)
    .srem(`upvoted:${entity_type}:${entity_id}`, subject)
    .sadd(`upvoted:${entity_type}:${entity_id}`, subject)
    .exec();

  return this.getVotes({ entity_type, entity_id, subject });
};

exports.downvote = async ({ entity_type, entity_id, subject }) => {
  await db
    .multi()
    .srem(`downvoted:${entity_type}:${entity_id}`, subject)
    .srem(`upvoted:${entity_type}:${entity_id}`, subject)
    .sadd(`downvoted:${entity_type}:${entity_id}`, subject)
    .exec();

  return this.getVotes({ entity_type, entity_id, subject });
};

exports.unvote = async ({ entity_type, entity_id, subject }) => {
  await db
    .multi()
    .srem(`downvoted:${entity_type}:${entity_id}`, subject)
    .srem(`upvoted:${entity_type}:${entity_id}`, subject)
    .exec();

  return this.getVotes({ entity_type, entity_id, subject });
};

exports.getVotes = async ({ entity_type, entity_id, subject }) => {
  const upvotes = (await db.smembers(`upvoted:${entity_type}:${entity_id}`))
    .length;
  const downvotes = (await db.smembers(`downvoted:${entity_type}:${entity_id}`))
    .length;
  const userHasUpvoted = await db.sismember(
    `upvoted:${entity_type}:${entity_id}`,
    subject
  );
  const userHasDownvoted = await db.sismember(
    `downvoted:${entity_type}:${entity_id}`,
    subject
  );

  return {
    upvotes,
    downvotes,
    userHasUpvoted,
    userHasDownvoted,
  };
};
