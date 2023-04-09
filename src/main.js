const app = require("./app");
const { SERVER_PORT } = require("./config/server");
require("./utils/handler-error");

app.listen(SERVER_PORT, () => {
  console.log("服务器启动成功");
});
