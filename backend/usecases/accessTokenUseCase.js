const userRepository = require('../repositories/userRepository');
const tokenRepository = require('../repositories/tokenRepository');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const generateAccessToken = (payload) => {
  return jwt.sign({ payload }, process.env.TOKEN_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (payload) => {
  return jwt.sign({ payload }, process.env.REFRESH_TOKEN_SECRET);
};

const handle = async (validatedUser) => {
  let existUser = await userRepository.find(validatedUser.username);

  if (existUser && existUser.password === validatedUser.password) {
    const accessToken = generateAccessToken(existUser.userId);
    const refreshToken = generateRefreshToken(existUser.userId);
    tokenRepository.refreshTokenStorage(refreshToken);
    return { accessToken, refreshToken };
  } else {
    throw createError(400, 'Invalid username and password!');
  }
};

module.exports = { handle };
