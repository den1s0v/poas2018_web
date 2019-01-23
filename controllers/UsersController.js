const { getModels, injectModelsToMethods, decorateActions, injectModelsToActions } = require('../services/models-injector')();
const { createToken } = require('../services/auth-service');
const UserModel = require('../models/UserModel');

const UsersController = {
  CreateUser,
  CreateGoogleUser,
  Login,
  UpdateUser,
  AddSample,
  AddSolvedSample,
}

injectModelsToActions(UsersController, UserModel);

module.exports = UsersController;

async function CreateUser(request, response, next, User) {
  const userInfo = request.body;
  const newUser = {
    email: userInfo.email,
    password: userInfo.password,
    isAdmin: userInfo.isAdmin
  }
  await User.save(newUser).then(createToken).then(token => {
    console.log('The new user saved to DB!');
    response.json({ token });
    next();
  })
}

async function CreateGoogleUser(request, response, next, User) {
  const userInfo = request.userInfo;
  const newUser = {
    email: userInfo.email,
    password: 'google-pass', // default password
    isAdmin: false
  }
  
  const existingUser = await User.isExist(newUser.email);
  
  if( existingUser == null ) {
	  
	  await User.save(newUser).then(createToken).then(token => {
		response.json({ token });
		next();
	  })	  
  } else {
    console.log("User exists. email:", newUser.email)	
    const token = createToken(existingUser);
    response.json({ token });
    next();
  }
}

async function Login(request, response, next, User) {
  const loginUser = request.body;
  await User.login(loginUser).then(createToken).then(token => {
    response.json({ token });
    next();
  })
}

async function AddSample(request, response, next, User) {
  
  const sampleId = request.body.sampleId;
  const userId = request.userId;
  await User.addSample(userId, sampleId).then(result => {
    console.log('Newly created sample saved');
    response.json(result.acknowledged);
    next();
  })
}

async function AddSolvedSample(request, response, next, User) {
  
  const sampleId = request.body.sampleId;
  const userId = request.userId;
  await User.addSolvedSample(userId, sampleId).then(result => {
    console.log('Solved sample saved');
    response.json(result.acknowledged);
    next();
  })
}

async function UpdateUser(request, response, next, User) {
  const newUserData = request.body;
  if (!(await User.isAdmin(request.userId)) && (newUserData.login || newUserData.email) && !newUserData.password) {
    response.status(403).json({
      error: "Password required to update user data"
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

