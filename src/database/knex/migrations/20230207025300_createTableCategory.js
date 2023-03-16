exports.up = (knex) =>
  knex.schema.createTable("tableCategory", (table) => {
    table.increments("id");
    table.integer('plate_id').references('id').inTable('tablePlate').onDelete("CASCADE");
    table.text("titleCategory");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("tableCategory");
