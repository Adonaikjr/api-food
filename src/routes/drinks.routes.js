const { Router } = require("express");
const drinks_controller = require("../controllers/drinks_controller");

const drinksRoute = Router();

const drinksController = new drinks_controller;

drinksRoute.post("/", drinksController.create);

module.exports = drinksRoute;
