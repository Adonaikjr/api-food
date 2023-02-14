const { verify } = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const jwt = require("../configs/jwt");

function middleAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new AppError("jwt token nao informado", 401);
  }
  const [, token] = authHeader.split(" "); //split separa a string
  try {
    const { sub: user_id } = verify(token, jwt.jwt.secret);
    req.user = {
      id: Number(user_id),
    };
    return next()
  } catch {
    throw new AppError('JWT invalido')
  }
}

module.exports = middleAuth