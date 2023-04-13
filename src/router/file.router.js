const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { handlerAvatar } = require("../middleware/file.middleware");
const { create } = require("../controller/file.controller");

const fileRouter = new KoaRouter({ prefix: "/file" });

fileRouter.post("/avatar", verifyAuth, handlerAvatar, create);

module.exports = fileRouter;
