const express = require("express");
const {
  create,
  edit,
  drop,
  getAll,
  getSearch,
} = require("../controllers/promos");
const imageUpload = require("../middlewares/upload");

const promos = express.Router();

// http://localhost:8080/api/product
promos.get("/", getAll);

promos.post("/", imageUpload.single("image"), create);

promos.patch("/:id", imageUpload.single("image"), edit);

promos.delete("/:id", drop);

promos.get("/search", getSearch);

module.exports = promos;
