const knex = require("../database/knex");

class drinks_controller {
  async create(req, res) {
    const { title, price } = req.body;
    const { user_id } = req.params;

    const drinks = await knex("tableDrinks").insert({
      title,
      price,
      user_id,
    });
    res.json(drinks);
  }
}
module.exports = drinks_controller;
