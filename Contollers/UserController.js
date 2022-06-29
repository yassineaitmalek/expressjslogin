const express = require("express");
const res = require("express/lib/response");
const security = require("../Security/Security");
const UserService = require("../Services/UserService")



const userController = express.Router();



userController.get("/all", [security], async (req, res) => {

  res.send(await UserService.getAllUsers());
}
)

userController.get("/:id", [security], async (req, res) => { res.send(await UserService.getUser(req.params.id)) })

// userController.get("/userName/:userName", UserService.getByUserName)

userController.post("/add", async (req, res) => { res.send(await UserService.createUser(req.body)) })

userController.delete("/:id", [security], async (req, res) => { await UserService.deleteUser(req.params.id); res.sendStatus(200); })

userController.patch("/:id", UserService.getAllUsers)

module.exports = userController;