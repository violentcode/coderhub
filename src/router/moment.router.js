const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const {
  create,
  list,
  detail,
  update,
  remove,
} = require("../controller/moment.controller");
const { verifyPermission } = require("../middleware/permission.middleware");

const momentRouter = new KoaRouter({ prefix: "/moment" });
// 增
momentRouter.post("/", verifyAuth, create);

// 查
momentRouter.get("/", list);
momentRouter.get("/:momentId", detail);

// 改
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);

// 删
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);

module.exports = momentRouter;
