const { queryAvatarById } = require("../service/user.service");
const fs = require("fs");

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
    console.log(filename, mimetype);
    console.log(ctx.type);
    // ctx.type = mimetype;
    // ctx.body = fs.createReadStream(
    //   `../../uploads/8ef82df662374642376d3fb3785bec35`
    // );
  }
}

module.exports = new UserController();
