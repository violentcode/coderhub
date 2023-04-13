const pool = require("../app/database");

class LabelService {
  async create(name) {
    const statement = "INSERT INTO label (name) values (?)";
    const [result] = await pool.execute(statement, [name]);
    return result;
  }

  async queryLabelByName(name) {
    const statement = "SELECT * FROM label WHERE name = ?";
    const [result] = await pool.execute(statement, [name]);
    return result[0];
  }
}

module.exports = new LabelService();
