/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.createTable("dogs", (table) => {
    table.bigIncrements("id");
    table.string("dogName").notNullable();
    table.string("pictureUrl").notNullable();
    table.bigInteger("userId").notNullable().index().unsigned().references("users.id");
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now());
  });
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.dropTableIfExists("dogs");
};
