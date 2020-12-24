const refreshTokenUseCase = require('../usecases/refreshTokenUseCase');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const invoke = async (req) => {
  const { token } = req.body;
  if (!token) {
    throw createError(403, 'Authentication required');
  }
  if (token) {
    return await refreshTokenUseCase.handle(token);
  }
};

module.exports = { invoke };
