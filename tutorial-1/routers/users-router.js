const router = require("express").Router();
let userData = require("../data/users.js");

/**
 * index içince server.use("users", usersRouter); kullanıldığı için
 * burada artık /users diye kullanmaya gerek yok direkt / yazarak kullanabiliriz
 */

router.get("/", (req, res) => {
  res.status(200).json(userData);
});

router.get("/:id", (req, res) => {
  /**
   * burada birden fazla parametre de alabiliriz
   * localhost:3000/users/1?name=leane&username=bret
   * burada name ve username 'e ulaşmak için req.query kullanırız : req.query;
   */

  /**
   * ayrıca isekte body içerisindeki verilere de ulaşabiliriz : req.body;
   * body içerisindeki verilere ulaşabilmek için body-parser modülünü kullanmamız gerekiyor, yoksa undefined gelir
   * body-parser modülü express içerisinde yer alıyor : server.use(express.json()); ile kullanıyoruz
   */
  console.log("params: ", req.params);
  console.log("query: ", req.query);
  console.log("body: ", req.body);

  const { id } = req.params;
  const user = userData.find((user) => user.id === parseInt(id));
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ message: `User with id ${id} not found` });
  }
});

let next_id = 4;

// hatalar için next lazım
router.post("/", (req, res, next) => {
  let newUser = req.body;

  if (newUser.name || newUser.username) {
    newUser.id = next_id;
    next_id++;
    userData.push(newUser);
    res.status(201).json(newUser);
  } else {
    next({
      statusCode: 400,
      errorMessage: "Please provide name and username",
    }); // hata oluştuğunda error handling'e gidecek ~ içini boş gönderirsen müsait middlewwarer kısmına gider
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = userData.find((user) => user.id === Number(id));

  if (user) {
    userData = userData.filter((user) => user.id !== Number(id)); // kullanıcının silmek istediği değer silindi
    res.status(204).json({ message: `User with id ${id} deleted` });
    // res.status(204).end(); // 204 status kodu ile de kullanıcıya bir mesaj göndermeden sadece status kodu gönderilebilir
  } else {
    res.status(404).json({ message: `User with id ${id} not found` });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const user = userData.find((item) => item.id === Number(id));
  if (user) {
    const updatedUser = { ...user, ...req.body };
    userData = userData.map((item) =>
      item.id === Number(id) ? updatedUser : item
    );
    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ message: `User with id ${id} not found` });
  }
});

module.exports = router;
