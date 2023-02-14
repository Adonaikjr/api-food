const { Router } = require("express");
const userRouters = require("./users.routes");
const sessionRouter = require("./session.routes");
const plateRouter = require("./plate.routes");
const ingredientRoute = require("./ingredient.routes");
const drinksRoute = require("./drinks.routes");
const routes = Router();

routes.use("/users", userRouters);
routes.use("/session", sessionRouter);
routes.use("/plate", plateRouter);
routes.use("/ingredient", ingredientRoute);
routes.use("/drinks", drinksRoute);
module.exports = routes;
