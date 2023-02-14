const sqliteConnection = require("../../sqlite");
const CreateUsersMigrations = require("./create_users_migrations");

async function MigrationsStart() {
  const schemas = [CreateUsersMigrations].join("");
  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.error(error));
}
module.exports = MigrationsStart