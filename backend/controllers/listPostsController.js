const listPostsUseCase = require('../usecases/listPostsUseCase');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { Unauthorized } = require('http-errors');

const invoke = async (req) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    const [type, token] = authHeaders.split(' ');
    if (token && type === 'Bearer') {
      const result = jwt.verify(
        token,
        process.env.TOKEN_SECRET,
        async (err, decoded) => {
          if (err) {
            throw createError(400, err.message);
          } else {
            // console.log(decoded);
            return await listPostsUseCase.handle();
          }
        }
      );
      return result;
    }
  } else {
    throw createError(401, Unauthorized);
  }
};

module.exports = { invoke };
