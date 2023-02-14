const config = require('../../../knexfile')
const knex = require('knex')

const connectionKnex = knex(config.development)

module.exports = connectionKnex