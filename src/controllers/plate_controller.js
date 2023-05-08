const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class plate_controller {
  async create(req, res) {
    const { title, price, ingredient, description, titleCategory } = req.body;
    const { user_id } = req.params;

    if (!req.file) {
      console.log("erro");
    } else {
      const { filename } = req.file;

      const diskStorage = new DiskStorage();

      const saveBanner = await diskStorage.saveFile(filename);

      const plate_id = await knex("tablePlate").insert({
        title,
        price,
        description,
        banner: saveBanner,
        user_id,
      });

      if (ingredient) {
        const newIngredient = ingredient.split(",").map((item) => item.trim());

        // console.log(newIngredient);
        const result = newIngredient.map((name) => {
          return {
            plate_id,
            name,
            user_id,
          };
        });

        await knex("tableIngredient").insert(result);
      }

      if (titleCategory) {
        await knex("tableCategory").insert({
          plate_id,
          titleCategory,
        });
      }

      return res.json();
    }
  }
  async show(req, res) {
    const { id } = req.params;

    const plate = await knex("tablePlate").where({ id }).first();

    const ingredient = await knex("tableIngredient")
      .where({ plate_id: id })
      .orderBy("name");

    return res.json({ ...plate, ingredient });
  }

  async delete(req, res) {
    const { id } = req.params;
    await knex("tablePlate").where({ id }).first().delete();
    return res.json();
  }

  async index(req, res) {
    const { user_id, title } = req.query;

    let plate;
    // let ingredient
    if (title) {
      plate = await knex("tablePlate")
        .where({ user_id })
        .orderBy("title")
        .whereLike("title", `%${title}%`);
    }
    // if (name) {
    //   plate = await knex("tableIngredient")
    //     .where({ user_id })
    //     .orderBy("name")
    //     .whereLike("name", `%${name}%`);
    // }

    return res.json(plate);
  }
  async listPlate(req, res) {
    const { user_id } = req.params;

    const plates = await knex("tablePlate")
      .where({ user_id })
      .select(
        "id",
        "title",
        "description",
        "banner",
        "price",
        "user_id",
        "created_at"
      );

    const category = await knex("tableCategory").select(
      "plate_id",
      "titleCategory"
    );

    const newArray = {
      plates,
      category: [...category],
    };

    res.json(newArray);
  }

  async update(req, res) {
    // preciso criar pagina para atualizar os ingredientes
    const { title, price, ingredient, description, titleCategory } = req.body;
    const { plate_id } = req.params;
    const { filename } = req.file;
    const userId = req.user.id;
    // Retrieve the plate, category and ingredient record from the database
    const plate = await knex("tablePlate").where({ id: plate_id }).first();
    const category = await knex("tableCategory").where({ plate_id }).first();

    const diskStorage = new DiskStorage();

    if (filename) {
      // Delete the previous banner file
      await diskStorage.deleteFile(plate.banner);
      // Save the new banner file and update the plate record
      plate.banner = await diskStorage.saveFile(filename);
    }

    if (ingredient) {
      await knex("tableIngredient").where({ plate_id }).del();

      const newIngredient = ingredient.split(",").map((item) => item.trim());

      const result = newIngredient.map((name) => {
        return {
          plate_id: plate_id,
          name,
          user_id: userId,
        };
      });

      await knex("tableIngredient").insert(result);
    }

    plate.title = title;
    plate.description = description;
    plate.price = price;
    category.titleCategory = titleCategory;

    await knex("tablePlate").update(plate).where({ id: plate_id });
    await knex("tableCategory").update(category).where({ plate_id: plate_id });

    return res.json({ plate, category });
  }
}
module.exports = plate_controller;
