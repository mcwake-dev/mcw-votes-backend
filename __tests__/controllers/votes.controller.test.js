require("../../env/test");
const { expect, it, describe, beforeAll, afterAll } = require("@jest/globals");
const request = require("supertest");
const db = require("../../db/db");
const app = require("../../app");

beforeAll(async () => {
  await db.del("downvoted:article:1");
  await db.del("upvoted:article:1");
});

afterAll(async () => {
  await db.del("downvoted:article:1");
  await db.del("upvoted:article:1");
  await db.quit();
});

describe("POST /api/votes/upvote", () => {
  it("should create a positive vote for an entity given valid values", () =>
    request(app)
      .post("/api/votes/upvote")
      .send({
        vote: {
          entity_type: "article",
          entity_id: 1,
          voter_id: "testuser",
        },
      })
      .expect(201)
      .then(({ body: { votes } }) => {
        expect(votes).toEqual(
          expect.objectContaining({
            upvotes: 1,
            downvotes: 0,
            userHasUpvoted: 1,
            userHasDownvoted: 0,
          })
        );
      }));
  it("should not allow more than one vote per user per entity", () =>
    request(app)
      .post("/api/votes/upvote")
      .send({
        vote: {
          entity_type: "article",
          entity_id: 1,
          voter_id: "testuser",
        },
      })
      .expect(201)
      .then(({ body: { votes } }) => {
        expect(votes).toEqual(
          expect.objectContaining({
            upvotes: 1,
            downvotes: 0,
            userHasUpvoted: 1,
            userHasDownvoted: 0,
          })
        );
      }));
  it("should allow one vote per user per entity", () =>
    request(app)
      .post("/api/votes/upvote")
      .send({
        vote: {
          entity_type: "article",
          entity_id: 1,
          voter_id: "testuser2",
        },
      })
      .expect(201)
      .then(({ body: { votes } }) => {
        expect(votes).toEqual(
          expect.objectContaining({
            upvotes: 2,
            downvotes: 0,
            userHasUpvoted: 1,
            userHasDownvoted: 0,
          })
        );
      }));
  it("should throw an error if incomplete information is provided (missing entity type)", () =>
    request(app)
      .post("/api/votes/upvote")
      .send({
        vote: {
          entity_id: 1,
          voter_id: "testuser",
        },
      })
      .expect(400));
});

describe("POST /api/votes/downvote", () => {
  it("should create a negative vote for an entity given valid values", () =>
    request(app)
      .post("/api/votes/downvote")
      .send({
        vote: {
          entity_type: "article",
          entity_id: 1,
          voter_id: "testuser",
        },
      })
      .expect(201)
      .then(({ body: { votes } }) => {
        expect(votes).toEqual(
          expect.objectContaining({
            upvotes: 1,
            downvotes: 1,
            userHasUpvoted: 0,
            userHasDownvoted: 1,
          })
        );
      }));
  it("should throw an error if incomplete information is provided (missing entity type)", () =>
    request(app)
      .post("/api/votes/upvote")
      .send({
        vote: {
          entity_id: 1,
          voter_id: "testuser",
        },
      })
      .expect(400));
  it("should not allow more than one vote per user per entity", () =>
    request(app)
      .post("/api/votes/downvote")
      .send({
        vote: {
          entity_type: "article",
          entity_id: 1,
          voter_id: "testuser",
        },
      })
      .expect(201)
      .then(({ body: { votes } }) => {
        expect(votes).toEqual(
          expect.objectContaining({
            upvotes: 1,
            downvotes: 1,
            userHasUpvoted: 0,
            userHasDownvoted: 1,
          })
        );
      }));
  it("should allow one vote per user per entity", () =>
    request(app)
      .post("/api/votes/downvote")
      .send({
        vote: {
          entity_type: "article",
          entity_id: 1,
          voter_id: "testuser2",
        },
      })
      .expect(201)
      .then(({ body: { votes } }) => {
        expect(votes).toEqual(
          expect.objectContaining({
            upvotes: 0,
            downvotes: 2,
            userHasUpvoted: 0,
            userHasDownvoted: 1,
          })
        );
      }));
});

describe("DELETE /api/votes", () => {
  it("should remove a vote when supplied with valid information", () =>
    request(app)
      .delete("/api/votes/unvote")
      .send({
        vote: {
          entity_type: "article",
          entity_id: 1,
          voter_id: "testuser2",
        },
      })
      .expect(204));
});
