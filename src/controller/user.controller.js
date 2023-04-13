const { queryAvatarById } = require("../service/user.service");
const fs = require("fs");
const { resolve } = require("path");
const { UPLOADS_PATH } = require("../config/path");

class UserController {
  async create(ctx, next) {
    const user = ctx.request.body;

    const data = await userService.create(user);
    ctx.body = {
      message: "注册成功",
      data,
    };
  }

  async queryAvatar(ctx, next) {
    const id = ctx.params.id;
    const avatarInfo = await queryAvatarById(id);
    const { filename, mimetype } = avatarInfo;

    ctx.type = mimetype;
    ctx.body = fs.createReadStream(
      resolve(__dirname, `../../${UPLOADS_PATH}/${filename}`)
    );
  }
}

module.exports = new UserController();
