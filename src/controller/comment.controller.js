const { create, remove } = require("../service/comment.service");

class CommentController {
  async create(ctx, next) {
    const userId = ctx.user.id;
    const { momentId, content } = ctx.request.body;
    const data = await create(userId, momentId, content);
    ctx.body = {
      code: 0,
      message: "评论添加成功",
      data,
    };
  }
  async reply(ctx, next) {
    const userId = ctx.user.id;
    const { momentId, commentId, content } = ctx.request.body;
    const data = await create(userId, momentId, content, commentId);
    ctx.body = {
      code: 0,
      message: "回复评论成功",
      data,
    };
  }
  async remove(ctx, next) {
    const commentId = ctx.params.commentId;
    const data = await remove(commentId);
    ctx.body = {
      code: 0,
      message: "评论删除成功",
      data,
    };
  }
}

module.exports = new CommentController();
