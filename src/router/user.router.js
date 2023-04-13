const KoaRouter = require("@koa/router");
const { create, queryAvatar } = require("../controller/user.controller");
const {
  verification,
  handlePassword,
} = require("../middleware/user.middleware");

const userRouter = new KoaRouter({ prefix: "/user" });

// 创建用户
userRouter.post("/", verification, handlePassword, create);

// 查询头像
userRouter.get("/avatar/:id", queryAvatar);

module.exports = userRouter;
