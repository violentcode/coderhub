const { create } = require("../service/file.service");
class FileController {
  async create(ctx, next) {
    console.log(ctx.request.file);
    const { size, filename, mimetype } = ctx.request.file;
    const { id } = ctx.user;
    const result = await create(filename, mimetype, size, id);
    ctx.body = {
      code: 0,
      message: "图片上传成功",
      data: result,
    };
  }
}

module.exports = new FileController();
