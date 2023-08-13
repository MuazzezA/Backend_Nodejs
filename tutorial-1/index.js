const express = require("express");
const server = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT;

async function connectMongoDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("MongoDB connection error: ", error);
  }
}
connectMongoDB();

const usersRouter = require("./routers/users-router.js");

const logger = require("./middlewares/logger.js");
const errorHandling = require("./middlewares/error-handling.js");
server.use(express.json()); // tüm istekrlerde body içerisindeki verilere ulaşabilmek için bunu parse ediyoruz
server.use(logger); // tüm isteklerde logger çalışacak

server.get("/", (req, res) => {
  res.send("Express 'ten merhaba - nodemon ile sürekli güncel");
});
server.use("/users", usersRouter);
server.use(errorHandling); // tüm hatalar için error handling çalışacak - en sonda kullanılması daha iyi

server.listen(PORT, () => {
  console.log("http://localhost:3000 adresine gelen istekler dinleniyor...");
});
