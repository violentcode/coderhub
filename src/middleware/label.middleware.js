const { queryLabelByName, create } = require("../service/label.service");

// 判断label是否存在，不存在就添加
const verifyLabelExists = async (ctx, next) => {
  //   console.log(ctx.params.momentId, ctx.request.body.labels);
  const labels = ctx.request.body.labels;
  const newLabels = [];
  for (const label of labels) {
    const result = await queryLabelByName(label);
    const labelObj = { name: label };
    if (result) {
      labelObj.id = result.id;
    } else {
      const result = await create(label);
      labelObj.id = result.insertId;
    }
    newLabels.push(labelObj); // [{name: '游戏', id: 2}, {name: "运动", id: 12}]
  }
  ctx.labels = newLabels;
  await next();
};

module.exports = {
  verifyLabelExists,
};
