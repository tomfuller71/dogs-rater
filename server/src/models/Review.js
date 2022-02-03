const Model = require("./Model");

class Review extends Model {
  static get tableName() {
    return "reviews";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["rating"],
      properties: {
        rating: { type: ["integer", "string"] },
        dogId: { type: ["integer", "string"] },
      },
    };
  }

  static get relationMappings() {
    const Dog = require("./Dog");
    const User = require("./User");

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
    };
  }
}

module.exports = Review;
