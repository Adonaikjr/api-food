
exports.up = knex => knex.schema.createTable('tableDessert', table => {
    table.increments('id')
    table.text('title')
    table.integer('price')
  
    table.integer('user_id').references('id').inTable('users')
    table.text('banner')
    table.timestamp('created_at').default(knex.fn.now())
    table.timestamp('updated_at').default(knex.fn.now())
}) 

exports.down = knex => knex.schema.dropTable('tableDessert') 