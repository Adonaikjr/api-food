const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const { compare } = require("bcryptjs");
const authJwTokenConfig = require("../configs/jwt");
const { sign } = require("jsonwebtoken");

class session_controller {
  async createSessionSignUp(req, res) {
    const { email, password } = req.body;
    //validando se usuario existe no banco de dados
    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("E-mail ou senha incorretos", 401);
    }
    //validando senha do usuario
    const checkPassword = await compare(password, user.password);
    if (!checkPassword) {
      throw new AppError("E-mail ou senha incorretos", 401);
    }
    //biblioteca jwt autenticando usuario
    const { secret, expiresIn } = authJwTokenConfig.jwt;
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn,
    });

    return res.json({ user, token });
  }

  async show(req, res){
    const {id} = req.params

    const user = await knex("users").where({id}).first()

    res.json(user)
  }
}

module.exports = session_controller;
