const KoaRouter = require("@koa/router");
const { sign } = require("../controller/login.controller");
const { verifyLogin, verifyAuth } = require("../middleware/login.middleware");

const loginRouter = new KoaRouter({ prefix: "/login" });

loginRouter.post("/", verifyLogin, sign);

loginRouter.post("/test", verifyAuth, (ctx, body) => {
  ctx.body = "授权成功";
});

module.exports = loginRouter;
