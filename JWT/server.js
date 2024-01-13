const express = require("express");
const app = express();

const jwt = require("jsonwebtoken");

const products = [
  {
    name: "keyboard",
    price: "$20",
  },
  {
    name: "laptop",
    price: "$1500",
  },
];
app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(3000);
