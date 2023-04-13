const KoaRouter = require("@koa/router");
const { verifyAuth } = require("../middleware/login.middleware");
const {
  create,
  list,
  detail,
  update,
  remove,
  addLabels,
} = require("../controller/moment.controller");
const { verifyPermission } = require("../middleware/permission.middleware");
const { verifyLabelExists } = require("../middleware/label.middleware");

const momentRouter = new KoaRouter({ prefix: "/moment" });
// 1.增
momentRouter.post("/", verifyAuth, create);

// 2.查
momentRouter.get("/", list);
momentRouter.get("/:momentId", detail);

// 3.改
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, update);

// 4.删
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, remove);

// 5.在moment中添加label
/**
 * 中间件
 * 1.是否登录
 * 2.是否有操作改moment的权限
 * 3.验证labels中的label是否存在于表中，不存在就添加
 * 4.所有label都在表中，加入到关系表中
 */
momentRouter.post(
  "/:momentId/labels",
  verifyAuth,
  verifyPermission,
  verifyLabelExists,
  addLabels
);

module.exports = momentRouter;
