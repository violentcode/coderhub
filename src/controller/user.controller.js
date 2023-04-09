const userService = require("../service/user.service");

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;

    const data = await userService.create(user);
    ctx.body = {
      message: "注册成功",
      data,
    };
  }
}

module.exports = new UserController();
