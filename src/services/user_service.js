const { hash } = require("bcryptjs");
const AppError = require("../utils/AppError");

class user_service {
  constructor(userRepositories) {
    this.userRepositories = userRepositories;
  }
  async execute({ name, email, password }) {
    //buscando email existente no banco de dados
    const checkUserExist = await this.userRepositories.FindByEmail(email);

    //checando se há usuario com o mesmo email cadastrado
    if (checkUserExist) {
      throw new AppError("O email informado já está em uso por outro usuario");
    }
    //fim do check do email

    //criptografia from password
    const bcryptjs_hash_password = await hash(password, 8);

    //inserindo informações (REGISTROS) no banco de dados
   const userCreate = await this.userRepositories.create({
      name,
      email,
      passsword: bcryptjs_hash_password,
    });

    //tratamento de erro
    if (!name) {
      throw new AppError("Nome é obrigatório");
    }
    return userCreate
  }
}
module.exports = user_service;
