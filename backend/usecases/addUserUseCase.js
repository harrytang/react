const userRepository = require('../repositories/userRepository');
const User = require('../entities/User');
const createError = require('http-errors');

const handle = async (validatedUser) => {
  const existUser = await userRepository.checkExist(validatedUser.username);
  if (!existUser) {
    const newUser = new User(
      validatedUser.username,
      validatedUser.email,
      validatedUser.password
    );
    return await userRepository.insert(newUser);
  } else {
    throw createError(406, 'The user is already exist');
  }
};

module.exports = { handle };
