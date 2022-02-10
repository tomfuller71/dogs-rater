/**
 * @typedef {import("knex")} Knex
 */

const { table } = require("../../boot/model.cjs")

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  return knex.schema.alterTable("dogs", (table) => {
    table.string("image").notNullable()
    table.dropColumn("pictureUrl")
  })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
  return knex.schema.alterTable("dogs", (table) => {
    table.dropColumn("image")
    table.string("pictureUrl")
  })
}
