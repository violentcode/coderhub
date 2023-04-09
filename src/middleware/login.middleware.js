const jwt = require("jsonwebtoken");
const { findUserByName } = require("../service/user.service");
const md5password = require("../utils/handle-password");
const {
  UNAME_OR_PWD_REQUIRE,
  UNAME_IS_NOT_EXIST,
  PWD_IS_INCORRECT,
  UNAUTHORIZATION,
} = require("../config/error");
const { PUBLIC_KEY } = require("../config/scerct");

// 1. 校验登录
async function verifyLogin(ctx, next) {
  // 1.判断用户名和密码是否都传入
  const { username, password } = ctx.request.body;
  if (!username || !password) {
    ctx.app.emit("error", UNAME_OR_PWD_REQUIRE, ctx);
    return;
  }

  // 2. 查看数据库中是否有用户名
  const users = await findUserByName(username);
  if (!users.length) {
    ctx.app.emit("error", UNAME_IS_NOT_EXIST, ctx);
    return;
  }

  // 3. 判断密码是否正确
  const md5pwd = users[0].password; //数据库中拿到加密后的密码
  if (md5pwd !== md5password(password)) {
    ctx.app.emit("error", PWD_IS_INCORRECT, ctx);
    return;
  }

  // 4. 保存user（为了让token的payload有id）
  ctx.user = users[0];
  await next();
}

// 2.校验token
async function verifyAuth(ctx, next) {
  if (!ctx.header.authorization) {
    return ctx.app.emit("error", UNAUTHORIZATION, ctx);
  }

  const authorization = ctx.header.authorization;

  const token = authorization.replace("Bearer ", "");
  try {
    const result = jwt.verify(token, PUBLIC_KEY, { algorithms: ["RS256"] });
    ctx.user = result;
  } catch (error) {
    ctx.app.emit("error", UNAUTHORIZATION, ctx);
    return;
  }
  await next();
}

module.exports = {
  verifyLogin,
  verifyAuth,
};
