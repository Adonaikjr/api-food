const { Router } = require("express");
const user_controller = require("../controllers/user_controller");
const middleAuth = require("../middlewares/middleAuth");
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const user_avatar_controller = require("../controllers/user_avatar_controller");

const userRouters = Router();

const userController = new user_controller();
const userAvatarController = new user_avatar_controller();

const upload = multer(uploadConfig.MULTER);

userRouters.post("/", userController.createUser);
userRouters.get("/:adm", userController.show);
userRouters.put("/", middleAuth, userController.UpdateUser);

userRouters.patch(
  "/avatar",
  middleAuth,
  upload.single("avatar"),
  userAvatarController.updateAvatar
);

module.exports = userRouters;
