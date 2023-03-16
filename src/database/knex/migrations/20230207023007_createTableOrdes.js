exports.up = (knex) =>
  knex.schema.createTable("tableOrder", (table) => {
    table.increments("id");
    table.text("status");
    table.text("description");
    table.integer("plate_id").references("id").inTable("tablePlate").onDelete("CASCADE");;
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");;
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });
exports.down = (knex) => knex.schema.dropTable("tableOrder");