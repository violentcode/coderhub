const crypto = require("crypto");

// md5加密方法
function md5password(password) {
  const md5 = crypto.createHash("md5");
  const md5pwd = md5.update(password).digest("hex");

  return md5pwd;
}

module.exports = md5password;
