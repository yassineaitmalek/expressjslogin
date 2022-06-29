const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const UserService = require("../Services/UserService")

// Setup the express server router
const AuthController = express.Router();

// On post
AuthController.post("/", async (req, res) => {



    let user = await UserService.getByUserName(req.body.userName)
    if (!user) throw new Error("Invalid userName");

    // console.log(user.password)
    // const passHash = await UserService.hashPass(req.body.password)
    // console.log(passHash)
    const valid = await bcrypt.compare(req.body.password, user.password)

    if (!valid) throw new Error("Invalid password.");

    const token = jwt.sign({
        id: user._id,
        roles: user.roles,
    }, process.env.JWT, { expiresIn: "24h" });

    res.send({
        ok: true,
        token: token
    });
});

module.exports = AuthController;