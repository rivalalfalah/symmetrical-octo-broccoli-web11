const express = require("express");

const transaction = express.Router();

const {
  create,
  edit,
  drop,
  getAll,
  getId,
} = require("../controllers/transaction");

transaction.get("/", getAll);

transaction.post("/", create);

transaction.patch("/:id", edit);

transaction.delete("/:id", drop);

transaction.get("/id/:id", getId);

module.exports = transaction;
