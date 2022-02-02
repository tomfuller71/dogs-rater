const Model = require("./Model");

class Dog extends Model {
  static get tableName() {
    return "dogs";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["dogName", "pictureUrl", "userId"],
      properties: {
        dogName: { type: "string", minLength: 1, maxLength: 30 },
        pictureUrl: { type: "string" },
        userId: { type: ["integer", "string"] },
        description: { type: "string" }
      },
    };
  }

  static get relationMappings() {
    const Review = require("./Review");
    const User = require("./User");

    return {
      reviews: {
        relation: Model.HasManyRelation,
        modelClass: Review,
        join: {
          from: "dogs.id",
          to: "reviews.dogId",
        },
      },

      users: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "dogs.userId",
          to: "users.id",
        },
      },
    };
  }
}
module.exports = Dog;
