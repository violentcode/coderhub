const pool = require("../app/database");

class FileService {
  async create(filename, mimetype, size, userId) {
    const statement =
      "INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?,?,?,?)";
    const [result] = await pool.execute(statement, [
      filename,
      mimetype,
      size,
      userId,
    ]);
    return result;
  }
}

module.exports = new FileService();
