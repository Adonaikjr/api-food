const knex = require("../database/knex");

class plate_controller {
  async create(req, res) {
    const { title, price, ingredient, description, titleCategory } = req.body;
    const { user_id } = req.params;

    if (!req.file) {
      console.log("erro");
    } else {
      const { filename } = req.file;
      const plate_id = await knex("tablePlate").insert({
        title,
        price,
        description,
        banner: filename,
        user_id,
      });

      if (ingredient) {
        const newIngredient = ingredient.split(",").map((item) => item.trim());
        console.log(newIngredient);

        const result = newIngredient.map((name) => {
          return {
            plate_id,
            name,
            user_id,
          };
        });
        await knex("tableIngredient").insert(result);
      }
      if(titleCategory){
        await knex('tableCategory').insert({
          plate_id,
          titleCategory
        })
      }

      res.json();
    }
  }
  async show(req, res) {
    const { id } = req.params;

    const plate = await knex("tablePlate").where({ id }).first();

    const ingredient = await knex("tableIngredient")
      .where({ plate_id: id })
      .orderBy("name");

    return res.json({
      ...plate,
      ingredient,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("tablePlate").where({ id }).delete();
    return res.json();
  }
  async index(req, res) {
    const { user_id, title, ingredient } = req.query;

    let plate;

    if (ingredient) {
      const filterIngredient = ingredient.split(",").map((item) => item.trim());

      plate = await knex("tableIngredient")
        .select(["tablePlate.id", "tablePlate.title", "tablePlate.user_id"])
        .where("tablePlate.user_id", user_id)
        .whereLike("tablePlate.title", `%${title}%`)
        .whereIn("name", filterIngredient)
        .innerJoin("tablePlate", "tablePlate.id", "tableIngredient.plate_id");

      console.log(filterIngredient);
    } else {
      plate = await knex("tablePlate")
        .where({ user_id })
        .orderBy("title")
        .whereLike("title", `%${title}%`);
    }

    const useIngredient = await knex("tableIngredient").where({ user_id });

    const PlateAndIngredient = plate.map((item) => {
      const plateIngredint = useIngredient.filter(
        (item) => ingredient.plate_id === plate.id
      );
      return {
        ...plate,
        ingredient: plateIngredint,
      };
    });

    return res.json(PlateAndIngredient);
  }
}
module.exports = plate_controller;
