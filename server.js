const lightServer = require('./server/light-server');
const app = lightServer();
const requestParser = require('./server/request-parser');
const validators = require('./services/validators');
const UsersController = require('./controllers/UsersController');
const SamplesController = require('./controllers/SamplesController');
const verifyToken = require('./services/auth-service').verifyToken;
const apiTest = require('./services/api-test');

const googleAuthService = require('./services/google-auth-service');
const {vkAuth, sentFakeVkPage} = require('./services/vk-auth-service');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');
const compiler = webpack(webpackConfig);

app.use(webpackHotMiddleware(compiler, {
    reload: true
}));
app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
}));

const publicDir = './public';
app.use(lightServer.static(publicDir))

app.use(requestParser);
app.post('/api/signup', validators.signupValidator, UsersController.CreateUser)
app.post('/api/login', validators.loginValidator, UsersController.Login)
// app.get('/api/users/:id/:login?', verifyToken) // localhost/api/users/23/test
app.patch('/api/users/:login', validators.updateValidator, verifyToken, UsersController.UpdateUser)

// <debug-test>
app.get('/test', SamplesController.SampleTestFunc);
// </debug-test>

app.post('/api/auth/google', googleAuthService, UsersController.CreateGoogleUser);
// app.get('/api/auth/vk', vkAuth, sentFakeVkPage /*, UsersController.CreateVkUser*/);

app.post('/api/sample/get',   verifyToken, SamplesController.GetSamples);
app.post('/api/sample/update',verifyToken, SamplesController.SaveSample);


app.post('/api/sample/new', verifyToken, validators.addSampleValidator, SamplesController.CreateSample);

// app.post('/api/sample/getUserSamples', verifyToken, SamplesController.GetUserSamples);
// app.post('/api/sample/getAllUnsolvedTasks', verifyToken, SamplesController.GetAllUnsolvedTasks);
// app.post('/api/sample/getSolvedTasks', verifyToken, SamplesController.GetSolvedTasks);

app.post('/api/sample/add-solved', verifyToken, validators.addSolvedSampleValidator, SamplesController.AddSolved);
// app.post('/api/sample/addSolvedUser', verifyToken, SamplesController.AddSolvedSample);



app.listen(3000);