const { Router } = require("express");
const plate_controller = require("../controllers/plate_controller");
const middleAuth = require("../middlewares/middleAuth");
const uploadConfig = require("../configs/upload");
const multer = require("multer");
const plateRouter = Router();

const upload = multer(uploadConfig.MULTER);

const plateController = new plate_controller();


plateRouter.post("/:user_id", middleAuth, upload.single('file'), plateController.create);
plateRouter.get("/:id", plateController.show);
plateRouter.delete("/:id", plateController.delete);
plateRouter.get("/", plateController.index);
plateRouter.get("/admin/:user_id", plateController.listPlate);

module.exports = plateRouter;
