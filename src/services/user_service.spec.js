const user_service = require("./user_service");
const user_repositories_memory = require("../repositories/user_repository_memory");
const AppError = require("../utils/AppError");

describe("user_service_test", () => {
  let userRepositoriesMemory = null
  let userService = null

  beforeEach( () => {
     userRepositoriesMemory = new user_repositories_memory()
     userService = new user_service(userRepositoriesMemory)
  })

  it("create user test", async () => {
    const user = {
      name: "john joe",
      email: "johnjoe@johnjoe",
      password: "1234",
    };
    const userCreate = await userService.execute(user);

    expect(userCreate).toHaveProperty("id");
  });

  it("check exists email user", async () => {
    const user1 = {
      name: "teste1",
      email: "teste@teste",
      password: "123",
    };
    const user2 = {
      name: "teste2",
      email: "teste@teste",
      password: "1234",
    };

    
    await userService.execute(user1)
    await expect(userService.execute(user2)).rejects.toEqual(new AppError("O email informado já está em uso por outro usuario"))

  });

});
