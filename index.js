require("dotenv").config();
const { query } = require("express");
const express = require("express");
const morgan = require("morgan");

//import db
const postgreDB = require("./src/config/postgre"); //symmetrical-octo-broccoli-web11\src\config\postgre.js

// import main router
const mainRouter = require("./src/routes/main");

//init express application
const server = express();

const PORT = 8080;

postgreDB
  .connect()
  .then(() => {
    console.log("DB connected");

    server.use(express.static("./public"));
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(
      morgan(":method :url :status :res[content-length] - :response-time ms")
    );

    server.use(mainRouter);

    server.listen(PORT, () => {
      console.log(`server is running at port ${PORT}`);
    });
  })

  .catch((err) => {
    console.log(err);
  });
