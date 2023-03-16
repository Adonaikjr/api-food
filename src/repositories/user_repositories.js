const sqliteConnection = require("../database/sqlite");

class user_repositories {
  async FindByEmail(email) {
    //conexão com o banco de dados
    const database = await sqliteConnection();
    //buscando email existente no banco de dados
    const user = await database.get("SELECT * FROM users WHERE email = (?)", [
      email,
    ]);
    return user;
  }
  
  async create({ name, email, passsword, isAdmin }) {
    const database = await sqliteConnection();
    //inserindo informações (REGISTROS) no banco de dados
    
    const userId = await database.run(
      "INSERT INTO users (name, email, password, isAdmin) VALUES (?, ?, ?, ?)",
      [name, email, passsword, isAdmin]
    );
    return { id: userId };
  }
}
module.exports = user_repositories;
