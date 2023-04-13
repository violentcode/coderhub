const pool = require("../app/database");

class MomentService {
  async create(momentId, content) {
    const statement = "INSERT INTO `moment` (user_id, content) VALUES (?, ?);";
    const [result] = await pool.execute(statement, [momentId, content]);
    return result;
  }
  async queryList(size = 10, offset = 0) {
    const statement = `SELECT m.id id, m.content content, JSON_OBJECT('id', u.id ,'author' ,u.username) AS user ,
      (SELECT COUNT(*) FROM comment WHERE comment.moment_id = m.id) commentCount ,
      (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
      FROM moment m 
      LEFT JOIN user u ON m.user_id = u.id LIMIT ? OFFSET ?;`;
    const [result] = await pool.execute(statement, [
      String(size),
      String(offset),
    ]);
    return result;
  }
  async detail(momentId) {
    const statement = `SELECT m.id id, m.content content, 
    JSON_OBJECT('id', u.id ,'author' ,u.username) AS user,
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', comment.id, 'content', comment.content, 'user', JSON_OBJECT('id', user.id, 'name', user.username))) 
    FROM comment LEFT JOIN user ON comment.user_id = user.id WHERE comment.moment_id = m.id) comments,
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', label.id, 'name', label.name))
    FROM moment_label ml LEFT JOIN label ON ml.label_id = label.id WHERE ml.moment_id = m.id ) labels
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
  // 判断关系表中是否有label
  async isExistsLabel(momentId, labelId) {
    const statement =
      "SELECT * FROM moment_label WHERE moment_id = ? && label_id = ?;";
    const [result] = await pool.execute(statement, [momentId, labelId]);
    return !!result.length;
  }
  // 判断关系表中添加label
  async addLabel(momentId, labelId) {
    const statement =
      "INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);";
    const [result] = await pool.execute(statement, [momentId, labelId]);
    return result;
  }
}

module.exports = new MomentService();
