const { NOT_PERMISSION } = require("../config/error");
const { checkResource } = require("../service/permission.service.js");

// 1.检测当前用户是否有删除和修改moment的权限
async function verifyPermission(ctx, next) {
  const userId = ctx.user.id;
  const resourceKey = Object.keys(ctx.params)[0];
  const resourceId = ctx.params[resourceKey];
  const resourceName = resourceKey.replace("Id", "");

  const isPermission = await checkResource(
    String(userId),
    resourceId,
    resourceName
  );
  if (!isPermission) {
    ctx.app.emit("error", NOT_PERMISSION, ctx);
    return;
  }
  await next();
}

module.exports = {
  verifyPermission,
};
