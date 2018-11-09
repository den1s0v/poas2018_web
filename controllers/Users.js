const modelInjector = require('../services/mc-decorators').modelInjector('User');
const createToken = require('../services/auth-service').createToken;

require('../models/User').then(modelInjector.injectModelToActions).catch(console.error);

async function CreateUser(request, response, next, User) {
  const newUser = request.body;
  await User.save(newUser).then(user => {
    console.log('The new user saved to DB!');
    response.json(user.ops);
    next();
  })
}

async function Login(request, response, next, User) {
  const loginUser = request.body;
  await User.login(loginUser).then(createToken).then(token => {
    response.json({token});
    next();
  })
}

async function UpdateUser(request, response, next, User) {
  const newUserData = request.body;
  if (!(await User.isAdmin(request.userId)) && (newUserData.login || newUserData.email) && !newUserData.password) {
    response.status(403).json({
      error: "Password required for update user data"
    })
    return;
  }
  await User.update({ userId: request.userId, login: request.params.login }, newUserData).then(oldUserData => {
    response.json({
      oldUserData,
      newUserData
    })
    next();
  })
}

module.exports = modelInjector.decorateActions({
  CreateUser,
  Login,
  UpdateUser
})