exports.up = (knex) =>
  knex.schema.createTable("tableIngredient", (table) => {
    table.increments("id");
    table.text("name");
    table.text("banner");
    table
      .integer("plate_id")
      .references("id")
      .inTable("tablePlate")
      .onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("tableIngredient");
