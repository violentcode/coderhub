const KoaRouter = require("@koa/router");
const { create } = require("../controller/user.controller");
const {
  verification,
  handlePassword,
} = require("../middleware/user.middleware");

const userRouter = new KoaRouter({ prefix: "/user" });

userRouter.post("/", verification, handlePassword, create);

module.exports = userRouter;
