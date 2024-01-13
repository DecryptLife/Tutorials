require("dotenv").config();
const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticateJWT } = require("./middleware/auth");

app.use(express.json());

const products = [
  {
    name: "keyboard",
    price: "$20",
    username: "benson",
  },
  {
    name: "laptop",
    price: "$1500",
    username: "thomas",
  },
];

app.get("/products_auth", authenticateJWT, (req, res) => {
  res.json(products.filter((product) => product.username === req.user.name));
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/login", (req, res) => {
  const username = req.body.username;

  const user = { name: username };

  const token = jwt.sign(user, process.env.ACCESS_SECRET);
  res.json({ message: "Logged in successfully", token });
});

app.listen(3000);
