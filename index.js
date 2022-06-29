const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const userController = require("./Contollers/UserController.js")
const db = require("./models");
const authController = require("./Contollers/AuthController.js");


const app = express();

const PORT = process.env.PORT;
console.log(PORT)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/user", userController)
app.use("/auth", authController)
app.get("/", (req, res) => res.send("Welcome to the Users API!"));
app.all("*", (req, res) => res.send("You've tried reaching a route that doesn't exist."));

db.sequelize.sync().then(
  (req) => {
    app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
  }
)
