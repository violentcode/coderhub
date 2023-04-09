const pool = require("../app/database");

class CommentService {
  async create(userId, momentId, content, commentId = null) {
    const statement =
      "INSERT INTO `comment` (content, user_id, moment_id, comment_id) VALUES (?,?,?,?);";
    const [result] = await pool.execute(statement, [
      content,
      userId,
      momentId,
      commentId,
    ]);

    return result;
  }
}

module.exports = new CommentService();
