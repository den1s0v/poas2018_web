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

const addSampleValidator = validator({
  title: { type: 'string', required: true },
  // summary: { type: 'string', required: true },
  // sampleType: { type: 'string', required: true },
  cases: { type: 'array', required: true }
})

module.exports = {
  signupValidator,
  loginValidator,
  updateValidator,
  addSampleValidator
}