const {
  create,
  queryList,
  detail,
  update,
  remove,
} = require("../service/moment.service");
class MomentController {
  async create(ctx, next) {
    const { content } = ctx.request.body;
    const { id } = ctx.user;
    const data = await create(id, content);
    ctx.body = {
      code: 0,
      message: "动态添加成功",
      data,
    };
  }
  async list(ctx, next) {
    const { offset, size } = ctx.query;
    const data = await queryList(size, offset);
    ctx.body = {
      code: 0,
      data,
    };
  }
  async detail(ctx, next) {
    const { momentId } = ctx.params;
    const data = await detail(momentId);
    ctx.body = {
      code: 0,
      data: data[0],
    };
  }

  async update(ctx, next) {
    const { id } = ctx.params;
    const { content } = ctx.request.body;
    const data = await update(id, content);
    ctx.body = {
      code: 0,
      message: "动态修改成功",
      data,
    };
  }

  async remove(ctx, next) {
    const { id } = ctx.params;
    const data = await remove(id);
    ctx.body = {
      code: 0,
      message: "动态删除成功",
      data,
    };
  }
}

module.exports = new MomentController();
