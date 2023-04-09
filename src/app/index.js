const Koa = require("koa");
const userRouter = require("../router/user.router");
const loginRouter = require("../router/login.router");
const bodyParser = require("koa-bodyparser");
const registerRouters = require("../router");

const app = new Koa();

app.use(bodyParser());

registerRouters(app);

module.exports = app;
