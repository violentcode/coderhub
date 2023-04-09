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
}

module.exports = new UserService();
