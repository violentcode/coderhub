const app = require("../app/index");

app.on("error", (errorMsg, ctx) => {
  let code = 0;
  let message = "";
  switch (errorMsg) {
    case "uname_or_pwd_require":
      code = -1001;
      message = "用户名或密码不能为空";
      break;
    case "uname_not_repeat":
      code = -1002;
      message = "用户名已经被占用，请输入新的用户名";
      break;
    case "uname_is_not_exist":
      code = -1003;
      message = "用户名不存在，请检查用户名";
      break;
    case "pwd_is_incorrect":
      code = -1004;
      message = "密码输入错误，请重新输入";
      break;
    case "unauthorization":
      code = -1005;
      message = "无效token或token过期";
      break;
    case "not_permission":
      code = -2001;
      message = "没有操作权限";
      break;
  }
  ctx.body = {
    code,
    message,
  };
});
