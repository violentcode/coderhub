const KoaRouter = require("@koa/router");
const { create, reply, remove } = require("../controller/comment.controller");
const { verifyAuth } = require("../middleware/login.middleware");
const { verifyPermission } = require("../middleware/permission.middleware");

const commentRouter = new KoaRouter({ prefix: "/comment" });

// 增
commentRouter.post("/", verifyAuth, create);
commentRouter.post("/reply", verifyAuth, reply);

// 删
commentRouter.delete("/:commentId", verifyAuth, verifyPermission, remove);

module.exports = commentRouter;
