const auth = require("express").Router();

const authController = require("../controllers/auth");

auth.post("/", authController.login);

module.exports = auth;
