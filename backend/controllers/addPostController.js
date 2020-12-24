const addPostUseCase = require('../usecases/addPostUseCase');
const getUserUseCase = require('../usecases/getUserUseCase');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const invoke = async (req) => {
  // 1. Validate token
  const authHeader = req.headers.authorization;
  const postInput = req.body;

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
            const user = await getUserUseCase.handle(userId);
            const validatedPost = { ...postInput, username: user.username };
            return await addPostUseCase.handle(validatedPost);
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
