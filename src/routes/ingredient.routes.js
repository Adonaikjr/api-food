const { Router } = require("express");
const ingredient_controller = require("../controllers/ingredient_controller");
const middleAuth = require("../middlewares/middleAuth");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const ingredientRoute = Router();

const upload = multer(uploadConfig.MULTER);

const ingredientController = new ingredient_controller();

ingredientRoute.post("/:user_id", ingredientController.create);
ingredientRoute.get("/:user_id", ingredientController.show);
ingredientRoute.patch(
  "/banners",
  middleAuth,
  upload.single("file"),
  ingredientController.updateBanner
);

module.exports = ingredientRoute;
