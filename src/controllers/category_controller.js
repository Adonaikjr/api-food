const knex = require("../database/knex");

class category_controller {
  async create(req, res) {
    const { title } = req.body;
    const category = await knex("tableCategory").insert({
      title,
      plate_id,
    });
    res.json(category);
  }
}
module.exports = category_controller;
