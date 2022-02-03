/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("dogs", (table) => {
        table.string("description")
    })
};

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("dogs", (table) => {
        table.dropColumn("description")
    })
};
