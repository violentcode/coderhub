const multer = require("@koa/multer");

const upload = multer({
  dest: "./uploads",
});
// const upload = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, "./uploads");
//     },
//     filename: (req, file, cb) => {
//       cb(null, +Date.now() + "_" + file.originalname);
//     },
//   }),
// });

const handlerAvatar = upload.single("avatar");

module.exports = {
  handlerAvatar,
};
