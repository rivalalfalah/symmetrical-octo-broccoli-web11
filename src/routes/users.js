const express = require("express");

const users = express.Router();

const {
  create,
  drop,
  getAll,
  editPassword,
  getId,
} = require("../controllers/users");

users.get("/", getAll);

users.post("/", create);

users.patch("/account", editPassword);

users.delete("/:id", drop);

users.get("/:id", getId);

module.exports = users;
