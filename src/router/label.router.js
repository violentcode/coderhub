const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const { create } = require("../controller/label.controller");

const labelRouter = new KoaRouter({ prefix: "/label" });

// 1.添加label
labelRouter.post("/", verifyAuth, create);

module.exports = labelRouter;
