const { Router } = require("express");
const userRouters = require("./users.routes");
const sessionRouter = require("./session.routes");
const plateRouter = require("./plate.routes");
const ingredientRoutes = require("./ingredient.routes");
const orderRoutes = require("./order.routes");

const routes = Router();

routes.use("/users", userRouters);
routes.use("/session", sessionRouter);
routes.use("/plate", plateRouter);
routes.use("/ingredient", ingredientRoutes);
routes.use('/order', orderRoutes)
module.exports = routes;
