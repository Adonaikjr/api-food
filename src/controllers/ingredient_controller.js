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
  async updateBanner(req, res) {
    const { filename } = req.file;
    const { id } = req.body;

    const diskStorage = new DiskStorage();
    console.log(id);

    const ingredient = await knex("tableIngredient").where({ id: id }).first();

    if (ingredient.banner) {
      await diskStorage.deleteFile(ingredient.banner);
    }

    const saveBanner = await diskStorage.saveFile(filename);

    ingredient.banner = saveBanner;

    await knex("tableIngredient").update(ingredient).where({ id: id });

    console.log(ingredient);

    res.json(ingredient);
  }
}
module.exports = ingredient_controller;
