const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class order_controller {
  async create(req, res) {
    const { status, plate_id, description } = req.body;
    const { user_id } = req.params;

    const plate = await knex("tablePlate")
      .select("title")
      .where({ id: plate_id });

      const newPlate = plate?.map(item => {
        return item.title
      })

    await knex("tableOrder").insert({
      status,
      plate_id,
      user_id,
      description:  newPlate
    });

    const resOrder = {
      status,
      plate_id,
      description,
      user_id,
      plate,
    };
    return res.json(resOrder);
  }
  async show(req, res) {
    const Orders = await knex("tableOrder");
    

    return res.json({ Orders });
  }
  async update(req, res) {
    const { id } = req.params;
    const { status } = req.body;

    const Order = await knex("tableOrder").where({ id: id }).first();

    Order.status = status;
 
    if (Order.status) {
      await knex("tableOrder").update(Order).where({ id:id });
    }

     return res.json();
  }
  async delete(req, res) {
    const { id } = req.params;
    await knex("tableOrder").where({ id }).delete();
    return res.json();
  }
}
module.exports = order_controller;
