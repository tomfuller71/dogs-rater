/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("dogs", (table) => {
    // table.string("pictureUrl").nullable().alter();
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.alterTable("dogs", (table) => {
    // table.string("pictureUrl").notNullable().alter();
  })
}
