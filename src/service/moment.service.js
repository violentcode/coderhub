const pool = require("../app/database");

class MomentService {
  async create(momentId, content) {
    const statement = "INSERT INTO `moment` (user_id, content) VALUES (?, ?);";
    const [result] = await pool.execute(statement, [momentId, content]);
    return result;
  }
  async queryList(size = 10, offset = 0) {
    const statement = `SELECT m.id id, m.content content, JSON_OBJECT('id', u.id ,'author' ,u.username) AS user ,
      (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount FROM moment m 
      LEFT JOIN user u ON m.user_id = u.id LIMIT ? OFFSET ?;`;
    const [result] = await pool.execute(statement, [
      String(size),
      String(offset),
    ]);
    return result;
  }
  async detail(momentId) {
    const statement = `SELECT m.id id, m.content content, JSON_OBJECT('id', u.id ,'author' ,u.username) AS user,
      (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', comment.id, 'content', comment.content)) FROM comment WHERE comment.moment_id = m.id) contents
      FROM moment m LEFT JOIN user u ON m.user_id = u.id WHERE m.id = ?;`;
    const [result] = await pool.execute(statement, [momentId]);
    return result;
  }
  async update(momentId, content) {
    const statement = "UPDATE  `moment` SET content = ? WHERE id = ?;";
    const [result] = await pool.execute(statement, [content, momentId]);
    return result;
  }
  async remove(momentId) {
    const statement = "DELETE FROM `moment` WHERE id = ?;";
    const [result] = await pool.execute(statement, [momentId]);
    return result;
  }
}

module.exports = new MomentService();
