const { Router } = require("express");
const session_controller = require("../controllers/session_controller");

const sessionRouter = Router();

const sessionController = new session_controller();

sessionRouter.post("/", sessionController.createSessionSignUp);

module.exports = sessionRouter;
