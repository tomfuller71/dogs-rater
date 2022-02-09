const Model = require("./Model")

class Review extends Model {
  static get tableName() {
    return "reviews"
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["rating", "description"],
      properties: {
        rating: { type: ["integer", "string"] },
        dogId: { type: ["integer", "string"] },
        userId: { type: ["integer", "string"] },
        description: { type: "string" }
      },
    }
  }

  static get relationMappings() {
    const { Dog, User, Vote}  = require("./index.js");

    return {
      dog: {
        relation: Model.BelongsToOneRelation,
        modelClass: Dog,
        join: {
          from: "reviews.dogId",
          to: "dogs.id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "reviews.userId",
          to: "users.id",
        },
      },
      votes: {
        relation: Model.HasManyRelation,
        modelClass: Vote,
        join: {
          from: "reviews.id",
          to: "votes.reviewId"
        }
      },
      voters: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "reviews.id",
          through: {
            from: "votes.reviewId",
            to: "votes.userId"
          },
          to: "users.id"
        }
      }
    }
  }
}

module.exports = Review;
