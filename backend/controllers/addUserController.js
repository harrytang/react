const addUserUseCase = require('../usecases/addUserUseCase');
const createError = require('http-errors');
const Validator = require('validatorjs');

const invoke = async (req) => {
  // Validation rules
  let rules = {
    username: 'required|max:10',
    email: 'required|email',
    password: 'required|min:6',
  };

  let validation = new Validator(req.body, rules);
  if (!validation.passes()) {
    const errors = validation.errors.all();
    if (errors.username) {
      throw createError(400, errors.username[0]);
    } else if (errors.email) {
      throw createError(400, errors.email[0]);
    } else {
      throw createError(400, errors.password[0]);
    }
  } else {
    return await addUserUseCase.handle(req.body);
  }
};

module.exports = { invoke };
