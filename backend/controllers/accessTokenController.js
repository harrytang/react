const accessTokenUseCase = require('../usecases/accessTokenUseCase');
const createError = require('http-errors');
const Validator = require('validatorjs');

const invoke = async (req) => {
  // Validation rules
  let rules = {
    username: 'required|max:10',
    password: 'required|min:6',
  };

  let validation = new Validator(req.body, rules);
  if (!validation.passes()) {
    const errors = validation.errors.all();
    if (errors.username) {
      throw createError(400, errors.username[0]);
    } else {
      throw createError(400, errors.password[0]);
    }
  } else {
    return await accessTokenUseCase.handle(req.body);
  }
};

module.exports = { invoke };
