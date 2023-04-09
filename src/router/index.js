const fs = require("fs");
const path = require("path");

function registerRouters(app) {
  // 读取该文件夹下的所有文件
  const files = fs.readdirSync(__dirname);
  for (const file of files) {
    // 不读取本文件的内容
    if (!file.endsWith(".router.js")) continue;

    // 获取其他文件的router
    const router = require(path.resolve(__dirname, `./${file}`));

    // 给router注册
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
}

module.exports = registerRouters;
