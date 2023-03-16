const { Router } = require("express");
const middleAuth = require("../middlewares/middleAuth");
const order_controller = require("../controllers/order_controller");
const orderRoutes = Router();

const orderController = new order_controller();

orderRoutes.post("/:user_id",middleAuth, orderController.create);
orderRoutes.get('/', orderController.show)
orderRoutes.patch('/:id', orderController.update)
orderRoutes.delete('/:id', orderController.delete)
module.exports = orderRoutes;
