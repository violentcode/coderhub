const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const registerRouters = require("../router");
const static = require("koa-static");

const app = new Koa();

app.use(bodyParser());

registerRouters(app);

module.exports = app;
