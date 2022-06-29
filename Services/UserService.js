const uuid = require("uuid")
const { User } = require("../models")
const bcrypt = require("bcrypt");

module.exports = class UserService {

  static hashPass = async (password) => {
    // Hash the password
    const salt = await bcrypt.genSalt(15);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  static getAllUsers = async () => {
    const users = await User.findAll()
    return users
  }

  static createUser = async (body) => {
    let { userName, password } = body
    const id = uuid.v4()
    password = await this.hashPass(password)
    const user = await User.create({ id, userName, password })

    return user
  }

  static getUser = async (id) => {

    const user = await User.findByPk(id)
    return user
  }


  static getByUserName = async (userName) => {

    const user = await User.findOne({
      where: {
        username: userName
      }
    }
    )
    return user;

  }

  static deleteUser = async (id) => {


    await User.destroy({
      where: {
        id: id
      }
    }
    )

  }

}