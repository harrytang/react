const getUserUseCase = require('../usecases/getUserUseCase');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const invoke = async (req) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const [type, token] = authHeader.split(' ');

    if (token && type === 'Bearer') {
      const result = jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            throw createError(400, err.message);
          } else {
            // console.log(decoded);
            const userId = decoded.payload;
            return await getUserUseCase.handle(userId);
          }
        }
      );
      return result;
    }
  } else {
    throw createError(403, 'Authentication is required.');
  }
};

module.exports = { invoke };
