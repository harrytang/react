const userRepository = require("../repositories/userRepository");
const tokenRepository = require("../repositories/tokenRepository");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const generateAccessToken = (userId) => {
  try {
    return jwt.sign({ userId }, process.env.TOKEN_SECRET, {
      expiresIn: "10s",
    });
  } catch (error) {
    throw createError(500, `Cannot generate access token, the error was ${error.message}`);
  }
};

const generateRefreshToken = (userId) => {
  try {
    return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw createError(500, "Cannot generate refresh token.");
  }
};

const handle = async (validatedUser) => {
  let existUser = await userRepository.find(validatedUser.username);

  if (existUser && existUser.password == validatedUser.password) {
    const accessToken = generateAccessToken(existUser.userId);
    const refreshToken = generateRefreshToken(existUser.userId);
    await tokenRepository.insert(refreshToken);
    return { accessToken, refreshToken };
  } else {
    throw createError(400, "Invalid username and password!");
  }
};

module.exports = { handle };
