const jwt = require("jsonwebtoken");
const { PRIVATE_KEY } = require("../config/scerct");

class LoginController {
  sign(ctx, next) {
    // 1. 获取信息
    const { id, username } = ctx.user;
    // 2. 颁发令牌token
    const token = jwt.sign({ username, id }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    });

    // 3. 返回数据
    ctx.body = { code: 0, data: { id, username, token } };
  }
}

module.exports = new LoginController();
