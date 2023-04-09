const userService = require("../service/user.service");
const { UNAME_OR_PWD_REQUIRE, UNAME_NOT_REPEAT } = require("../config/error");
const md5password = require("../utils/handle-password");

// 1.校验注册
async function verification(ctx, next) {
  const user = ctx.request.body;
  const { username, password } = user;
  // 用户名和密码不能为空
  if (!username || !password) {
    ctx.app.emit("error", UNAME_OR_PWD_REQUIRE, ctx);
    return;
  }

  // 用户名不能重复
  const users = await userService.findUserByName(username);
  if (users.length) {
    ctx.app.emit("error", UNAME_NOT_REPEAT, ctx);
    return;
  }
  await next();
}

// 2.处理密码加密
async function handlePassword(ctx, next) {
  const password = ctx.request.body.password;
  ctx.request.body.password = md5password(password);
  await next();
}

module.exports = {
  verification,
  handlePassword,
};
