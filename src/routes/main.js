const express = require("express");

const products = require("./products");
const users = require("./users");
const promos = require("./promos");
const transaction = require("./transaction");
const auth = require("./auth");
const uploadImg = require("../middlewares/upload");

const main = express.Router();

const prefix = "/api";

main.use(`${prefix}/products`, products);
main.use(`${prefix}/users`, users);
main.use(`${prefix}/promos`, promos);
main.use(`${prefix}/transaction`, transaction);
main.use(`${prefix}/auth`, auth);

//HTTP route
// http://localhost:8080/
main.get("/", (req, res) => {
  res.json({
    msg: "welcome",
  });
});

module.exports = main;
