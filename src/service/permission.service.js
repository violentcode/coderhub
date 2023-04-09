const pool = require("../app/database");

class PermissionService {
  async checkResource(userId, resourceId, resourceName) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`;
    const [result] = await pool.execute(statement, [resourceId, userId]);

    return !!result.length;
  }
}

module.exports = new PermissionService();
