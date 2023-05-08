const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class ingredient_controller {
  async create(req, res) {
    const { name, banner } = req.body;
    const { user_id } = req.params;

    //devolve um id da nota
    const ingredient = await knex("tableIngredient").insert({
      name,
      banner,
      user_id,
    });

    res.json(ingredient);
  }
  async show(req, res) {
    const { user_id } = req.params;

    const showIngredient = await knex("tableIngredient").where({ user_id });

    res.json(showIngredient);
  }
}
module.exports = ingredient_controller;
