const pool = require("../app/database");
class UserService {
  async create(user) {
    const { username, password } = user;
    const statement = "INSERT INTO `user` (username, password) VALUES (?, ?);";
    console.log(username, password);
    const [result] = await pool.execute(statement, [username, password]);
    return result;
  }
  async findUserByName(username) {
    const statement = "SELECT * FROM `user` WHERE username=?";
    const [result] = await pool.execute(statement, [username]);
    return result;
  }
  async queryAvatarById(id) {
    const statement = "SELECT * FROM avatar WHERE user_id = ?";
    const [result] = await pool.execute(statement, [id]);
    return result[result.length - 1]; // 取出最新的头像
  }
}

module.exports = new UserService();
