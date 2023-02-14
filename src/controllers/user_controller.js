const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const user_repositories = require("../repositories/user_repositories");
const user_service = require("../services/user_service");
const sqliteConnection = require("../database/sqlite");

class user_controller {
  //criando o usuario
  async createUser(req, res) {
    //pegando valores do body
    const { name, email, password } = req.body;

    const userRepositories = new user_repositories();
    const userService = new user_service(userRepositories);
    
    await userService.execute({ name, email, password });

    return res.status(201).json();
  }
  //fim criação do usuario

  //atualizando o usuario
  async UpdateUser(req, res) {
    const { name, email, password, old_pass } = req.body;
    const user_id = req.user.id;

    const database = await sqliteConnection();
    const user = await database.get("SELECT * FROM users WHERE id =(?)", [
      user_id,
    ]);

    if (!user) {
      throw new AppError("Este usuario não foi encontrado");
    }

    const checkUpdateEmailExist = await database.get(
      "SELECT * FROM users WHERE email = (?)",
      [email]
    );

    //arrumar
    if (checkUpdateEmailExist && checkUpdateEmailExist.id !== user.id) {
      throw new AppError("Este email já esta em uso.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_pass) {
      throw new AppError("Informe a senha antiga.");
    }

    if (password && old_pass) {
      const checkOldPass = await compare(old_pass, user.password);

      if (!checkOldPass) {
        throw new AppError("Senha antiga não confere");
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
    );

    return res.status(200).json();
  }
}
module.exports = user_controller;
