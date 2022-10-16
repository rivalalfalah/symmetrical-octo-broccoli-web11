const express = require("express");
const {
  create,
  edit,
  drop,
  getAll,
  getSearch,
} = require("../controllers/promos");

const promos = express.Router();

// http://localhost:8080/api/product
promos.get("/", getAll);

promos.post("/", create);

promos.patch("/:promos_id", edit);

promos.delete("/:promos_id", drop);

promos.get("/search", getSearch);

module.exports = promos;
