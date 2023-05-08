const { Router } = require("express");
const ingredient_controller = require("../controllers/ingredient_controller");
const middleAuth = require("../middlewares/middleAuth");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const ingredientRoutes = Router();

const upload = multer(uploadConfig.MULTER);

const ingredientController = new ingredient_controller();

ingredientRoutes.post("/:user_id", ingredientController.create);
ingredientRoutes.get("/:user_id", ingredientController.show);

module.exports = ingredientRoutes;
