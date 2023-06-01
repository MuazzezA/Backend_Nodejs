const express = require("express");

const usersRouter = require("./routers/users-router.js");
const server = express();
const logger = require("./middlewares/logger.js");
const errorHandling = require("./middlewares/error-handling.js");
server.use(express.json()); // tüm istekrlerde body içerisindeki verilere ulaşabilmek için bunu parse ediyoruz
server.use(logger); // tüm isteklerde logger çalışacak

server.get("/", (req, res) => {
  res.send("Express 'ten merhaba - nodemon ile sürekli güncel");
});
server.use("/users", usersRouter);
server.use(errorHandling); // tüm hatalar için error handling çalışacak - en sonda kullanılması daha iyi

server.listen(3000, () => {
  console.log("http://localhost:3000 adresine gelen istekler dinleniyor...");
});
