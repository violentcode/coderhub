const pool = require("../app/database");

class LabelService {
  async create(name) {
    const statement = "INSERT INTO label (name) values (?)";
    const [result] = await pool.execute(statement, [name]);
    return result;
  }
}

module.exports = new LabelService();
