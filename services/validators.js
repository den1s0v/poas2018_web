const validator = require('../server/validator');

const signupValidator = validator({
  email: { type: /^\w+\@\w+\.[A-Za-z]{2,5}$/, required: true },
  password: { type: /^\w+$/, required: true },
  isAdmin: { type: 'boolean', required: true },
})

const loginValidator = validator({
  email: { type: /^\w+\@\w+\.[A-Za-z]{2,5}$/, required: false },
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
  regex: { type: 'string', required: true },
  // ownerId: { type: 'string', required: true },
  cases: { type: 'object', required: true }  // `object` is used instead if `array`
})

const addSolvedSampleValidator = validator({
  sampleId: { type: 'string', required: true },
})

module.exports = {
  signupValidator,
  loginValidator,
  updateValidator,
  addSampleValidator,
  addSolvedSampleValidator,
}