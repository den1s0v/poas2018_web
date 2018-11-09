const validator = require('../server/validator');

const signupValidator = validator({
  login: { type: /^\w+$/, required: true },
  email: { type: /^\w+\@\w+\.[A-Za-z]{2,3}$/, required: true },
  password: { type: /^\w+$/, required: true },
  private: { type: 'boolean', required: true }
})

const loginValidator = validator({
  login: { type: /^\w+$/, required: false },
  email: { type: /^\w+\@\w+\.[A-Za-z]{2,3}$/, required: false },
  password: { type: /^\w+$/, required: true },
})

const updateValidator = validator({
  login: { type: /^\w+$/, required: false },
  email: { type: /^\w+\@\w+\.[A-Za-z]{2,3}$/, required: false },
  password: { type: /^\w+$/, required: false },
  private: { type: 'boolean', required: false }
})

module.exports = {
  signupValidator,
  loginValidator,
  updateValidator
}